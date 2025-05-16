
import { toast } from "@/components/ui/sonner";

// OpenAI API key from environment variable
// Note: In a production environment, this should be loaded from a server-side environment variable
const OPENAI_API_KEY = "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";

const SYSTEM_MESSAGE = `You are a senior AI data analyst. When given JSON-formatted CSV data, return:
1. A 3-sentence summary of key trends
2. A chart config object: { chartType, xAxis, yAxis, title, data }
3. Three follow-up questions
Format output as valid JSON.`;

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export interface AnalysisResult {
  summary: string;
  chart: {
    chartType: 'bar' | 'line' | 'pie' | 'scatter';
    xAxis: string;
    yAxis: string;
    title: string;
    data: any[];
  };
  suggestedQuestions: string[];
}

// Helper function to limit data rows for OpenAI calls
const preprocessData = (data: any[]): any[] => {
  if (!data || data.length === 0) {
    throw new Error("No data found. Please upload a valid CSV.");
  }
  
  // Limit to 100 rows to prevent overloading the API
  const limitedData = data.slice(0, 100);
  
  // Filter out empty columns
  const cleanData = limitedData.map(row => {
    const cleanRow: Record<string, any> = {};
    Object.entries(row).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        cleanRow[key] = value;
      }
    });
    return cleanRow;
  });
  
  return cleanData;
};

export const analyzeDataWithGPT = async (data: any): Promise<string> => {
  try {
    if (!data || data.length === 0) {
      toast.error("No data found. Please upload a valid CSV.");
      return "No data found. Please upload a valid CSV.";
    }

    // Preprocess data to limit rows and clean empty values
    const processedData = preprocessData(data);

    const requestBody = {
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: SYSTEM_MESSAGE,
        },
        {
          role: "user",
          content: JSON.stringify({
            task: "analyze",
            data: processedData
          })
        },
      ],
      temperature: 0.3,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API returned ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }

    const result: OpenAIResponse = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing data with GPT:", error);
    toast.error("AI is taking too long. Try again or reduce file size.");
    return "Error analyzing data. Please try again later or reduce file size.";
  }
};

export const processUserQuestion = async (question: string, data: any): Promise<string> => {
  try {
    if (!data || data.length === 0) {
      toast.error("No data found. Please upload a valid CSV.");
      return "No data found. Please upload a valid CSV.";
    }

    // Preprocess data to limit rows
    const processedData = preprocessData(data);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-1106-preview",
        messages: [
          {
            role: "system",
            content: SYSTEM_MESSAGE,
          },
          {
            role: "user",
            content: JSON.stringify({
              task: "answer",
              question: question,
              data: processedData
            }),
          },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API returned ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }

    const result: OpenAIResponse = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error("Error processing question with GPT:", error);
    toast.error("We couldn't process that request. Please retry with different input.");
    return "Error processing your question. Please try a different approach.";
  }
};

// Parse AI response to expected format
export const parseAIResponse = (response: string): AnalysisResult | null => {
  try {
    // Try to parse the entire response as JSON
    const jsonMatch = response.match(/{[\s\S]*}/);
    if (jsonMatch) {
      const jsonStr = jsonMatch[0];
      const parsedData = JSON.parse(jsonStr);
      
      // Validate the structure
      if (parsedData.summary && parsedData.chart && parsedData.suggestedQuestions) {
        // Ensure chartType is one of the allowed values
        if (parsedData.chart && parsedData.chart.chartType) {
          const validChartTypes = ['bar', 'line', 'pie', 'scatter'];
          if (!validChartTypes.includes(parsedData.chart.chartType)) {
            parsedData.chart.chartType = 'bar'; // Default to bar if invalid
          }
        }
        return parsedData as AnalysisResult;
      }
    }
    
    // If parsing fails, return null
    console.error("Failed to parse AI response:", response);
    return null;
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return null;
  }
};

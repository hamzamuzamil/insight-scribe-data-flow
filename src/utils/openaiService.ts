
import { toast } from "@/components/ui/sonner";

// OpenAI API key from environment variable
const OPENAI_API_KEY = "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";

const SYSTEM_MESSAGE = `You are an AI data analyst. When given CSV data in JSON format, analyze it and return:
- A short summary of trends and anomalies
- A chart config (JSON) with type, x, y, and sample data
- Suggested follow-up questions
Format response as a valid JSON object.`;

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

// Helper function to limit data rows for OpenAI calls
const preprocessData = (data: any[]): any[] => {
  if (!data || data.length === 0) {
    throw new Error("No data found. Please upload a valid CSV.");
  }
  // Limit to 100 rows to prevent overloading the API
  return data.slice(0, 100);
};

export const analyzeDataWithGPT = async (data: any): Promise<string> => {
  try {
    if (!data || data.length === 0) {
      toast.error("No data found. Please upload a valid CSV.");
      return "No data found. Please upload a valid CSV.";
    }

    // Preprocess data to limit rows
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
        Authorization: `Bearer ${OPENAI_API_KEY}`,
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
    toast.error("AI is taking too long. Try again.");
    return "Error analyzing data. Please try again later.";
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
        Authorization: `Bearer ${OPENAI_API_KEY}`,
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
            content: `Given this data: ${JSON.stringify(processedData)}, ${question}. If this is a chart request, respond with valid JSON for the chart configuration.`,
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
    toast.error("AI is taking too long. Try again.");
    return "Error processing your question. Please try again later.";
  }
};

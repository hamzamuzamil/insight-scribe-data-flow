
import { toast } from "@/components/ui/sonner";

// OpenAI API key should be stored in environment variable or user input
const OPENAI_API_KEY = "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";

const SYSTEM_MESSAGE = `You are an expert data analyst. When given JSON data from a CSV, return human-readable summaries, chart configuration JSON, and suggestions for business improvement.
For chart requests, respond with valid JSON in this format:
{
  "chartType": "bar|line|pie|scatter",
  "xAxis": "Column name for X axis",
  "yAxis": "Column name for Y axis",
  "title": "Chart title",
  "data": [Array of data points with x and y values]
}`;

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export const analyzeDataWithGPT = async (data: any): Promise<string> => {
  try {
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
            content: `Analyze this data. Summarize key patterns, trends, and outliers in 3 short paragraphs. Return insights formatted for user display: ${JSON.stringify(data)}`,
          },
        ],
        temperature: 0.3,
      }),
    });

    const result: OpenAIResponse = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing data with GPT:", error);
    toast.error("Failed to analyze data with AI");
    return "Error analyzing data. Please try again later.";
  }
};

export const processUserQuestion = async (question: string, data: any): Promise<string> => {
  try {
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
            content: `Given this data: ${JSON.stringify(data)}, ${question}. If this is a chart request, respond with valid JSON for the chart configuration.`,
          },
        ],
        temperature: 0.3,
      }),
    });

    const result: OpenAIResponse = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error("Error processing question with GPT:", error);
    toast.error("Failed to process your question");
    return "Error processing your question. Please try again later.";
  }
};

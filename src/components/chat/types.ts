
import { ChartData } from "@/utils/chartRenderer";

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  chartData?: ChartData | null;
  suggestedQuestions?: string[];
}

export interface ChatInterfaceProps {
  csvData: any;
}

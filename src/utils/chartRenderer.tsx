
import React from 'react';
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  Bar,
  Line,
  Pie,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { toast } from '@/components/ui/sonner';

export interface ChartData {
  chartType: 'bar' | 'line' | 'pie' | 'scatter';
  xAxis: string;
  yAxis: string;
  title: string;
  data: Record<string, any>[];
}

export const isValidChartData = (data: any): data is ChartData => {
  return (
    data &&
    typeof data === 'object' &&
    'chartType' in data &&
    'xAxis' in data &&
    'yAxis' in data &&
    'data' in data &&
    Array.isArray(data.data) &&
    data.data.length > 0
  );
};

// Function to try parsing JSON from a string
export const tryParseChartData = (text: string): ChartData | null => {
  try {
    // Find JSON-like structure in the text
    const jsonMatch = text.match(/{[\s\S]*}/);
    if (jsonMatch) {
      const jsonStr = jsonMatch[0];
      const parsedData = JSON.parse(jsonStr);
      if (isValidChartData(parsedData)) {
        return parsedData;
      } else {
        console.error("Invalid chart data format:", parsedData);
        toast.error("No chart config returned. Try again.");
      }
    }
    return null;
  } catch (error) {
    console.error("Error parsing chart data:", error);
    return null;
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const DynamicChart: React.FC<{ chartData: ChartData }> = ({ chartData }) => {
  const { chartType, xAxis, yAxis, title, data } = chartData;

  const config = {
    blue: { theme: { light: '#0088FE', dark: '#0088FE' } },
    green: { theme: { light: '#00C49F', dark: '#00C49F' } },
    yellow: { theme: { light: '#FFBB28', dark: '#FFBB28' } },
    orange: { theme: { light: '#FF8042', dark: '#FF8042' } },
    purple: { theme: { light: '#8884d8', dark: '#8884d8' } },
    teal: { theme: { light: '#82ca9d', dark: '#82ca9d' } },
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey={yAxis} fill="#0088FE" />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line type="monotone" dataKey={yAxis} stroke="#0088FE" />
          </LineChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={yAxis}
              nameKey={xAxis}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
          </PieChart>
        );
      case 'scatter':
        return (
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} type="number" />
            <YAxis dataKey={yAxis} type="number" />
            <ChartTooltip content={<ChartTooltipContent />} cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name={title} data={data} fill="#0088FE" />
          </ScatterChart>
        );
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className="w-full mt-4">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="w-full h-64">
        <ChartContainer config={config} className="h-full">
          {renderChart()}
        </ChartContainer>
      </div>
    </div>
  );
};

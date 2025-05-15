
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface DataTableProps {
  data: Record<string, string | number>[];
  headers: string[];
}

export const DataTable = ({ data, headers }: DataTableProps) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Only show the first 10 rows
  const limitedData = data.slice(0, 10);

  return (
    <Card className="glass border-white/10 overflow-hidden">
      <div className="overflow-x-auto animate-fade-in">
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index} className="font-medium">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {limitedData.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-secondary/30 transition-colors">
                {headers.map((header, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {row[header] !== undefined ? row[header].toString() : ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {data.length > 10 && (
          <div className="py-2 px-4 text-center text-sm text-muted-foreground border-t border-white/10">
            Showing 10 of {data.length} rows
          </div>
        )}
      </div>
    </Card>
  );
};

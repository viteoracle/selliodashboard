
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer } from "recharts";
import { ReactElement } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactElement;
}

export const ChartCard = ({ title, description, children }: ChartCardProps) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};


import { Card, CardContent } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const data = [
  { name: "Jan 1", sales: 4000 },
  { name: "Jan 5", sales: 3000 },
  { name: "Jan 10", sales: 5000 },
  { name: "Jan 15", sales: 2780 },
  { name: "Jan 20", sales: 1890 },
  { name: "Jan 25", sales: 2390 },
  { name: "Jan 30", sales: 3490 }
];

export const SalesChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6683f4" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6683f4" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fontSize: 12, fill: '#888' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fontSize: 12, fill: '#888' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Sales']}
            contentStyle={{ 
              borderRadius: '8px',
              border: '1px solid #eee',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="sales" 
            stroke="#3d57e9" 
            fillOpacity={1} 
            fill="url(#colorSales)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

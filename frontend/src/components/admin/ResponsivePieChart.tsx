import { useTheme } from '@mui/material';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { tokens } from '@/theme/theme';

const ResponsivePieChart = ({ data }: { data: any }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const pieColors = ['#8884d8', '#7a7cd6', '#6d70d4', '#6065d2', '#5359d0'];

  return (
    <ResponsiveContainer>
      <PieChart width={730} height={250}>
        <Tooltip
          contentStyle={{
            background: colors.primary[500],
          }}
          itemStyle={{ color: colors.grey[100] }}
        />
        <Legend
          payload={data.map(
            (item: { gender: string; count: number }, index: number) => ({
              id: item.gender,
              type: 'square',
              value: `${item.gender} (${item.count})`,
              color: pieColors[index % pieColors.length],
            })
          )}
        />
        <Pie
          data={data}
          dataKey="count"
          nameKey="gender"
          innerRadius="50%"
          outerRadius="80%"
          fill="#82ca9d"
          paddingAngle={2}
          label
        >
          {data.map(
            (entry: { gender: string; count: number }, index: number) => (
              <Cell
                key={`cell-${entry.gender}`}
                fill={pieColors[index % pieColors.length]}
              />
            )
          )}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ResponsivePieChart;

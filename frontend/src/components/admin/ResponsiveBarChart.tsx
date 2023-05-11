import { useTheme } from '@mui/material';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { tokens } from '@/theme/theme';

const ResponsiveBarChart = ({
  data,
  xaxis,
  datakeys,
}: {
  data: any;
  xaxis: string;
  datakeys: Array<string>;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveContainer>
      <BarChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 40, right: 40, left: 0, bottom: 20 }}
      >
        <XAxis dataKey={xaxis} stroke={colors.grey[100]} />
        <YAxis stroke={colors.grey[100]} />
        <Tooltip contentStyle={{ background: colors.primary[500] }} />
        <Legend />
        {datakeys.map((dataKey) => {
          return <Bar dataKey={dataKey} fill="#8884d8" key={dataKey} />;
        })}
        {/* <Bar dataKey="count" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};
export default ResponsiveBarChart;

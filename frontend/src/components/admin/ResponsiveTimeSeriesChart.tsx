import { useTheme } from '@mui/material';
// import axios from 'axios';
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// import useSWR from 'swr';
import { tokens } from '@/theme/theme';

const ResponsiveTimeSeriesChart = ({ dashboard }: { dashboard: any }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveContainer>
      <LineChart
        width={730}
        height={250}
        // data={data}
        margin={{ top: 40, right: 40, left: 0, bottom: 20 }}
      >
        <XAxis
          dataKey="month"
          type="category"
          stroke={colors.grey[100]}
          allowDuplicatedCategory={false}
        />
        <YAxis stroke={colors.grey[100]} />
        <Tooltip contentStyle={{ background: colors.primary[500] }} />
        <Legend />
        <Line
          type="linear"
          dataKey="requestsCount"
          data={dashboard.bloodRequestsPerMonth}
          name="all requests"
          stroke="#8884d8"
          key="all"
        />
        <Line
          type="linear"
          dataKey="requestsCount"
          data={dashboard.doneBloodRequestsPerMonth}
          name="done requests"
          stroke="#82ca9d"
          key="done"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ResponsiveTimeSeriesChart;

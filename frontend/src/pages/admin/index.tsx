// import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import DoneIcon from '@mui/icons-material/Done';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { Box, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import useSWR from 'swr';

import Header from '@/components/admin/Header';
import ResponsiveBarChart from '@/components/admin/ResponsiveBarChart';
import ResponsivePieChart from '@/components/admin/ResponsivePieChart';
import ResponsiveTimeSeriesChart from '@/components/admin/ResponsiveTimeSeriesChart';
// import ProgressCircle from '@/components/admin/ProgressCircle';
import StatBox from '@/components/admin/StatBox';
// import { mockTransactions } from '@/data/mockData';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { tokens } from '@/theme/theme';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // console.log(colors);

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URI}/admin/dashboard`,
    async (url) => {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // console.log(response.data.user);
      return response.data;
    }
  );

  if (!data) return null;
  const { dashboard } = data;

  return (
    <Main meta={<Meta title="Dashboard" description="Dashboard" />}>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

          {/* <Box>
            <Button
              sx={{
                bgcolor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: '10px' }} />
              Download Reports
            </Button>
          </Box> */}
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 3"
            // bgcolor={colors.primary[400]}
            bgcolor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={dashboard.bloodRequestsStats.RequestsThisMonth}
              subtitle="Requests"
              progress={dashboard.bloodRequestsStats.increase}
              increase={dashboard.bloodRequestsStats.increasePercentage}
              icon={
                <BloodtypeIcon
                  sx={{
                    color: colors.greenAccent[600],
                    fontSize: '26px',
                    marginLeft: '-7px',
                  }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            // bgcolor={colors.primary[400]}
            bgcolor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={dashboard.doneBloodRequestsStats.RequestsThisMonth}
              subtitle="Done Requests"
              progress={dashboard.doneBloodRequestsStats.increase}
              increase={dashboard.doneBloodRequestsStats.increasePercentage}
              icon={
                <DoneIcon
                  sx={{
                    color: colors.greenAccent[600],
                    fontSize: '26px',
                    marginLeft: '-7px',
                  }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            bgcolor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={dashboard.profilesStats.usersThisMonth}
              subtitle="New Users"
              progress={dashboard.profilesStats.increase}
              increase={dashboard.profilesStats.increasePercentage}
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            bgcolor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* <StatBox
              title="1,325,134"
              subtitle="Traffic Received"
              progress={0.8}
              increase="+43%"
              icon={
                <TrafficIcon
                  sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                />
              }
            /> */}
          </Box>

          {/* ROW 2 */}
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            bgcolor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Blood Requests
                </Typography>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              {/* <LineChart isDashboard={true} /> */}
              <ResponsiveTimeSeriesChart dashboard={dashboard} />
            </Box>
          </Box>
          {/* <Box
            gridColumn="span 4"
            gridRow="span 2"
            bgcolor={colors.primary[400]}
            overflow="auto"
          >
             <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              // colors={colors.grey[100]}
              sx={{ color: colors.grey[100] }}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Recent Transactions
              </Typography>
            </Box>
            {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  bgcolor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.cost}
                </Box>
              </Box>
            ))} 
          </Box> */}
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            bgcolor={colors.primary[400]}
            padding="30px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: '15px' }}
            >
              Gender
            </Typography>
            <Box height="200px">
              <ResponsivePieChart data={dashboard.gendersCount} />
            </Box>
          </Box>
          {/* ROW 3 */}
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            bgcolor={colors.primary[400]}
            padding="30px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: '15px' }}
            >
              Verified Users
            </Typography>
            <Box height="200px">
              <ResponsiveBarChart
                data={dashboard.verifiedUsersCount}
                xaxis="verified"
                datakeys={['count']}
              />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            bgcolor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: '30px 30px 0 30px' }}
            >
              hospitals count
            </Typography>
            <Box height="250px" mt="-20px">
              <ResponsiveBarChart
                data={dashboard.hospitalsCount}
                xaxis="hospital"
                datakeys={['count']}
              />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            bgcolor={colors.primary[400]}
            padding="30px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: '15px' }}
            >
              needed blood types
            </Typography>
            <Box height="200px">
              <ResponsiveBarChart
                data={dashboard.bloodTypesCount}
                xaxis="bloodType"
                datakeys={['count']}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Main>
  );
};

export default Dashboard;

import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import * as React from 'react';

import Header from '@/components/admin/Header';
// import { tokens } from '@/theme/theme';

const Predict = () => {
  let token: string | null = '';
  if (typeof window !== 'undefined' && localStorage) {
    token = localStorage.getItem('token');
  }

  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [firstDonation, setFirstDonation] = React.useState<any>();
  const [lastDonation, setLastDonation] = React.useState<any>();
  const [donationsNo, setDonationsNo] = React.useState<any>();
  const [volumeDonated, setVolumeDonated] = React.useState<any>();
  const [result, setResult] = React.useState<any>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const data = new FormData(event.currentTarget);
    // const FirstDonation = data.get('FirstDonation');
    // const LastDonation = data.get('LastDonation');
    // const DonationsNo = data.get('DonationsNo');
    // const VolumeDonated = data.get('LastDonation');

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_URI}/admin/predict`,
      {
        Months_since_First_Donation: Number(firstDonation),
        Months_since_Last_Donation: Number(lastDonation),
        Number_of_Donations: Number(donationsNo),
        'Total_Volume_Donated_(c.c.)': Number(volumeDonated),
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return setResult(response.data.result);
  };

  return (
    <Box m="20px">
      <Header
        title="Donation prediction"
        subtitle="submit the form to know if the user will donate again or not"
      />
      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            '& > div': 'span 4',
          }}
        >
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setFirstDonation(e.target.value)}
            value={firstDonation}
            variant="filled"
            type="text"
            label="Months since First Donation"
            name="FirstDonation"
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setLastDonation(e.target.value)}
            value={lastDonation}
            variant="filled"
            type="text"
            label="Months since Last Donation"
            name="LastDonation"
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setDonationsNo(e.target.value)}
            value={donationsNo}
            variant="filled"
            type="text"
            label="Number of Donations"
            name="DonationsNo"
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setVolumeDonated(e.target.value)}
            value={volumeDonated}
            variant="filled"
            type="text"
            label="Total Volume Donated"
            name="VolumeDonated"
            sx={{ gridColumn: 'span 2' }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
      {result && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="20px"
        >
          <h1>{result}</h1>
        </Box>
      )}
    </Box>
  );
};

export default Predict;

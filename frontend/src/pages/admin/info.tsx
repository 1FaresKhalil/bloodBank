import { Box, useTheme } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import useSWR from 'swr';

import Header from '@/components/admin/Header';
import ErrorPage from '@/components/error';
import { tokens } from '@/theme/theme';

const Info = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URI}/admin/users`,
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

  if (error) {
    return <ErrorPage />;
  }

  if (!data) return null;
  const { users } = data;
  // console.log(users);
  const dateGetter = (params: any) => {
    if (!params.value) {
      return params.value;
    }
    // Convert the decimal value to a percentage
    return new Date(params.value);
  };
  const stringGetter = (params: any) => {
    if (!params.value) {
      return '-';
    }
    // Convert the decimal value to a percentage
    return params.value;
  };

  const columns: GridColDef[] = [
    // { field: '_id', headerName: 'ID', flex: 0.5 },
    {
      field: 'name',
      headerName: 'Name',
      valueGetter: stringGetter,
      flex: 1,
      cellClassName: 'name-column--cell',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'username',
      valueGetter: stringGetter,

      headerName: 'Email',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'bloodType',
      valueGetter: stringGetter,

      headerName: 'Blood Type',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'age',
      headerName: 'Age',
      valueGetter: stringGetter,
      type: 'number',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'phone',
      valueGetter: stringGetter,
      headerName: 'Phone Number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'address',
      valueGetter: stringGetter,
      headerName: 'address',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'nationalId',
      valueGetter: stringGetter,
      headerName: 'National Id',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'gender',
      valueGetter: stringGetter,
      headerName: 'Gender',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'verified',
      headerName: 'Is Verified',
      type: 'boolean',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'createdAt',
      valueGetter: dateGetter,
      headerName: 'created at',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'updatedAt',
      valueGetter: dateGetter,
      type: 'date',
      headerName: 'Updated At',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'isAdmin',
      headerName: 'Is Admin',
      type: 'boolean',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Users Informations"
        subtitle="List of Users Informations"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={users}
          // eslint-disable-next-line no-underscore-dangle
          getRowId={(row) => row._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Info;

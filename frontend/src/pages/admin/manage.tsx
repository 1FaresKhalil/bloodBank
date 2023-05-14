/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, useTheme } from '@mui/material';
import type {
  GridColDef,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModesModel,
  GridRowsProp,
  MuiEvent,
} from '@mui/x-data-grid';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridToolbar,
} from '@mui/x-data-grid';
import axios from 'axios';
import * as React from 'react';
import useSWR from 'swr';

import Header from '@/components/admin/Header';
import { tokens } from '@/theme/theme';

const Manage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const { data } = useSWR(
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

  React.useEffect(() => {
    if (data) setRows(data.users);
  }, [setRows, data]);

  if (!data) return null;

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

  const handleRowEditStart = (
    _: any,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    // console.log(params);
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    _: any,
    event
  ) => {
    // console.log(params);
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    // console.log(rowModesModel);
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows?.filter((row: any) => row._id !== id));

    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    axios.delete(`${process.env.NEXT_PUBLIC_DB_URI}/admin/users/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows?.find((row: any) => row._id === id);
    if (editedRow!.isNew) {
      setRows(rows?.filter((row: any) => row._id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(
      rows?.map((row: any) => (row._id === newRow._id ? updatedRow : row))
    );

    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    axios.put(
      `${process.env.NEXT_PUBLIC_DB_URI}/admin/users/${newRow._id}`,
      {
        name: newRow.name,
        username: newRow.username,
        bloodType: newRow.bloodType,
        isAdmin: newRow.isAdmin,
        age: newRow.age,
        address: newRow.address,
        nationalId: newRow.nationalId,
        gender: newRow.gender,
        phone: newRow.phone,
        verified: newRow.verified,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', flex: 0.5 },
    {
      field: 'name',
      headerName: 'Name',
      valueFormatter: stringGetter,

      flex: 1,
      editable: true,
      cellClassName: 'name-column--cell',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'username',
      valueFormatter: stringGetter,

      headerName: 'Email',
      flex: 1,
      editable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'bloodType',
      valueFormatter: stringGetter,
      headerName: 'Blood Type',
      flex: 1,
      editable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'age',
      valueFormatter: stringGetter,
      headerName: 'Age',
      flex: 1,
      editable: true,
      type: 'number',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'phone',
      valueFormatter: stringGetter,
      headerName: 'Phone Number',
      flex: 1,
      editable: true,
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'address',
      valueFormatter: stringGetter,
      headerName: 'address',
      flex: 1,
      editable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'nationalId',
      valueFormatter: stringGetter,
      headerName: 'National Id',
      flex: 1,
      editable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'gender',
      valueFormatter: stringGetter,
      headerName: 'Gender',
      flex: 1,
      editable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'verified',
      headerName: 'Is Verified',
      type: 'boolean',
      flex: 1,
      editable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'createdAt',
      valueFormatter: dateGetter,
      headerName: 'created at',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'updatedAt',
      valueFormatter: dateGetter,
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
      editable: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="MANAGEMENT" subtitle="Managing the Users" />
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
          // eslint-disable-next-line no-underscore-dangle
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Manage;

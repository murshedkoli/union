import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { host } from "../../ConfigurText";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [admins, setAdminData] = useState([]);
  useEffect(() => {
    fetch(`${host}/admins`)
      .then((res) => res.json())
      .then((data) => {
        setAdminData(data.reverse());
      });
  }, []);

  const rows = admins.map((row) => ({
    id: row._id,
    fullName: row.fullName,
    email: row.email,
    contact: row.contact,
    password: row.password,
    address: row.address,
    createdAt: row.createdAt,
  }));

  const columns = [
    // { field: "id", headerName: "ID", flex: 1 },
    {
      field: "fullName",
      headerName: "Name",
      flex: 1.2,
      cellClassName: "name-column--cell",
    },

    {
      field: "contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "password",
    //   headerName: "Access Level",
    //   flex: 1,
    // },
    {
      field: "createdAt",
      headerName: "User Created At",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Team;

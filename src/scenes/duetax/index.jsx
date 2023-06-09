import { Avatar, Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../../ConfigurText";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const DueTax = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const thisYear = new Date().getFullYear();
  const isMobile = useMediaQuery("(max-width:640px)");

  const [citizens, setCitizenData] = useState([]);
  useEffect(() => {
    fetch(`${host}/citizens`)
      .then((res) => res.json())
      .then((data) => {
        const result = data.filter((citizen) => citizen.current !== thisYear);

        setCitizenData(result.reverse());
      });
  }, [thisYear]);

  const handleClick = (event, cellValues) => {
    const nid = cellValues.row.nid;

    navigate(`/citizens/${nid}`);
  };

  const columns = [
    // { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "image",
      headerName: "Image",
      width: 60,
      editable: true,
      renderCell: (params) => <Avatar alt="Remy Sharp" src={params.value} />,
      // renderCell will render the component
    },
    {
      field: "nameBn",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "nid",
      headerName: "NID No.",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "father",
      headerName: "Father's Name",
      flex: 1,
    },

    {
      field: "village",
      headerName: "Village",
      flex: 1,
    },
    {
      field: "paidTax",
      headerName: "Tax Paid",
      flex: 1,
    },
    {
      field: "current",
      headerName: "Last Payment",
      flex: 1,
    },
    {
      field: "Print",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            View
          </Button>
        );
      },
    },
  ];

  const mobileColumns = [
    // { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "image",
      headerName: "Image",
      width: 60,
      editable: true,
      renderCell: (params) => <Avatar alt="Remy Sharp" src={params.value} />,
      // renderCell will render the component
    },
    {
      field: "nameBn",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "Print",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            View
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="বকেয়া কর"
        subtitle="যারা চলতি অর্থবছরে বকেয়া পরিশোধ করেনি"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={citizens}
          columns={isMobile ? mobileColumns : columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default DueTax;

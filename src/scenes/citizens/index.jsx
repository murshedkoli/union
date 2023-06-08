import { Avatar, Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../../ConfigurText";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Citizens = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [citizens, setCitizenData] = useState([]);

  useEffect(() => {
    fetch(`${host}/citizens`)
      .then((res) => res.json())
      .then((data) => {
        setCitizenData(data.reverse());
      });
  }, []);

  const handleClick = (event, cellValues) => {
    const nid = cellValues.row.nid;

    navigate(`/citizens/${nid}`);
  };
  const rows = citizens.map((row) => ({
    id: row._id,
    image: row.image,
    nameBn: row.nameBn,
    nid: row.nid,
    contact: row.contact,
    father: row.father,
    village: row.village,
    current: row.current,

    createdAt: row.createdAt,
  }));

  const columns = [
    // { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "image",
      headerName: "Image",
      width: 60,
      editable: true,
      renderCell: (params) => <Avatar alt="" src={params.value} />,
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
      field: "contact",
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
      field: "current",
      headerName: "Tax Status",

      renderCell: (cellValues) => {
        cellValues === new Date().getFullYear() ? (
          <Button variant="contained" color="success">
            Paid
          </Button>
        ) : (
          <Button variant="contained" color="error">
            Due
          </Button>
        );
      },
    },
    {
      field: "Preview",
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
        title="CITIZENS"
        subtitle="List of Citizens In Kalikaccha Union"
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
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Citizens;

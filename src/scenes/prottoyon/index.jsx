import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../../ConfigurText";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Prottoyon = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetch(`${host}/certificatesubmit`)
      .then((res) => res.json())
      .then((data) => {
        setCertificates(data.reverse());
      });
  }, []);

  const handleClick = (event, cellValues) => {
    const nid = cellValues.row.nid;

    navigate(`/citizens/${nid}`);
  };

  const columns = [
    // { field: "_id", headerName: "ID", flex: 0.5 },

    {
      field: "name",
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
      field: "slNo",
      headerName: "Sl No.",
      flex: 1,
    },
    {
      field: "issueDate",
      headerName: "Issued Date",
      flex: 1,
    },
    {
      field: "certificate",
      headerName: "Certificate ",
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

  const rows = certificates.map((row) => ({
    id: row._id,
    name: row.name,
    issueDate: row.issueDate,
    nid: row.nid,
    slNo: row.slNo,
    certificate: row.certificate,

    createdAt: row.createdAt,
  }));

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

export default Prottoyon;

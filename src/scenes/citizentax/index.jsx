import { Box, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { host } from "../../ConfigurText";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const CitizenTax = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:640px)");
  const thisYear = new Date().getFullYear();

  const [taxStatement, setTaxStatement] = useState([]);

  useEffect(() => {
    fetch(`${host}/taxinfo`)
      .then((res) => res.json())
      .then((data) => {
        setTaxStatement(data.reverse());
      });
  }, [thisYear]);

  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5 },

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
      field: "paidAmount",
      headerName: "Tax Ammount",
      flex: 1,
    },
    {
      field: "paidDate",
      headerName: "Payment Date",
      flex: 1,
    },
  ];

  const mobileColumns = [
    // { field: "id", headerName: "ID", flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "paidAmount",
      headerName: "Tax Ammount",
      flex: 1,
    },
  ];

  const rows = taxStatement.map((row) => ({
    id: row._id,
    issueDate: row.issueDate,
    nid: row.nid,
    paidAmount: row.paidAmount,
    name: row.name,
  }));

  return (
    <Box m="20px">
      <Header title="আদায়কৃত কর" subtitle="আদায়কৃত করের তালিকা" />

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
          columns={isMobile ? mobileColumns : columns}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default CitizenTax;

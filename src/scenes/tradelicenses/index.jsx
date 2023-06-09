import { Avatar, Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../../ConfigurText";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const TradeLicenses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:640px)");
  const [licensense, setLicensense] = useState([]);

  useEffect(() => {
    fetch(`${host}/tradelicense`)
      .then((res) => res.json())
      .then((data) => {
        setLicensense(data);
      });
  }, []);

  const handleClick = (event, cellValues) => {
    const slNo = cellValues.row.slNo;
    const licenseNo = cellValues.row.licenseNo;

    navigate(`/tradelicense/${licenseNo}/${slNo}`);
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
      field: "businessName",
      headerName: "Business Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "ownerName",
      headerName: "ownerName",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "slNo",
      headerName: "slNo",
      flex: 1,
    },
    {
      field: "businessAddress",
      headerName: "businessAddress",
      flex: 1,
    },
    {
      field: "businessType",
      headerName: "businessType",
      flex: 1,
    },
    {
      field: "licenseFee",
      headerName: "licenseFee",
      flex: 1,
    },
    {
      field: "fiscalYear",
      headerName: "fiscalYear",
      flex: 1,
    },
    {
      field: "issueDate",
      headerName: "issueDate",
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
      field: "businessName",
      headerName: "Business Name",
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

  const rows = licensense.map((row) => ({
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

  return (
    <Box m="20px">
      <Header title="ট্রেড লাইসেন্স" subtitle="ইস্যূকৃত ট্রেড লাইসেন্স সমূহ" />
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

export default TradeLicenses;

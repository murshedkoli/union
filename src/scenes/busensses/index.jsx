import { Avatar, Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../../ConfigurText";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Businesses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    fetch(`${host}/business`)
      .then((res) => res.json())
      .then((data) => {
        setBusinesses(data.reverse());
      });
  }, []);

  const handleClick = (event, cellValues) => {
    const licenseNo = cellValues.row.licenseNo;

    navigate(`/businesses/${licenseNo}`);
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 60,
      editable: true,
      renderCell: (params) => <Avatar alt="" src={params.value} />,
      // renderCell will render the component
    },
    {
      field: "businessName",
      headerName: "Name Of Business",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "ownerName",
      headerName: "Proprietor.",
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
      field: "businessType",
      headerName: "Type of Business",
      flex: 1,
    },
    {
      field: "licenseFee",
      headerName: "Licens Fee",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Business Address",
      flex: 1,
    },

    {
      field: "licenseNo",
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

  const rows = businesses.map((row) => ({
    id: row._id,
    image: row.image,
    businessName: row.businessName,
    ownerName: row.ownerName,
    contact: row.contact,
    businessType: row.businessType,
    village: row.village,
    licenseFee: row.licenseFee,
    address: row.address,
    licenseNo: row.licenseNo,
    createdAt: row.createdAt,
  }));

  return (
    <Box m="20px">
      <Header
        title="BUSINESSES"
        subtitle="List of Businesses In Kalikaccha Union"
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

export default Businesses;

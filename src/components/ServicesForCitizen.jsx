import SendIcon from "@mui/icons-material/Send";
import { Box, Button, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";

const ServicesForCitizen = ({ icon, title, nid, location }) => {
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:1200px)");

  const buttonForServer = {
    display: "flex",
    justifyContent: "center",
    mb: "10px",
  };

  const columnWidth = isNonMobile ? "span 2" : "span 3";

  return (
    <Box
      gridColumn={columnWidth}
      gridRow="span 1"
      backgroundColor={colors.primary[400]}
      p="30px"
    >
      <Box sx={buttonForServer}>
        <img width="50px" src={icon} alt="" srcset="" />
      </Box>
      <Box sx={buttonForServer}>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          }}
          variant="outline"
          endIcon={<SendIcon />}
          onClick={() => navigate(`/citizens/certificate/${location}/${nid}`)}
        >
          {title}
        </Button>
      </Box>
    </Box>
  );
};

export default ServicesForCitizen;

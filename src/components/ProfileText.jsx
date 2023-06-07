import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import ManIcon from "@mui/icons-material/Man";
import PaymentIcon from "@mui/icons-material/Payment";
import PhonelinkRingIcon from "@mui/icons-material/PhonelinkRing";
import Woman2OutlinedIcon from "@mui/icons-material/Woman2Outlined";
import { Box, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

import { tokens } from "../theme";
const ProfileText = ({ citizen, business }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:1200px)");

  const textBoxStyles = {
    display: "flex",
    p: "0 0 0 3px",
    borderRadius: "4px",
    alignItems: "center",
    color: `${colors.grey[100]}`,
    // backgroundColor: `${colors.greenAccent[500]}`
    border: `1px solid ${colors.greenAccent[500]}`,
  };

  const sizeForFont = isNonMobile ? "h3" : "h5";

  return (
    <div>
      {business ? (
        <div>
          <div className="flex gap-2 justify-between">
            <div className="flex gap-1">
              <ManIcon color={colors.greenAccent[400]} />
              <p>ব্যবসায়ের নাম</p>
            </div>
            <p>{citizen.businessName}</p>
          </div>

          {/* Another Part */}

          <Box display="flex" alignItems="center" p="2px 0 0 0">
            <Box sx={textBoxStyles} width="35%" mr="1%">
              <Typography variant={sizeForFont} p="5px">
                <Woman2OutlinedIcon /> পিতা
              </Typography>
            </Box>

            <Box sx={textBoxStyles} width="64%">
              <Typography variant={sizeForFont} p="5px">
                {citizen.fathersName}
              </Typography>
            </Box>
          </Box>

          {/* Another Part */}

          <Box display="flex" alignItems="center" p="2px 0 0 0">
            <Box sx={textBoxStyles} width="35%" mr="1%">
              <Typography variant={sizeForFont} p="5px">
                <PhonelinkRingIcon /> মোবাইল
              </Typography>
            </Box>

            <Box sx={textBoxStyles} width="64%">
              <Typography variant={sizeForFont} p="5px">
                {citizen.contact}
              </Typography>
            </Box>
          </Box>

          {/* Another Part */}

          <Box display="flex" alignItems="center" p="2px 0 0 0">
            <Box sx={textBoxStyles} width="35%" mr="1%">
              <Typography variant={sizeForFont} p="5px">
                <BadgeOutlinedIcon /> লাইসেন্স নং
              </Typography>
            </Box>

            <Box sx={textBoxStyles} width="64%">
              <Typography variant={sizeForFont} p="5px">
                {citizen.licenseNo}
              </Typography>
            </Box>
          </Box>

          {/* Another Part */}

          <Box display="flex" alignItems="center" p="2px 0 0 0">
            <Box sx={textBoxStyles} width="35%" mr="1%">
              <Typography variant={sizeForFont} p="5px">
                <CalendarMonthOutlinedIcon /> ব্যবসায়ের ধরন
              </Typography>
            </Box>

            <Box sx={textBoxStyles} width="64%">
              <Typography variant={sizeForFont} p="5px">
                {citizen.businessType}
              </Typography>
            </Box>
          </Box>

          {/* Another Part */}

          <Box display="flex" alignItems="center" p="2px 0 0 0">
            <Box sx={textBoxStyles} width="35%" mr="1%">
              <Typography variant={sizeForFont} p="5px">
                <HouseOutlinedIcon /> ব্যবসায়ের মূলধন
              </Typography>
            </Box>

            <Box sx={textBoxStyles} width="64%">
              <Typography variant={sizeForFont} p="5px">
                {citizen.businessCapital}
              </Typography>
            </Box>
          </Box>

          {/* Another Part */}

          <Box display="flex" alignItems="center" p="2px 0 0 0">
            <Box sx={textBoxStyles} width="35%" mr="1%">
              <Typography variant={sizeForFont} p="5px">
                <HolidayVillageOutlinedIcon /> লাইসেন্স ফি
              </Typography>
            </Box>

            <Box sx={textBoxStyles} width="64%">
              <Typography variant={sizeForFont} p="5px">
                {citizen.licenseFee}
              </Typography>
            </Box>
          </Box>

          {/* Another Part */}

          <Box display="flex" alignItems="center" p="2px 0 0 0">
            <Box sx={textBoxStyles} width="35%" mr="1%">
              <Typography variant={sizeForFont} p="5px">
                <PaymentIcon /> ব্যবসায়ের ঠিকানা
              </Typography>
            </Box>

            <Box sx={textBoxStyles} width="64%">
              <Typography variant={sizeForFont} p="5px">
                {citizen.businessAddress}
              </Typography>
            </Box>
          </Box>

          {/* Another Part */}
        </div>
      ) : (
        <div>
          <div className="flex gap-2 justify-between">
            <div className="flex gap-1">
              <ManIcon color={colors.greenAccent[400]} />
              <p>পিতাঃ</p>
            </div>
            <p>{citizen.father}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileText;

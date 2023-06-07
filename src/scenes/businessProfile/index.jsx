import { Box, Divider, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { host } from "../../ConfigurText";
import Header from "../../components/Header";
import ProfileText from "../../components/ProfileText";
import { tokens } from "../../theme";

const BusinessProfile = () => {
  const isNonMobile = useMediaQuery("(min-width:1200px)");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const { licenseNo } = useParams();

  const [business, setBusiness] = useState({});
  const thisYear = new Date().getFullYear();

  useEffect(() => {
    const url = `${host}/business/${licenseNo}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBusiness(data.result[0]);
      });
  }, [licenseNo]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={`Profile Of  ${business?.businessName}`}
          subtitle="Welcome to your dashboard"
        />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn={isNonMobile ? "span 3" : "span 5"}
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="center"
            alignItems="center"
          >
            <Box display="flex" justifyContent="center">
              <img
                srcSet=""
                src={business.image}
                alt={business.ownerName}
                width="80%"
              />
            </Box>
          </Box>
          <Divider />
          <Box height="100px" m="20px 0 0 0">
            <Typography
              textAlign="center"
              variant="h1"
              color={colors.greenAccent[400]}
            >
              {business.ownerName}
            </Typography>
          </Box>
        </Box>

        <Box
          gridColumn={isNonMobile ? "span 6" : "span 7"}
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box mt="25px" mb="5px" p="0 30px">
            <Box>
              <Box pt="10px">
                <ProfileText citizen={business} business="true" />
              </Box>
            </Box>
          </Box>
          <Divider />
          <Divider />
        </Box>

        {/* ROW 3 */}

        <Box gridColumn="span 12" mb="100px">
          <Box className="flex items-center justify-center">
            <button
              className="pr-20 pl-20 pt-5 pb-5 bg-green-900 rounded-lg hover:text-black hover:bg-green-300 font-bold "
              onClick={() => navigate(`/tradelicense/${licenseNo}`)}
            >
              ট্রেড লাইসেন্স তৈরি/রিনিও করুন
            </button>
          </Box>
        </Box>

        <Box gridColumn="span 12" mb="100px">
          <Header subtitle="পূর্বে ইস্যুকৃত ট্রেড লাইসেন্স সমূহ" />
          <Box className="flex items-center justify-center">
            <p>Trade License are here</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BusinessProfile;

import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import CurrencyLiraOutlinedIcon from "@mui/icons-material/CurrencyLiraOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { host } from "../../ConfigurText";
import BarChart from "../../components/BarChart";
import GeographyChart from "../../components/GeographyChart";
import Header from "../../components/Header";
import ProgressCircle from "../../components/ProgressCircle";
import StatBox from "../../components/StatBox";
import { tokens } from "../../theme";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isMobile = useMediaQuery("(max-width:640px)");
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetch(`${host}/certificatesubmit`)
      .then((res) => res.json())
      .then((data) => {
        setCertificates(data.length);
      });
  }, []);
  const [citizens, setCitizenData] = useState([]);

  useEffect(() => {
    fetch(`${host}/citizens`)
      .then((res) => res.json())
      .then((data) => {
        setCitizenData(data.length);
      });
  }, []);

  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    fetch(`${host}/business`)
      .then((res) => res.json())
      .then((data) => {
        setBusinesses(data.length);
      });
  }, []);

  const [transections, setTransections] = useState([]);

  useEffect(() => {
    fetch(`${host}/transection`)
      .then((res) => res.json())
      .then((data) => {
        setTransections(data);
      });
  }, []);

  const [taxStatement, setTaxStatement] = useState([]);

  useEffect(() => {
    fetch(`${host}/taxinfo`)
      .then((res) => res.json())
      .then((data) => {
        setTaxStatement(data);
      });
  }, []);

  const totalTaxCollected = taxStatement.reduce(
    (totalTaxCollected, citizen) => totalTaxCollected + citizen.paidAmount,
    0
  );

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn={isMobile ? "span 12" : "span 4"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${certificates} টি`}
            subtitle="সনদ প্রদান করা হয়েছে"
            progress="0.75"
            increase="+14%"
            icon={
              <CardMembershipOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isMobile ? "span 12" : "span 4"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${citizens} জন`}
            subtitle="নাগরিক যুক্ত আছে"
            progress="0.50"
            increase="+21%"
            icon={
              <GroupAddOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isMobile ? "span 12" : "span 4"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${businesses} জন`}
            subtitle="ব্যবসায়ী যুক্ত আছে"
            progress="0.30"
            increase="+5%"
            icon={
              <StorefrontOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isMobile ? "span 12" : "span 4"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${totalTaxCollected} টাকা`}
            subtitle="কর আদায় হয়েছে"
            progress="0.80"
            increase="+43%"
            icon={
              <CurrencyLiraOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}

        <Box
          gridColumn={isMobile ? "span 12" : "span 8"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {transections.map((transaction) => (
            <Box
              key={transaction._id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.purpose}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.paidDate}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.paidAmount}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn={isMobile ? "span 12" : "span 4"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn={isMobile ? "span 12" : "span 4"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn={isMobile ? "span 12" : "span 4"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

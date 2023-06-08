import { Box, Button, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { host } from "../../ConfigurText";
import Header from "../../components/Header";
import { mockTransactions } from "../../data/mockData";
import { tokens } from "../../theme";

const UserTransection = () => {
  const isNonMobile = useMediaQuery("(min-width:1200px)");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { nid } = useParams();
  console.log("nid", nid);

  const [load, setLoad] = useState(false);

  const [transection, setTransection] = useState({});

  useEffect(() => {
    const url = `${host}/transection/${nid}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTransection(data.reverse());
      });
  }, [nid, load]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={`গ্রহণকৃত সকল সেবা`} />

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
            {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}

      <Box
        mt="50px"
        gridColumn="span 6"
        gridRow="span 3"
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
        {mockTransactions.map((transaction, i) => (
          <Box
            key={`${transaction.txId}-${i}`}
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
                {transaction.txId}
              </Typography>
              <Typography color={colors.grey[100]}>
                {transaction.user}
              </Typography>
            </Box>
            <Box color={colors.grey[100]}>{transaction.date}</Box>
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
            >
              ${transaction.cost}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default UserTransection;

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Header from "../../components/Header";
import ProfileText from "../../components/ProfileText";
import ServicesForCitizen from "../../components/ServicesForCitizen";
import { host } from "../../ConfigurText";
import { mockTransactions } from "../../data/mockData";
import certificate from "../../photos/certificate-svgrepo-com.svg";
import { tokens } from "../../theme";

const CitizenProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { nid } = useParams();
  const [load, setLoad] = useState(false);

  const [citizen, setCitizen] = useState({});

  useEffect(() => {
    const url = `${host}/citizen/${nid}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCitizen(data.result[0]);
      });
  }, [nid, load]);

  const paidTaxButton = (nid, paidAmount, paidTax) => {
    const dataForSend = {
      totalTax: parseInt(paidAmount),
      oldTax: parseInt(paidTax),
    };

    fetch(`${host}/paidtax/${nid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForSend),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.msg === "success") {
          swal(
            "ধন্যবাদ!",
            ` ${citizen.nameBn} এর বর্তমান অর্থবছরের টেক্স সফলভাবে পরিশোধ হয়েছে`,
            "success"
          );
          setLoad(true);
        } else {
          swal(
            "দুঃখিত!",
            `  ${citizen.nameBn} এর বর্তমান অর্থবছরের টেক্স পরিশোধ হয়নি, আবার চেষ্টা করুন `,
            "warning"
          );
        }
      });
  };

  const handlConfirm = (nid, taxAmmount, paidTax) => {
    Swal.fire({
      title: "পরিশোধ করতে ক্লিক করুন",
      html: `<input value=${taxAmmount} readOnly type="number" id="paidAmmount" class="swal2-input" placeholder="টেক্স এর পরিমাণ">`,
      confirmButtonText: "পরিশোধ করুন",
      focusConfirm: true,

      preConfirm: () => {
        const ammount = Swal.getPopup().querySelector("#paidAmmount").value;
        if (!ammount) {
          Swal.showValidationMessage(`সঠিক পরিমাণ বসান`);
        }
        const paidAmount = parseInt(ammount);
        paidTaxButton(nid, paidAmount, paidTax);
        return { ammount: paidAmount };
      },
    }).then((result) => {
      //   Swal.fire(
      //     `
      //     's Addmission Successful & Payment ${result.value.ammount} Was Added Successfully;`.trim()
      //   );
    });
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={`Profile Of  ${citizen?.name}`}
          subtitle="Welcome to your dashboard"
        />

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
        {/* ROW 2 */}
        <Box
          gridColumn="span 3"
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
                src={citizen.image}
                alt={citizen.name}
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
              {citizen.nameBn}
            </Typography>
          </Box>
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box mt="25px" mb="5px" p="0 30px">
            <Box>
              <Box pt="10px">
                <ProfileText citizen={citizen} />
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box
            mt="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {citizen.current === new Date().getFullYear() ? (
              <h3>টেক্স পরিশোধ করা হয়েছে</h3>
            ) : (
              <Button
                onClick={() =>
                  handlConfirm(citizen.nid, citizen.taxAmmount, citizen.paidTax)
                }
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                <PaidIcon sx={{ mr: "10px" }} />
                {citizen.taxAmmount} টেক্স পেমেন্ট
              </Button>
            )}
          </Box>
        </Box>

        <Box
          gridColumn="span 3"
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

        {/* ROW 3 */}

        <Box gridColumn="span 12" mb="20px">
          <Header subtitle="Services" />
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            <ServicesForCitizen title={"জাতীয়তা সনদ"} icon={certificate} />
            <ServicesForCitizen title={"চারিত্রিক সনদ"} icon={certificate} />
            <ServicesForCitizen title={"বৈবাহিক সনদ"} icon={certificate} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CitizenProfile;

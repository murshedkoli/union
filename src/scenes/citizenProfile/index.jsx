import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Header from "../../components/Header";
import ProfileText from "../../components/ProfileText";
import ServicesForCitizen from "../../components/ServicesForCitizen";
import { host } from "../../ConfigurText";
import certificate from "../../photos/certificate-svgrepo-com.svg";
import { tokens } from "../../theme";

const CitizenProfile = () => {
  const isNonMobile = useMediaQuery("(min-width:1200px)");

  const thisYear = new Date().getFullYear();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const { nid } = useParams();
  const [load, setLoad] = useState(false);

  const [citizen, setCitizen] = useState({});
  const [dataLoad, setDataload] = useState(false);
  const [familyTax, setFamilyTax] = useState();
  const familyMember = citizen.familyMember;

  useEffect(() => {
    const url = `${host}/citizen/${nid}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCitizen(data.result[0]);
        if (data.result[0].familyMember) {
          setDataload(true);
        }
      });
  }, [nid, load]);

  useEffect(() => {
    const url = `${host}/citizen/${familyMember}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFamilyTax(data.result[0]);
      });
  }, [dataLoad, familyMember]);

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

  const navigateFamilyMember = () => {
    navigate(`/citizens/${citizen.familyMember}`);
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
            onClick={() => navigate(`/citizens/transection/${nid}`)}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            গৃহীত সেবা সমূহ
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
            <Divider />
            {familyTax && (
              <Typography
                mt="20px"
                textAlign="center"
                variant="h3"
                color={colors.blueAccent[400]}
              >
                পরিবারের সদস্য: {familyTax?.nameBn}
              </Typography>
            )}
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
            {citizen.current === thisYear || familyTax?.current === thisYear ? (
              <>
                {familyTax?.current === thisYear ? (
                  <h2>
                    আপনার টেক্স পরিশোধ করেছে আপনার পরিবারের সদস্য :
                    <Button
                      sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                      }}
                      onClick={() => navigateFamilyMember()}
                    >
                      {familyTax?.nameBn}
                    </Button>
                  </h2>
                ) : (
                  " আপনার টেক্স পরিশোধ ইতিমধ্যে পরিশোধ করেছেন"
                )}
              </>
            ) : (
              <Button
                //
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

        {/* ROW 3 */}

        <Box gridColumn="span 12" mb="100px">
          <Header subtitle="Services" />
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            <ServicesForCitizen
              title={"জাতীয়তা সনদ"}
              icon={certificate}
              nid={citizen.nid}
              location="nationalitycertificate"
            />
            <ServicesForCitizen
              title={"চারিত্রিক সনদ"}
              icon={certificate}
              nid={citizen.nid}
              location="charactercertificate"
            />
            <ServicesForCitizen
              title={"বৈবাহিক সনদ"}
              icon={certificate}
              nid={citizen.nid}
              location="marriedcertificate"
            />
            <ServicesForCitizen
              title={"অবিবাহিত সনদ"}
              icon={certificate}
              nid={citizen.nid}
              location="unmarriedcertificate"
            />
            <ServicesForCitizen
              title={"ভূমিহীন সনদ"}
              icon={certificate}
              nid={citizen.nid}
              location="landlesscertificate"
            />
            <ServicesForCitizen
              title={"বৈবাহিক সনদ"}
              icon={certificate}
              nid={citizen.nid}
              location="marriedcertificate"
            />
            <ServicesForCitizen
              title={"বৈবাহিক সনদ"}
              icon={certificate}
              nid={citizen.nid}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CitizenProfile;

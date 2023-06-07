import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import { Button, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { host } from "../../ConfigurText";
import ProfileText from "../../components/ProfileText";
import ServicesForCitizen from "../../components/ServicesForCitizen";
import certificate from "../../photos/certificate-svgrepo-com.svg";
import { tokens } from "../../theme";

const CitizenProfile = () => {
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
        setCitizen(data[0]);
        if (data[0].familyMember) {
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
        setFamilyTax(data[0]);
      });
  }, [dataLoad, familyMember]);

  const paidTaxButton = (nid, paidAmount, paidTax, name) => {
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
          fetch(`${host}/taxinfo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nid, paidAmount, name }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            });

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

  const handlConfirm = (nid, taxAmmount, paidTax, name) => {
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
        paidTaxButton(nid, paidAmount, paidTax, name);
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
    <>
      <div className="p-5 flex flex-col w-full gap-5">
        <div className="flex justify-between flex-wrap">
          <div>
            <h1 className="text-4xl font-bold">Profile Of {citizen?.name}</h1>
            <p>Welcome to your dashboard</p>
          </div>

          <div>
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
          </div>
        </div>
        <div className="flex-col">
          <div className="flex justify-between flex-wrap border-solid border-sky-500 border-2 p-5">
            <div className=" sm:flex-2 flex flex-col gap-2 mr-5 background-blue-600">
              <div>
                <img src={citizen.image} alt={citizen.name} className="w-20" />
              </div>
              <div className="text-2xl">{citizen?.nameBn}</div>
              <div>
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
              </div>
            </div>
            <div className="flex-2 sm:flex-5">
              <ProfileText citizen={citizen} />
            </div>
          </div>

          <div>
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
                  handlConfirm(
                    citizen.nid,
                    citizen.taxAmmount,
                    citizen.paidTax,
                    citizen.name
                  )
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
          </div>
        </div>
        {citizen.current !== thisYear ||
          (familyTax?.current !== thisYear && (
            <div className="flex w-full flex-wrap">
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
            </div>
          ))}
      </div>
    </>
  );
};

export default CitizenProfile;

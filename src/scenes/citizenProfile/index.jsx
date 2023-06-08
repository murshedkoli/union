import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Button,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { host } from "../../ConfigurText";
import PersonalInfoBox from "../../components/PersonalInfoBox";
import ServicesForCitizen from "../../components/ServicesForCitizen";
import certificate from "../../photos/certificate-svgrepo-com.svg";
import { tokens } from "../../theme";
import "./style.css";

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
  const isMobile = useMediaQuery("(max-width:640px)");

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
        setFamilyTax(data[0]);
      });
  }, [dataLoad, familyMember]);

  const taxEntry = (name, paidAmount, nid) => {
    const postTax = {
      name,
      paidAmount,
      nid,
      paidDate: new Date(),
    };

    fetch(`${host}/taxinfo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postTax),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "success") {
          swal(
            "দুঃখিত!",
            `  ${citizen.nameBn} এর বর্তমান অর্থবছরের টেক্স পরিশোধ সফলভাবে সম্পন্ন হয়েছে `,
            "success"
          );
        } else {
          swal(
            "দুঃখিত!",
            `  ${citizen.nameBn} এর বর্তমান অর্থবছরের টেক্স পরিশোধ হয়নি, আবার চেষ্টা করুন `,
            "warning"
          );
        }
      });
  };

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
        if (data.msg === "success") {
          taxEntry(name, paidAmount, nid);
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
      <div className="pr-5 pl-5">
        <div className="">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 w-full h-40 rounded-lg p-5">
            <h1 className="text-3xl text-emerald-500">
              <span className="text-bold">{citizen.name}</span> এর প্রোফাইল
            </h1>
          </div>

          <div className="bg-slate-700 align-middle  h-24 ml-7 mr-7  rounded-xl p-2 profile-holder flex justify-between">
            <div className="flex">
              <img
                src={citizen.image}
                alt=""
                srcset=""
                className="rounded-lg"
              />
              <div className="pl-5">
                <p className="text-lg">{citizen.nameBn}</p>
                <p>{citizen.village}</p>
              </div>
            </div>
            <div
              className={`flex  h-full items-center gap-8 pr-4 ${
                isMobile && "hidden"
              }`}
            >
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                <EditOutlinedIcon sx={{ mr: "10px" }} />
                Edit
              </Button>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                <SettingsOutlinedIcon sx={{ mr: "10px" }} />
                Settings
              </Button>
            </div>
          </div>
        </div>

        <div className={`flex gap-2 flex-wrap p-2`}>
          <div
            className="flex-1 p-4 rounded-l-lg"
            style={{ backgroundColor: colors.primary[400] }}
          >
            <p className="text-lg font-bold text-center">ব্যক্তিগত তথ্য</p>
            <Divider />
            <div className="mt-4 ">
              <PersonalInfoBox titletext="পিতা" fillText={citizen.father} />
              <PersonalInfoBox titletext="মাতা" fillText={citizen.mother} />
              <PersonalInfoBox
                titletext="আইডি নাম্বার"
                fillText={citizen.nid}
              />
              <PersonalInfoBox titletext="জন্ম তারিখ" fillText={citizen.dob} />
              <PersonalInfoBox titletext="ইমেইল" fillText={citizen.email} />
              <PersonalInfoBox titletext="মোবাইল" fillText={citizen.contact} />
            </div>
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
          <div
            className="flex-1 p-4 "
            style={{ backgroundColor: colors.primary[400] }}
          >
            <p className="text-lg font-bold text-center">প্রাপ্ত সেবা সমূহ</p>
            <Divider />
            <div className="mt-4 "></div>
          </div>
          <div
            className="flex-1 p-4 rounded-r-lg"
            style={{ backgroundColor: colors.primary[400] }}
          >
            <p className="text-lg font-bold text-center">লেনদেন সমূহ</p>
            <Divider />
            <div className="mt-4 ">
              <div>
                <div>
                  {citizen.current === thisYear ||
                  familyTax?.current === thisYear ? (
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
                        " আপনার বর্তমান অর্থবছরের কর পরিশোধিত হয়েছে"
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
              <div></div>
            </div>
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

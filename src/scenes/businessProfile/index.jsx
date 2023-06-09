import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Button, Divider, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { host } from "../../ConfigurText";
import PersonalInfoBox from "../../components/PersonalInfoBox";
import { tokens } from "../../theme";

const BusinessProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const { licenseNo } = useParams();

  const [business, setBusiness] = useState({});
  const isMobile = useMediaQuery("(max-width:640px)");
  useEffect(() => {
    const url = `${host}/business/${licenseNo}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBusiness(data[0]);
      });
  }, [licenseNo]);

  return (
    <>
      <div className="pr-5 pl-5">
        <div className="">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 w-full h-40 rounded-lg p-5">
            <h1 className="text-3xl text-emerald-500">
              <span className="text-bold">{business.businessName}</span> এর
              প্রোফাইল
            </h1>
          </div>

          <div className="bg-slate-700 align-middle  h-24 ml-7 mr-7  rounded-xl p-2 profile-holder flex justify-between">
            <div className="flex">
              <img
                src={business.image}
                alt=""
                srcset=""
                className="rounded-lg"
              />
              <div className="pl-5 flex">
                <div>
                  <p className="text-lg">{business.ownerName}</p>
                  <p>{business.address}</p>
                </div>
                <div className="ml-5 h-full flex items-center ">
                  <PersonalInfoBox
                    titletext="লাইসেন্স নং"
                    fillText={business.licenseNo}
                  />
                </div>
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
              <PersonalInfoBox
                titletext="পিতা"
                fillText={business.fathersName}
              />
              <PersonalInfoBox
                titletext="মাতা"
                fillText={business.mothersName}
              />
              <PersonalInfoBox
                titletext="ব্যবসায়ের ধরণ"
                fillText={business.businessType}
              />
              <PersonalInfoBox
                titletext="ব্যবসায়ের মূলধন"
                fillText={business.businessCapital}
              />
              <PersonalInfoBox
                titletext="লাইসেন্স ফি"
                fillText={business.licenseFee}
              />
              <PersonalInfoBox titletext="মোবাইল" fillText={business.contact} />
            </div>
            <div></div>
          </div>
          <div
            className="flex-1 p-4 "
            style={{ backgroundColor: colors.primary[400] }}
          >
            <p className="text-lg font-bold text-center">প্রাপ্ত সেবা সমূহ</p>
            <Divider />
            <div className="mt-4 ">
              <button
                className="pr-20 pl-20 pt-5 pb-5 bg-green-900 rounded-lg hover:text-black hover:bg-green-300 font-bold "
                onClick={() => navigate(`/tradelicense/${licenseNo}`)}
              >
                ট্রেড লাইসেন্স তৈরি/রিনিও করুন
              </button>
            </div>
          </div>
          <div
            className="flex-1 p-4 rounded-r-lg"
            style={{ backgroundColor: colors.primary[400] }}
          >
            <p className="text-lg font-bold text-center">লেনদেন সমূহ</p>
            <Divider />
            <div className="mt-4 ">
              <div>
                <div></div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessProfile;

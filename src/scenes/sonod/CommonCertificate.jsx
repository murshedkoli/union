import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Button, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import bglogo from "../../photos/bglogo.png";
import nlogo from "../../photos/nlogo.png";

import ReactToPrint from "react-to-print";
import swal from "sweetalert";
import { host } from "../../ConfigurText";
import { tokens } from "../../theme";

function CommonCertificate() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { nid, type } = useParams();

  const ref = useRef();

  const [certificateType, setCertificateType] = useState({
    title: "",
    titleBn: "",
    description: "",
  });
  const [issueDate, setIssueDate] = useState(null);

  const [citizen, setCitizen] = useState(null);

  const [isClick, setIsClick] = useState(false);

  const [certificates, setCertificate] = useState(null);
  const [submitCer, setSubmitCer] = useState(null);
  const [slNo, setSlNo] = useState(null);

  useEffect(() => {
    if (type === "nationalitycertificate") {
      setCertificateType({
        title: "nationality",
        titleBn: "জাতীয়তা",
        description: "তাহার নৈতিক চরিত্র ভাল",
      });
    }
    if (type === "charactercertificate") {
      setCertificateType({
        title: "character",
        titleBn: "চারিত্রিক",
        description: "তাহার চরিত্র ভাল",
      });
    }

    if (type === "marriedcertificate") {
      setCertificateType({
        title: "married",
        titleBn: "বৈবাহিক",
        description: "তিনি বাংলাদেশের আইন অনুসারে বিবাহ বন্ধনে আবদ্ধ হয়েছেন",
      });
    }

    if (type === "unmarriedcertificate") {
      setCertificateType({
        title: "unmarried",
        titleBn: "অবিবাহিত",
        description: " সে এখনো কাহারো সহিত বিবাহ বন্ধনে আবদ্ধ হয়নি",
      });
    }

    if (type === "landlesscertificate") {
      setCertificateType({
        title: "landless",
        titleBn: "ভূমিহীন",
        description: " তার নিজের কোন জমি নাই। সে একজন ভূমিহীন",
      });
    }
  }, [type]);

  useEffect(() => {
    const url = `${host}/citizens/${nid}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCitizen(data[0]);
      });
  }, [nid]);

  useEffect(() => {
    fetch(`${host}/getcertificate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nid: nid,
        certificate: certificateType.title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCertificate(data);
      });
  }, [certificateType.title, nid]);

  const submitCertificate = (type, slNo, oldissueDate) => {
    const issueDate = new Date().toDateString();

    const Data = {
      name: citizen.nameBn,
      issueDate: issueDate,
      nid: citizen.nid,
      slNo: new Date().getTime().toString(),
      certificate: certificateType.title,
    };
    if (type === "new") {
      fetch(`${host}/certificatesubmit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.msg === "success") {
            setIssueDate(issueDate);
            setSubmitCer(data.result);
            setSlNo(slNo);
            swal(
              "ধন্যবাদ!",
              ` ${citizen?.nameBn} এর জন্য ${certificateType.titleBn} সনদ তৈরি হয়েছে`,
              "success"
            );
            setIsClick(true);
          } else {
            swal(
              "দুঃখিত!",
              ` ${citizen?.nameBn} এর জন্য ${certificateType.titleBn} সনদ তৈরি হয়নি `,
              "warning"
            );
          }
        });
    } else {
      setIssueDate(oldissueDate);
      setIsClick(true);
      setSlNo(slNo);
    }
  };

  return (
    <div>
      {isClick && (
        <div className="flex justify-center">
          <ReactToPrint
            trigger={() => (
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
                Download or Print
              </Button>
            )}
            content={() => ref.current}
          />
        </div>
      )}

      {isClick ? (
        <div
          style={{
            backgroundImage: `url(${bglogo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundSize: "400px",
            backgroundOpacity: "0.2",
          }}
          ref={ref}
          className=" w-150 p-4 space-y-5 ring-8 m-4  text-black bg-orange-100 relative"
        >
          <div className="text-center">
            <p className="text-xs text-purple-600">
              বিসমিল্লাহির রাহমানির রাহিম
            </p>
            <p className="text-lg text-red-600">
              গনপ্রজাতন্ত্রী বাংলাদেশ সরকার
            </p>
            <p className="text-purple-600">স্থানীয় সরকার বিভাগ</p>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-900">
              ০৪ নং কালিকচ্ছ ইউনিয়ন পরিষদ
            </h1>
            <h3 className="text-lg text-purple-600 font-bold">
              উপজেলাঃ সরাইল, জেলাঃ ব্রাহ্মণবাড়িয়া
            </h3>
          </div>

          <div className=" h-1 w-full bg-gray-600"></div>

          <div className="flex space-x-5">
            <div className="flex-1">
              <h3 className="text-2xl text-right text-purple-700 font-bold">
                মোঃ ছায়েদ হোসেন
              </h3>
              <div className=" h-px w-full bg-gray-600"></div>

              <p className="text-lg text-right text-red-600">চেয়ারম্যান</p>
              <p className="text-right text-xl text-red-600">01715366200</p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <img className="h-20" src={nlogo} alt="#" srcSet={nlogo} />
            </div>
            <div className="flex-1 text-red-600 text-lg">স্মারক নংঃ {slNo}</div>
          </div>

          <div className="text-center ">
            <div className="  flex justify-center items-center">
              <h1 className="w-80 text-white ring-8 rounded-sm bg-gray-900 p-2 text-4xl font-bold ">
                {certificateType.titleBn} সনদপত্র
              </h1>
            </div>
            <h1 className="text-3xl capitalize underline text-purple-600 mt-2">
              {certificateType.title} Certificate
            </h1>
          </div>

          <div>
            <p className="text-lg">
              এই মর্মে প্রত্যয়ন করা যাইতেছে যে,
              <br /> <strong>{citizen?.nameBn}</strong>, যার এনআইডি নাম্বারঃ{" "}
              {nid} <br /> পিতাঃ {citizen?.father}, মাতাঃ {citizen?.mother}{" "}
              <br /> গ্রামঃ {citizen?.village}, ডাকঘরঃ কালিকচ্ছ, উপজেলাঃ সরাইল,
              জেলাঃ ব্রাহ্মণবাড়িয়া। <br /> তিনি অত্র ইউনিয়েনের ০৩ নং ইউনিয়নের
              স্থায়ী বাসিন্দা ও জন্ম সূত্রে বাংলাদেশের একজন অনুগত নাগরিক। <br />{" "}
              আমি তাহাকে ব্যাক্তিগত ভাবে চিনি ও জানি। আমার জানামতে{" "}
              {certificateType.description}
            </p>
          </div>

          <div className="flex justify-between">
            <div>ইস্যুর তারিখ:{issueDate} </div>
            <div className="text-right p-16 pb-0 text-lg">
              <p>চেয়ারম্যান</p>
              <p>০৪ নং কালিকচ্ছ ইউনিয়ন</p>
            </div>
          </div>
          <div className="w-24 absolute top-0 left-5">
            <img src={nlogo} alt="" srcset={nlogo} />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <p className="text-lg text-center">
              {citizen?.nameBn} এর জন্য ইস্যুকৃত {certificateType.titleBn} সনদ
              সমূহ
            </p>
            <div className="h-px bg-gray-200"></div>

            <div className="pr-20 pl-20">
              {certificates?.map((certificate) => (
                <div
                  key={certificate._id}
                  className="flex justify-between items-center ring p-2 mt-2 rounded ring-slate-400"
                >
                  <p> ইস্যুর তারিখঃ {certificate?.issueDate}</p>
                  <p> স্মারক নংঃ {certificate?.slNo}</p>
                  <button
                    onClick={() =>
                      submitCertificate(
                        "old",
                        certificate?.slNo,
                        certificate?.issueDate
                      )
                    }
                    className="bg-blue-600 p-2 rounded-md"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="text-lg flex justify-center mt-20">
            <div>
              <p className="p-2">
                {citizen?.nameBn} এর {certificateType.titleBn} সনদপত্র তৈরি করতে
              </p>
            </div>
            <div>
              <button
                onClick={() => submitCertificate("new")}
                className="bg-green-600 p-2 rounded"
              >
                ক্লিক করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommonCertificate;

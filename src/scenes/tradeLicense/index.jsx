import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import moment from "moment";
import swal from "sweetalert";
import { host } from "../../ConfigurText";
import "./license.css";
const SingleLicense = () => {
  const { licenseNo } = useParams();
  const navigate = useNavigate();

  const [business, setBusiness] = useState([]);

  const [licenseFee, setLicenseFee] = useState(0);

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const url = `${host}/business/${licenseNo}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBusiness(data.result[0]);
      });
  }, [licenseNo]);

  const fiscalYear = () => {
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth();
    let fy = 0;
    if (thisMonth <= 6) {
      fy = thisYear - 1;
    } else {
      fy = thisYear;
    }
    return fy;
  };

  const issueDate = moment().format("MM/DD/YYYY");

  const handleFormSubmit = () => {
    const tdData = {
      businessName: business.businessName,
      licenseNo: business.licenseNo,
      ownerName: business.ownerName,
      fathersName: business.fathersName,
      mothersName: business.mothersName,
      businessType: business.businessType,
      businessCapital: business.businessCapital,
      fiscalYear: fiscalYear(),
      businessAddress: business.businessCapital,
      address: business.address,
      issueDate,
      slNo: new Date().getTime().toString(),
      licenseFee,
      image: business.image,
    };

    fetch(`${host}/tradelicense`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tdData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "success") {
          swal("ধন্যবাদ!", `  ব্যবসায়ের ট্রেড লাইসেন্স তৈরি হয়েছে`, "success");
          navigate(`${tdData.slNo}`);
        } else {
          swal("দুঃখিত!", `  ${data.msg} আবার চেষ্টা করুন `, "warning");
        }
      });
  };

  const printHandle = () => {
    handleFormSubmit();
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center">
          {isClicked ? (
            <div>
              <p className="text-lg text-center">ব্যবসায়ের তথ্য</p>
              <div className="[&>*]:p-1 [&>*]:border-slate-700 [&>*]:border-2">
                <p>ব্যবসায় প্রতিষ্ঠানের নামঃ {business.businessName}</p>
                <p>লাইসেন্স নংঃ {business.licenseNo}</p>

                <p>মালিকের নামঃ {business.ownerName}</p>
                <p>পিতার নামঃ {business.fathersName}</p>
                <p>মাতার নামঃ {business.mothersName}</p>
                <p>ব্যবসায়ের ধরণঃ {business.businessType}</p>
                <p>ব্যবসায়ের মূলধনঃ {business.businessCapital}</p>
                <p>অর্থবছরঃ {fiscalYear()}</p>
                <p>ব্যবসায়ের ঠিকানাঃ {business.businessAddress}</p>
                <p>ইস্যুর তারিখঃ {issueDate}</p>
                <p>
                  লাইসেন্স ফিঃ
                  <input
                    className="text-black"
                    type="text"
                    placeholder="লাইসেন্স ফি লিখুন"
                    onChange={(e) => setLicenseFee(e.target.value)}
                  />
                </p>
              </div>

              <button
                onClick={() => printHandle()}
                className="bg-green-600 p-2 w-full"
              >
                সাবমিট
              </button>
            </div>
          ) : (
            <>
              <div>Old Certificate</div>

              <button
                onClick={() => setIsClicked(true)}
                className="bg-green-600 p-2"
              >
                নতুন/রিনিও
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleLicense;

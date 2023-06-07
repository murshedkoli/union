import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { host } from "../../ConfigurText";

function LicensePage() {
  const { slNo } = useParams();

  const [license, setLicense] = useState({});

  useEffect(() => {
    const url = `${host}/tradelicense/sl/${slNo}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLicense(data.result[0]);
      });
  }, [slNo]);

  const ref = useRef();

  return (
    <div className="single">
      <div className="singleContainer">
        <div className="printableArea">
          <div className="printButton">
            <ReactToPrint
              trigger={() => <button>Print/ save</button>}
              content={() => ref.current}
            />
          </div>
          <div ref={ref} className="tradeLicensePrint text-black">
            <div className="licenseHeader">
              <span>ইউ, পি ৭নং ফরম</span>
              <span>[১২ (১) নং বিধান দ্রষ্টব্য]</span>
            </div>
            <div className="upName">০৪নং কালিকচ্ছ ইউনিয়ন পরিষদ</div>
            <div className="upAddress">
              ডাকঘরঃ কালিকচ্ছ, উপজেলাঃ সরাইল, জেলাঃ ব্রাহ্মণবাড়িয়া
            </div>
            <div className="logoAndPhoto">
              <div className="upLogo">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/480px-BMW_logo_%28gray%29.svg.png"
                  alt=""
                />
              </div>
              <div className="licenseTitle">ব্যবসা-বাণিজ্যের লাইসেন্স</div>
            </div>
            <div className="licenseNoWithYear">
              <div className="licenseNo">লাইসেন্স নংঃ {license.licenseNo}</div>
              <div className="financialYear">
                অর্থবছরঃ {license?.fiscalYear}
              </div>
            </div>
            <div className="licenseBody">
              <div className="fullInfo">
                <div className="titleText">
                  <div className="licenseText">প্রতিষ্ঠানের নামঃ </div>
                  <div className="licenseText"> প্রাপকের নামঃ </div>
                  <div className="licenseText">পিতার নামঃ </div>
                  <div className="licenseText">মাতার নামঃ </div>
                </div>
                <div className="userInformation">
                  <div className="licenseText">{license?.businessName}</div>
                  <div className="licenseText"> {license?.ownerName}</div>
                  <div className="licenseText"> {license?.fathersName} </div>
                  <div className="licenseText"> {license?.mothersName} </div>
                </div>
              </div>

              <div className="fixedAddress">
                <h2 className="addressTitle text-black">স্থায়ী ঠিকানাঃ</h2>

                <p className="text-black"> {license?.address} </p>
              </div>
              <div className="fixedAddress">
                <h2 className="addressTitle text-black">ব্যাবসায়ের ঠিকানাঃ</h2>
                <p className="text-black">{license?.businessAddress}</p>
              </div>

              <div className="licenseFee">
                <div className="businessType">
                  ব্যবসায়ের ধরণঃ {license?.businessType}
                </div>
                <div className="fee">
                  লাইসেন্স ফিঃ {license.licenseFee} টাকা মাত্র{" "}
                </div>
              </div>
            </div>
            <div className="licenseFooter">
              <div className="meyad">
                প্রদান করায় তাহাকে এই লাইসেন্স মঞ্জুর করা হইল, বর্তমান আর্থিক
                বছরের জন্য বলবত থাকিবে।
              </div>
              <div className="dateAndSign">
                <div className="date">
                  {" "}
                  ইস্যুর তারিখঃ {moment().format("MM/DD/YYYY")} ইং
                </div>
                <div className="chairmansign">
                  চেয়ারম্যান <br />
                  মোঃ ছায়েদ হোসেন
                </div>
              </div>
            </div>
            <div className="userPhoto">
              <img src={license?.image} alt="লাইসেন্স প্রাপকের ছবি" />
            </div>
          </div>

          <div className="printButton">
            <ReactToPrint
              trigger={() => <button>Print/ save</button>}
              content={() => ref.current}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LicensePage;

import React from "react";

const PersonalInfoBox = ({ titletext, fillText }) => {
  return (
    <div className="mb-3">
      <p>
        <span className="font-bold mr-1">{titletext}ঃ </span>
        {fillText}
      </p>
    </div>
  );
};

export default PersonalInfoBox;

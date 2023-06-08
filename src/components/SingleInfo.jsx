import React from "react";

const SingleInfo = (title, desc) => {
  return (
    <p>
      <span>{title} </span>
      {desc}
    </p>
  );
};

export default SingleInfo;

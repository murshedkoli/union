import React from "react";

const SingleInfo = (title, desc) => {
  return (
    <div className="flex gap-2 justify-between">
      <div className="flex gap-1">
        <p>{title}</p>
      </div>
      <p>{desc}</p>
    </div>
  );
};

export default SingleInfo;

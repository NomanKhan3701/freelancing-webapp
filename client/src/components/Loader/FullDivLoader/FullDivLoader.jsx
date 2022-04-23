import React from "react";
import "./FullDivLoader.scss";

const FullDivLoader = () => {
  return (
    <div className="full-div-loader">
      <div className="gooey">
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default FullDivLoader;

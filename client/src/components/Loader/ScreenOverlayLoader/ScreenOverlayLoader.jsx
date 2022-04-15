import React from "react";
import "./ScreenOverlayLoader.scss";

const ScreenOverlayLoader = () => {
  return (
    <div className="screen-overlay-loader">
      <div className="loading-spinner"></div>
      <div className="overlay"></div>
    </div>
  );
};

export default ScreenOverlayLoader;

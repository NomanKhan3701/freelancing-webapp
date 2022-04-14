import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";

const VideoCall = () => {
  const { state } = useLocation();
  const [id, setId] = useState(state.id);
  useEffect(() => {
    const domain = "https://freelance-meeting.daily.co/";

    axios
      .get(`http://localhost:8080/video-call/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const script = document.createElement("script");
          script.innerHTML = `window.DailyIframe.createFrame({
            iframeStyle: {
              position: "relative",
              width: "100%",
              height: "100%",
              border: "0",
              zIndex: 9999
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          }).join({
            url: "${domain}${id}",
          });`;
          document.body.appendChild(script);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  return <div></div>;
};

export default VideoCall;

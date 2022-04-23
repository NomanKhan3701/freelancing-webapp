import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import "./VideoCall.scss"

const VideoCall = () => {
  const { state } = useLocation();
  const [id, setId] = useState(state.id);
  let Containerref = useRef(null);
  // let script = null;


  const VideoELement = () => {
    return
  }

  useEffect(() => {
    const domain = "https://freelance-meeting.daily.co/";

    let scriptIdTemp = document.getElementById("script-id");
    const container = document.getElementById("video-call-container-id");
    if (!scriptIdTemp) {
      axios
        .get(`http://localhost:8080/video-call/${id}`)
        .then((res) => {
          if (res.status === 200) {
            const script = document.createElement("script");
            script.id = "script-id";
            // container.appendChild(script);
            console.log(Containerref.current);
            container.append(script);
            script.innerHTML = `window.DailyIframe.createFrame({
            iframeStyle: {
              position: "relative",
              width: "100%",
              height: "100vh",
              border: "0",
              zIndex: 9999
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          }).join({
            url: "${domain}${id}",
          }); `;

            // if (!document.body.hasChildNodes()) {
            // document.body.appendChild(script)
            // }
            // else{

            // }
            // if (document.getElementById)
            // document.getElementById("root").appendChild(script);
          }
        })
        .catch((err) => console.log(err));
    }
    // window.addEventListener('beforeunload', function (e) {
    //   e.preventDefault();
    //   e.returnValue = '';
    //   const elem = this.document.querySelector('iframe');
    //   console.log("hi " + elem);
    //   document.body.removeChild(elem);
    // });
    return (() => {
      const elem = this.document.querySelector('iframe');
      console.log("hi " + elem);
      document.body.removeChild(elem);
      // window.addEventListener("beforeunload", (ev) => {
      // ev.preventDefault();
      // window.removeEventListener('beforeunload', () => {
      //   console.log("event listener removed");
      // })
      // })
    })
  }, []);
  return (<div className="video-call-container" id="video-call-container-id">
    <div id="IframeContainer" ref={Containerref}></div>
  </div>)
};

export default VideoCall;

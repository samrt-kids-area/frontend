import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useCheckFaceMutation } from "./redux/services/apiSlice";

const FaceScanner = ({ childId }) => {
  const webcamRef = useRef(null);
  const [box, setBox] = useState(null);
  const [checkFace] = useCheckFaceMutation();

  useEffect(() => {
    const interval = setInterval(capture, 1000); // كل 2 ثانية
    return () => clearInterval(interval);
  }, []);

  const capture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      try {
        const formData = new FormData();
        formData.append("image", imageSrc);
        formData.append("childId", childId);
        const res = await checkFace(formData);
        /* const res = await axios.post(
          "http://localhost:3000/check-face",
          JSON.stringify(),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ); */

        if (res.data.found) {
          setBox(res.data.box); // box = { top, left, width, height }
        } else {
          setBox(null);
        }
      } catch (err) {
        console.error("Error sending image:", err);
      }
    }
  };

  return (
    <div style={{ position: "relative", width: 640, height: 480 }}>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      {box && (
        <div
          style={{
            position: "absolute",
            top: box.top,
            left: box.left,
            width: box.width,
            height: box.height,
            border: "3px solid red",
            boxSizing: "border-box",
          }}
        />
      )}
    </div>
  );
};

export default FaceScanner;

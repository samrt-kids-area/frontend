import React, { useEffect, useRef, useState } from "react";
import { useCheckFaceMutation } from "../../redux/services/apiSlice";
import Webcam from "react-webcam";
import { useSelector } from "react-redux";
import axios from "axios";
import IOT from "../../components/IOT";

const KidsRoom = () => {
  const webcamRef = useRef(null);
  const [box, setBox] = useState(null);
  const [checkFace] = useCheckFaceMutation();
  const parent = useSelector((state) => state.parent);

  const child =
    parent?.parent?.parent?.children.length > 0
      ? parent?.parent?.parent?.children[0]
      : null;

  /* useEffect(() => {
    if (parent?.parent?.parent?.children.length > 0) {
      const interval = setInterval(capture, 1000); // كل 2 ثانية
      return () => clearInterval(interval);
    }
  }, []);

  const capture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      // تحويل base64 إلى Blob
      const blob = await (await fetch(imageSrc)).blob();
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });

      try {
        const formData = new FormData();
        formData.append("image", file); // لاحظ هنا: نرسل الملف نفسه
        formData.append("childId", child._id);
        formData.append("encoding", JSON.stringify(child.encoding)); // تأكد إنها JSON

        const res = await axios.post(
          "http://localhost:8080/check-face",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.data.found) {
          setBox(res.data.box);
        } else {
          setBox(null);
        }
      } catch (err) {
        console.error("Error sending image:", err);
      }
    }
  }; */

  return (
    <div className="bg-[#f0f4f8] min-h-screen flex flex-col gap-5 md:gap-10">
      <div className="flex justify-between items-center px-4 md:px-20 py-3 border-b bg-white">
        <h1 className="text-2xl font-bold text-[#3b82f6]">Kids Room</h1>
        <div className="flex items-center justify-between gap-5">
          <p className="text-[#6b7280]">
            Welcome{" "}
            <span className="text-[#3b82f6]">{parent.parent.parent.name}</span>{" "}
          </p>
          <button className="text-[#6b7280]">Logout</button>
        </div>
      </div>
      <p className="text-center text-[#0b2d5c] text-[28px]">
        Live Stream: Your Kid in the Play Area
      </p>
      <div className="flex justify-between items-center px-4 md:px-20 gap-20 h-[500px]">
        <div className="relative flex-[3] border h-full rounded-[16px] flex justify-center items-center bg-white text-center overflow-hidden">
          {/* {parent?.parent?.parent?.children.length > 0 ? (
            <>
              {" "}
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className=""
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
            </>
          ) : (
            <p className="">your child is not in the play area</p>
          )} */}
          {parent?.parent?.parent?.children.length > 0 ? (
            <img
              src={`${import.meta.env.STREAM_IP}/video_feed?target_name=ahmed`}
              alt="Live Stream"
              style={{
                width: "100%",
                maxWidth: "600px",
                border: "1px solid #ccc",
              }}
            />
          ) : (
            <p className="">your child is not in the play area</p>
          )}
        </div>
        <div className="flex-1 border h-full rounded-[16px] bg-white flex flex-col p-4 gap-5">
          <IOT />
          <div className="flex flex-col gap-4 pb-4 border-b">
            <p className="text-[#0b2d5c]">Current Status</p>
            <p className="text-[#6b7280]">Playing</p>
          </div>
          <div className="flex flex-col gap-4 pb-4 border-b">
            <p className="text-[#0b2d5c]">Last Update</p>
            <p className="text-[#6b7280]">2 mins ago</p>
          </div>
          <div className="flex flex-col gap-4 pb-4">
            <p className="text-[#0b2d5c]">Notification</p>
            <p className="text-[#6b7280]">Your Child moved to another zone.</p>
            {/* <div className="w-full h-[150px] bg-[#f0f4f8] rounded-[16px] p-4">
              Another Live Stream
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsRoom;

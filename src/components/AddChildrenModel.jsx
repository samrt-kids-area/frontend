import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAddChildrenMutation,
  useGetAllParentsQuery,
} from "../redux/services/apiSlice";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { ChevronUpIcon } from "lucide-react";
import axios from "axios";

const AddChildrenModel = ({
  showAddChildren,
  setShowAddChildren,
  defaultParentData,
  refetch,
}) => {
  const [parentData, setParentData] = useState(null);
  const [addChildren, { isLoading }] = useAddChildrenMutation();
  const [showParent, setShowParent] = useState(false);
  const [search, setSearch] = useState("");
  const {
    data,
    isLoading: getAllParentLoding,
    refetch: refetchParent,
  } = useGetAllParentsQuery("search=" + search);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      photoURL: null,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append("photo", imageBlob ? imageBlob : data.photo);
    const resPhoto = await addChildren({ body: formData, id: parentData._id });
    const imageURL = resPhoto.data?.imageUrl;
    formData.delete("photoURL");
    formData.append("photoURL", imageURL);
    formData.append("parentId", parentData._id);
    if ("data" in resPhoto) {
      const resData = await axios.post(
        `${import.meta.env.VITE_BASE_URL_REGISTER_CHILD}/register-child`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if ("data" in resData) {
        refetch();
        toast.success("Children added successfully");
        setShowAddChildren(false);
      }
      if ("error" in resData) {
        return toast.error(resPhoto.error.data.message);
      }
    }
    if ("error" in resPhoto) {
      return toast.error(resPhoto.error.data.message);
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    console.log(dataURL);
    setImageSrc(dataURL);

    canvas.toBlob((blob) => {
      setImageBlob(blob); // حفظ الصورة كـ Blob
    }, "image/png");
  };

  const getCameraStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };

  useEffect(() => {
    if (defaultParentData) {
      setParentData(defaultParentData);
    }
  }, [defaultParentData]);

  useEffect(() => {
    refetchParent();
  }, [refetchParent]);

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        showAddChildren ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="absolute top-1/2 left-1/2  p-4 w-full max-w-2xl max-h-full z-[45] -translate-x-1/2 -translate-y-1/2 ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Children
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={() => setShowAddChildren(!showAddChildren)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 md:p-5  flex flex-wrap gap-4">
            <input
              className="w-full md:w-[48%] !h-[40px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required
              {...register("name", { required: true })}
            />
            <div className="w-full md:w-[48%]">
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setValue("photo", e.target.files[0]);
                }}
              />
            </div>
            <div
              className={`border overflow-hidden w-full transition-all duration-300 rounded-[8px] ${
                showParent ? "h-[240px]" : "h-[40px]"
              }`}
            >
              <div
                className={`h-[40px] ${
                  defaultParentData ? "bg-[#999999]" : ""
                } flex py-2 px-3 ${
                  showParent ? "border-b " : ""
                } justify-between cursor-pointer`}
                onClick={() => !defaultParentData && setShowParent(!showParent)}
              >
                <p className="">
                  {parentData ? parentData.name : "Select Parent"}
                </p>
                <p>
                  <ChevronUpIcon />
                </p>
              </div>
              {showParent && (
                <div className="py-3">
                  <div className="px-3">
                    <input
                      type="text"
                      placeholder="Search Parent"
                      name=""
                      id=""
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full border border-[#e5e7eb] rounded-lg p-2 focus:outline-none focus:ring-0"
                    />
                  </div>
                  {getAllParentLoding
                    ? "Loading..."
                    : data && (
                        <>
                          <ul className="mt-2">
                            {data.parents.map((parent) => (
                              <li
                                key={parent.id}
                                className="py-2 hover:bg-[#eee] cursor-pointer px-3"
                                onClick={() => {
                                  setParentData(parent);
                                  setShowParent(false);
                                }}
                              >
                                {parent.name}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                </div>
              )}
            </div>
            {watch("photo") && (
              <div className="w-full border h-[300px] overflow-hidden rounded-lg relative">
                <img
                  src={URL.createObjectURL(watch("photo"))}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <div>
                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={() => {
                    setShowCamera(!showCamera);
                    if (!showCamera) getCameraStream();
                  }}
                >
                  {showCamera ? "Close Camera" : "Take Photo by Camera"}
                </p>
              </div>
              {showCamera && (
                <div>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{ width: "100%", maxWidth: "100%" }}
                  />
                  <button onClick={takePhoto}>📸 التقط صورة</button>

                  <canvas ref={canvasRef} style={{ display: "none" }} />

                  {imageBlob && (
                    <div>
                      <h4>الصورة الملتقطة:</h4>
                      <img
                        src={URL.createObjectURL(imageBlob)}
                        alt="Captured"
                        style={{ width: "100%", maxWidth: "100%" }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={handleSubmit(onSubmit)}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? "Adding..." : "Add Children"}
            </button>
            <button
              onClick={() => setShowAddChildren(false)}
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {showAddChildren && (
        <div
          onClick={() => setShowAddChildren(false)}
          className="fixed top-0 left-0 w-screen h-screen bg-black z-40 bg-opacity-60"
        ></div>
      )}
    </div>
  );
};

AddChildrenModel.propTypes = {
  showAddChildren: PropTypes.bool.isRequired,
  setShowAddChildren: PropTypes.func.isRequired,
  defaultParentData: PropTypes.object,
  refetch: PropTypes.func.isRequired,
};

export default AddChildrenModel;

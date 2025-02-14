import React from "react";

const DeleteModle = ({
  showModal,
  setShowModal,
  isLoading,
  handleDelete,
  title,
  desc,
}) => {
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        showModal ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="absolute top-1/2 left-1/2  p-4 w-full max-w-2xl max-h-full z-[45] -translate-x-1/2 -translate-y-1/2 ">
        <div className="bg-white p-4 md:p-6 rounded-[16px]">
          <p className="pb-6 text-2xl">{title}</p>
          <p className="">{desc}</p>
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => handleDelete()}
              className="py-2 px-6 bg-red-600 text-white rounded "
            >
              {isLoading ? "Deleteing..." : "Delete"}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="py-2 px-6 bg-blue-600 text-white rounded "
            >
              {" "}
              close
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          onClick={() => setShowModal(!showModal)}
          className="fixed top-0 left-0 w-screen h-screen bg-black z-40 bg-opacity-60"
        ></div>
      )}
    </div>
  );
};

export default DeleteModle;

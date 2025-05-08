import React, { useEffect } from "react";

const SuccessAddingParentModel = ({
  successAddingParent = false,
  parentData,
}) => {
  const [showModal, setShowModal] = React.useState(successAddingParent);

  useEffect(() => {
    setShowModal(successAddingParent);
  }, [successAddingParent]);

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        showModal ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-[100]  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="absolute top-1/2 left-1/2  p-4 w-full max-w-2xl max-h-full z-[45] -translate-x-1/2 -translate-y-1/2 ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 flex flex-col gap-4 p-10 text-center">
          <p>
            {" "}
            <span className="text-[#0b2d5c] text-[24px]">
              Congratulation!
            </span>{" "}
            {parentData?.name}
          </p>
          <p className="text-[20px]">Password : {parentData?.password}</p>
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

export default SuccessAddingParentModel;

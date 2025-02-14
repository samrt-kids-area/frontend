import React, { useState } from "react";
import Row from "./Row";
import DeleteModle from "../../components/DeleteModle";
import { useDeleteChildrenMutation } from "../../redux/services/apiSlice";
import toast from "react-hot-toast";
import EditChildren from "./EditChildren";

const ChildrenTable = ({ childrenData, refetch }) => {
  const [deletedParent, setDeleteParent] = useState(false);
  const [editChildrenData, setEditChildrenData] = useState(false);
  const [deletedChild, { isLoading }] = useDeleteChildrenMutation();

  const handleDeleteParent = async () => {
    const res = await deletedChild(deletedParent._id);
    if ("data" in res) {
      toast.success("Parent deleted successfully");
      refetch();
      setDeleteParent(false);
    } else toast.error("Failed to delete parent");
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Photo
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Parent
            </th>

            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {childrenData.map((parent) => (
            <Row
              key={parent.id}
              chid={parent}
              setDeleteParent={setDeleteParent}
              setEditChildrenData={setEditChildrenData}
            />
          ))}
        </tbody>
      </table>
      {deletedParent && (
        <DeleteModle
          title="Delete Children"
          showModal={deletedParent}
          setShowModal={setDeleteParent}
          handleDelete={handleDeleteParent}
          desc="Are you sure you want to delete this children?"
          isLoading={isLoading}
        />
      )}
      {editChildrenData && (
        <EditChildren
          childrenData={editChildrenData}
          defaultParentData={editChildrenData.parent}
          refetch={refetch}
          setChildrenData={setEditChildrenData}
        />
      )}
    </div>
  );
};

export default ChildrenTable;

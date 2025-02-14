import { useState } from "react";
import Row from "./Row";
import DeleteModle from "../../components/DeleteModle";
import { useDeleteParentMutation } from "../../redux/services/apiSlice";
import toast from "react-hot-toast";
import EditParent from "./EditParent";
import AddChildrenModel from "../../components/addChildrenModel";

const ParentTable = ({ parents, refetch }) => {
  const [deletedParent, setDeleteParent] = useState(false);
  const [editParentData, setEditParentData] = useState(false);
  const [showAddChildren, setShowAddChildren] = useState(false);
  const [addChilToParent, setAddChilToParent] = useState(false);

  const [deleteParent, { isLoading }] = useDeleteParentMutation();

  const handleDeleteParent = async () => {
    const res = await deleteParent(deletedParent._id);
    if ("data" in res) {
      toast.success("Parent deleted successfully");
      refetch();
      setDeleteParent(false);
    } else toast.error("Failed to delete parent");
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {parents.map((parent) => (
              <Row
                key={parent.id}
                parent={parent}
                setDeleteParent={setDeleteParent}
                setEditParentData={setEditParentData}
                setAddChilToParent={setAddChilToParent}
                setShowAddChildren={setShowAddChildren}
              />
            ))}
          </tbody>
        </table>
      </div>
      {deletedParent && (
        <DeleteModle
          showModal={deletedParent}
          setShowModal={setDeleteParent}
          title="Delete Parent"
          desc="Are you sure you want to delete this parent?"
          handleDelete={() => handleDeleteParent()}
          isLoading={isLoading}
        />
      )}
      {editParentData && (
        <EditParent
          editParentData={editParentData}
          refetch={refetch}
          setEditParentData={setEditParentData}
        />
      )}
      {showAddChildren && (
        <AddChildrenModel
          refetch={refetch}
          showAddChildren={showAddChildren}
          setShowAddChildren={setShowAddChildren}
          defaultParentData={addChilToParent}
        />
      )}
    </>
  );
};

export default ParentTable;

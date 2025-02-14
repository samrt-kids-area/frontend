import { Pencil, Trash, User } from "lucide-react";
import PropTypes from "prop-types";

const Row = ({
  parent,
  setDeleteParent,
  setEditParentData,
  setAddChilToParent,
  setShowAddChildren,
}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {parent.name}
      </th>
      <td className="px-6 py-4">{parent.email}</td>
      <td className="px-6 py-4">{parent.phone}</td>
      <td>
        <ul className="flex gap-4">
          <li
            onClick={() => setDeleteParent(parent)}
            className="cursor-pointer"
          >
            <Trash />
          </li>
          <li
            className="cursor-pointer"
            onClick={() => setEditParentData(parent)}
          >
            <Pencil />
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              setShowAddChildren(true);
              setAddChilToParent(parent);
            }}
          >
            <User />
          </li>
        </ul>
      </td>
    </tr>
  );
};

Row.propTypes = {
  parent: PropTypes.object.isRequired,
  setDeleteParent: PropTypes.func.isRequired,
  setEditParentData: PropTypes.func.isRequired,
  setAddChilToParent: PropTypes.func.isRequired,
};

export default Row;

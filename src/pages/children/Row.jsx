import { Pencil, Trash } from "lucide-react";

const Row = ({ chid, setDeleteParent, setEditChildrenData }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="w-[60px] h-[60px] relative ">
          <img
            src={chid.photo}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {chid.name}
      </th>

      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {chid.parent.name}
      </th>
      <td className="px-6 py-4 text-right">
        <ul className="flex gap-4">
          <li onClick={() => setDeleteParent(chid)} className="cursor-pointer">
            <Trash />
          </li>
          <li
            className="cursor-pointer"
            onClick={() => setEditChildrenData(chid)}
          >
            <Pencil />
          </li>
        </ul>
      </td>
    </tr>
  );
};

export default Row;

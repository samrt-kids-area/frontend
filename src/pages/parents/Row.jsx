import PropTypes from "prop-types";

const Row = ({ parent }) => {
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
      <td className="px-6 py-4 text-right">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a>
      </td>
    </tr>
  );
};

Row.propTypes = {
  parent: PropTypes.object.isRequired,
};

export default Row;

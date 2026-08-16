const JobCard = ({ application, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Job Information */}
        <div>
          <h2 className="text-xl font-semibold">
            {application.company}
          </h2>

          <p className="text-gray-700">
            {application.role}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            {application.location}
          </p>

          <p className="text-sm text-gray-500">
            Applied: {application.appliedDate}
          </p>
        </div>

        {/* Status + Actions */}
        <div className="flex items-center gap-3">

          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
            {application.status}
          </span>

          <button
            onClick={() => onEdit(application)}
            className="border px-3 py-1 rounded-md hover:bg-gray-100"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(application.id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default JobCard;
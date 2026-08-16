import { useEffect, useState } from "react";

const JobForm = ({ editingJob, onSave, onCancel }) => {
  const [job, setJob] = useState({
    company: "",
    role: "",
    location: "",
    status: "Applied",
    applied_date: "",
  });

  useEffect(() => {
    if (editingJob) {
      setJob(editingJob);
    }
  }, [editingJob]);

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(job);

    setJob({
      company: "",
      role: "",
      location: "",
      status: "Applied",
      applied_date: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingJob ? "Edit Application" : "Add Job Application"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">
            Company Name
          </label>

          <input
            type="text"
            name="company"
            value={job.company}
            onChange={handleChange}
            placeholder="e.g. TCS"
            className="w-full border rounded-md px-3 py-2 outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Job Role
          </label>

          <input
            type="text"
            name="role"
            value={job.role}
            onChange={handleChange}
            placeholder="e.g. React Developer"
            className="w-full border rounded-md px-3 py-2 outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            placeholder="e.g. Noida"
            className="w-full border rounded-md px-3 py-2 outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Application Status
          </label>

          <select
            name="status"
            value={job.status}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 outline-none"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Applied Date
          </label>

          <input
            type="date"
            name="applied_date"
            value={job.applied_date}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 outline-none"
            required
          />
        </div>

        <div className="flex gap-3">

          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800"
          >
            {editingJob ? "Update" : "Save Application"}
          </button>

          {editingJob && (
            <button
              type="button"
              onClick={onCancel}
              className="border px-5 py-2 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
          )}

        </div>

      </form>
    </div>
  );
};

export default JobForm;
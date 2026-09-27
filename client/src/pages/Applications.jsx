import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../context/AuthContext";
import JobCard from "../components/JobCard";
import JobForm from "../components/JobForm";
import SearchFilter from "../components/SearchFilter";

const Applications = () => {
  const { token } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [applications, setApplications] = useState([]);

  const [editingJob, setEditingJob] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET applications from backend
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:3000/api/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Applications from database:", response.data);

      setApplications(response.data);
    } catch (error) {
      console.error("Fetch applications error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch applications"
      );
    } finally {
      setLoading(false);
    }
  };

  // Page load hote hi database se applications lao
  useEffect(() => {
    if (token) {
      fetchApplications();
    }
  }, [token]);

  // Edit
  const handleEdit = (application) => {
    setEditingJob(application);
  };

  // Update
  const handleSave = async (job) => {
    try {
      await axios.put(
        `http://localhost:3000/api/applications/${job.id}`,
        {
          company: job.company,
          role: job.role,
          location: job.location,
          status: job.status,
          applied_date: job.applied_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Application updated successfully!");

      setEditingJob(null);

      // Database se updated data dobara lao
      fetchApplications();
    } catch (error) {
      console.error("Update error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update application"
      );
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/api/applications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Application deleted successfully!");

      // Database se fresh data lao
      fetchApplications();
    } catch (error) {
      console.error("Delete error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete application"
      );
    }
  };

  // Search + filter
  const filteredApplications = applications.filter(
    (application) => {
      const matchesSearch =
        application.company
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        application.role
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          My Applications
        </h1>

        <p className="text-gray-600 mb-6">
          Manage all your job applications
        </p>

        {/* Search + Filter */}
        <SearchFilter
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Edit Form */}
        {editingJob && (
          <JobForm
            editingJob={editingJob}
            onSave={handleSave}
            onCancel={() => setEditingJob(null)}
          />
        )}

        {/* Loading */}
        {loading && (
          <p className="text-center mt-6">
            Loading applications...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-center mt-6">
            {error}
          </p>
        )}

        {/* Applications */}
        {!loading && !error && (
          <div className="space-y-4 mt-6">

            {filteredApplications.map((application) => (
              <JobCard
                key={application.id}
                application={application}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}

          </div>
        )}

        {/* No Applications */}
        {!loading &&
          !error &&
          filteredApplications.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow text-center mt-6">
              <p className="text-gray-500">
                No applications found.
              </p>
            </div>
          )}

      </div>
    </div>
  );
};

export default Applications;
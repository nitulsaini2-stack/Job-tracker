import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get applications from database
  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/api/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Dashboard applications:", response.data);

      setApplications(response.data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchApplications();
    }
  }, [token]);

  // Statistics
  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (application) => application.status === "Applied"
  ).length;

  const interviewCount = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const selectedCount = applications.filter(
    (application) => application.status === "Selected"
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
    },
    {
      title: "Applied",
      value: appliedCount,
    },
    {
      title: "Interview",
      value: interviewCount,
    },
    {
      title: "Selected",
      value: selectedCount,
    },
    {
      title: "Rejected",
      value: rejectedCount,
    },
  ];

  // Recent applications
  const recentApplications = applications.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          Dashboard
        </h1>

        <p className="text-gray-600 mb-6">
          Track and manage your job applications
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white p-5 rounded-lg shadow"
            >
              <p className="text-gray-500 text-sm">
                {stat.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {loading ? "..." : stat.value}
              </h2>
            </div>
          ))}

        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow p-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-xl font-semibold">
              Recent Applications
            </h2>

            <Link
              to="/add-job"
              className="bg-black text-white px-4 py-2 rounded-md"
            >
              Add Job
            </Link>

          </div>

          {loading && (
            <p className="text-gray-500">
              Loading applications...
            </p>
          )}

          {!loading && recentApplications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No applications yet.
              </p>

              <Link
                to="/add-job"
                className="bg-black text-white px-4 py-2 rounded-md"
              >
                Add Your First Job
              </Link>
            </div>
          )}

          {!loading && recentApplications.length > 0 && (
            <div className="space-y-4">

              {recentApplications.map((job) => (
                <div
                  key={job.id}
                  className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >

                  <div>
                    <h3 className="font-semibold">
                      {job.company}
                    </h3>

                    <p className="text-gray-600">
                      {job.role}
                    </p>

                    <p className="text-sm text-gray-500">
                      {job.location}
                    </p>

                    <p className="text-sm text-gray-500">
                      Applied: {job.applied_date}
                    </p>
                  </div>

                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm w-fit">
                    {job.status}
                  </span>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
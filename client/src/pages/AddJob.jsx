import JobForm from "../components/JobForm";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSave = async (job) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/applications",
        job,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      window.alert("Job application added successfully!");

      navigate("/applications");

    } catch (error) {
      console.error("Add job error:", error);

      if (error.response) {
        window.alert(
          error.response.data.message || "Failed to add job"
        );
      } else {
        window.alert("Server se connection nahi ho raha");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <JobForm onSave={handleSave} />
      </div>
    </div>
  );
};

export default AddJob;
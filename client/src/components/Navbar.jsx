
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-red-500 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          JobTracker
        </Link>

        <div className="flex gap-6 items-center">

          {token ? (
            <>
              <Link to="/">
                Dashboard
              </Link>

              <Link to="/add-job">
                Add Job
              </Link>

              <Link to="/applications">
                Applications
              </Link>

              {user && (
                <span className="font-medium">
                  Hi, {user.name}
                </span>
              )}

              <button
                onClick={handleLogout}
                className="bg-black text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
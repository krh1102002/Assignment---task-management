import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../redux/reducers/userReducer";
import { clearTasks } from "../redux/reducers/taskReducer";

const Navbar = ({ setTab, currentTab }) => {
  const user = useSelector((state) => state.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(clearUser());
    dispatch(clearTasks());
    toast.success("Logged out successfully");
    navigate("/");
  };

  const firstName = user?.name?.split(" ")[0];

  return (
    <div className="flex justify-between items-center h-30 px-4 p-3 bg-blue-500">
      <div className="flex items-center">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>
      <div className="flex items-center">
        {user ? (
          <div className="flex items-center">
            <span className="mr-4 text-white font-semibold">{firstName}</span>
            <button
              title="Logout"
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              className={`px-4 py-1 rounded-md mr-2 ${
                currentTab === "signup"
                  ? " text-white"
                  : "bg-white text-blue-500"
              }`}
              onClick={() => setTab("signin")}
            >
              Login
            </button>
            <button
              className={`px-4 py-1 rounded-md ${
                currentTab === "signin"
                  ? " text-white"
                  : "bg-white text-blue-500"
              }`}
              onClick={() => setTab("signup")}
            >
              Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

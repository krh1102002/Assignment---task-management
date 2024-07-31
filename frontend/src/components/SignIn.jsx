import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signIn } from "../redux/actions/user";
import { clearError } from "../redux/reducers/userReducer";

const SignIn = ({ setTab }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigning, setIsSigning] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSigning(true);
    dispatch(signIn({ email, password }));
  };
  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/tasks");
      toast.success("Logged In successfully");
      setIsSigning(false);
    }
  }, [user, navigate]);
  useEffect(() => {
    if (error && error.length > 0) {
      toast.error(error);
      setIsSigning(false);
      dispatch(clearError());
    }
  }, [error]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-4 md:mx-0">
      <div className="w-full max-w-md mx-5 md:mx-0">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-blue-500">Login</h2>
        </div>
        <div className="bg-white rounded-lg border border-blue-500 px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm font-bold">
              Don't have an account?{" "}
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => setTab("signup")}
              >
                Signup
              </button>
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="flex items-center justify-center bg-blue-500 text-white rounded-lg px-6 py-2 text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-auto">
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

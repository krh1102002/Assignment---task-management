import { useState } from "react";
import { useSelector } from "react-redux";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Loading from "../components/Loading";
import Layout from "../Layout";
import Navbar from "../components/Navbar";

const AuthPage = () => {
  const [tab, setTab] = useState("signin");
  const { loading } = useSelector((state) => state.user);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`flex-grow flex flex-col h-full ${
        tab === "signin" ? "bg-white" : "bg-gray-100"
      }`}
    >
      <Navbar setTab={setTab} currentTab={tab} />
      <div className="flex-grow flex flex-col h-full justify-center">
        {tab === "signin" && <SignIn setTab={setTab} />}
        {tab === "signup" && <SignUp setTab={setTab} />}
      </div>
    </div>
  );
};

export default Layout(AuthPage);

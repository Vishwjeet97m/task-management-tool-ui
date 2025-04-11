import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import logo2 from "../assets/images/logo2.svg";
import loginImage from "../assets/images/loginImage.svg";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newError = { username: "", email: "", password: "" };

    if (!form.username) {
      newError.username = "Username is required.";
      isValid = false;
    }
    if (!form.email) {
      newError.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newError.email = "Email is invalid.";
      isValid = false;
    }
    if (!form.password) {
      newError.password = "Password is required.";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        alert(errorData.message || "Failed to sign up.");
        return;
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      localStorage.setItem("token", data.token);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      {/* left section */}
      <div className="flex flex-1 flex-col mt-10 md:mt-0 md:mr-5 overflow-hidden items-center md:items-start">
        <div className="flex flex-row items-center md:ms-14">
          <img className="font-medium" src={logo} alt="" />
          <p className="text-[#0B3051] text-2xl font-medium">AProjectO</p>
        </div>
        <div className="overflow-hidden mt-6 md:mt-0">
          <img
            className="w-full md:w-[763px] h-auto md:h-[865px] object-contain"
            src={loginImage}
            alt=""
          />
        </div>
      </div>

      {/* right section */}
      <div className="flex flex-1 flex-col items-center mt-10 md:mt-0 overflow-hidden px-4 md:px-0">
        <div className="flex flex-row items-center gap-2">
          <img src={logo2} alt="" />
          <p className="font-medium text-2xl text-center md:text-left">
            Asite Product System
          </p>
        </div>
        <div className="flex flex-col mt-10 md:mt-32 w-full max-w-[350px] overflow-hidden">
          <div className="mt-10">
            <p className="text-3xl font-semibold text-center md:text-left">
              Create Account
            </p>
            <p className="text-black font-normal text-center md:text-left">
              Please fill in your details to sign up.
            </p>
            <form className="mt-6" onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  className={`w-full p-2 border-b-2 ${
                    error.username ? "border-red-500" : "border-black"
                  } outline-none placeholder-black`}
                />
                {error.username && (
                  <p className="text-red-500 text-sm">{error.username}</p>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full p-2 border-b-2 ${
                    error.email ? "border-red-500" : "border-black"
                  } outline-none placeholder-black`}
                />
                {error.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full p-2 border-b-2 ${
                    error.password ? "border-red-500" : "border-black"
                  } outline-none placeholder-black`}
                />
                {error.password && (
                  <p className="text-red-500 text-sm">{error.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-black font-medium underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

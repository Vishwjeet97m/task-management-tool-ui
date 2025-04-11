import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import logo2 from "../assets/images/logo2.svg";
import loginImage from "../assets/images/loginImage.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({email:"", password:""});
  const [error, setError] = useState({email:"", password:""});
  const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  
  // Validate inputs
  const validateForm = () => {
    let isValid = true;
    const newError = { email: "", password: "" };

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

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      console.log("dataaaauser--->",data);
      localStorage.setItem("token", data.data.accessToken); // Save token to localStorage
      localStorage.setItem("user", JSON.stringify(data.data.user)); // Save user object to localStorage
      console.log("Login successful:", data);
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error during login:", error);
      setError((prev) => ({ ...prev, general: error.message }));
    }
  };





  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      {/* left section */}
      <div className="flex flex-1/2 flex-col mt-10 mr-5 overflow-hidden">
        <div className="flex flex-row items-center ms-14">
          <img className="font-medium " src={logo} alt="" />
          <p className="text-[#0B3051] text-2xl font-medium">AProjectO</p>
        </div>
        <div className="overflow-hidden">
          <img className="w-[763px] h-[865px] object-contain" src={loginImage} alt="" />
        </div>
      </div>
      {/* right section  */}
      <div className="flex flex-1/2 flex-col items-center mt-10 overflow-hidden">
        <div className="flex flex-row items-center gap-2">
          <img src={logo2} alt="" />
          <p className="font-medium text-2xl">Asite Product System</p>
        </div>
        <div className="flex flex-1/2 flex-col mt-40 mr-10 overflow-hidden">
          <div className="mt-10">
            <p className="text-3xl font-semibold">Welcome</p>
            <p className="text-black font-normal">Please enter your details.</p>
            <form className="mt-6" onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-2 border-b-1 border-black outline-none placeholder-black"
                />
                {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-2 border-b-1 border-black outline-none placeholder-black"
                />
                {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    className="mr-2 bg-black"
                  />
                  <label htmlFor="terms" className="text-gray-600 mr-20">
                    terms and conditions
                  </label>
                </div>
                <p className="text-black underline cursor-pointer">
                  Forgot Password?
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{" "}
              <span
                className="text-black font-medium underline cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up for free
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

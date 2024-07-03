import { useState } from "react";
import logo from "../assets/book-stack.png";
import loginImg from "../assets/books.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/register`, {
        fullName: fullName,
        email: email,
        password: password,
      });

      navigate("/login");
    } catch (error) {
      toast(error.response.data);
    }
  };
  return (
    <>
      <ToastContainer />
      <section
        className="h-full px-16 py-8 bg-[#40c1fa] grid grid-cols-1 md:grid-cols-2  "
        style={{
          background: "rgb(35,208,210)",
          background:
            "linear-gradient(0deg, rgba(35,208,210,1) 21%, rgba(253,187,45,1) 100%)",
        }}
      >
        <div className="bg-white flex flex-col space-y-5 items-center justify-center md:rounded-l-lg pl-6    ">
          <img src={loginImg} className="w-2/3 h-2/3 " alt="" />
        </div>

        <div className="bg-white flex flex-col space-y-5 items-center justify-center md:rounded-r-lg  ">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-16 w-auto"
                src={logo}
                alt="Your Company"
              />
              <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign Up to make your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleRegister} className="space-y-2">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <label
                    htmlFor="fullName"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full name
                  </label>
                  <input
                    className="border-2 p-2 rounded w-full "
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                    placeholder="Input your full name here"
                  />
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <label
                    htmlFor="email"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    className="border-2 p-2 rounded w-full"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Input your email here"
                  />
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <label
                    htmlFor="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full name
                  </label>
                  <input
                    className="border-2 p-2 rounded w-full"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Input your password here"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <p class="mt-10 text-center text-sm text-gray-500">
                Already have an account?
                <Link
                  to="/login"
                  class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

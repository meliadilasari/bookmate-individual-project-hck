import { useState, useEffect } from "react";
import logo from "../assets/book-stack.png";
import loginImg from "../assets/books.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(`http://localhost:3000/login`, {
        email,
        password,
      });
      let { data } = res;
      //   console.log(data.access_token);
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (error) {
      toast(error.response.data);
    }
  };
  async function handleCredentialResponse(response) {
    try {
      // console.log("Encoded JWT ID token: " + response.credential);
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/google-login",
        headers: { google_token: response.credential },
      });

      console.log(data);
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (error) {
      toast(error.response.data);
    }
  }
  useEffect(() => {
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
        theme: "outline",
        size: "large",
      });
      google.accounts.id.prompt();
    };
  }, []);

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
                Login to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleLogin} className="space-y-2">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    className="border-2 p-2 rounded w-full"
                    type="email"
                    id="email"
                    placeholder="Input your email here"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
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
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login
                  </button>
                </div>
              </form>
              <p className="mt-10 text-center text-sm text-gray-500">
                Don't have an account?
                <Link
                  to="/Register"
                  href="#"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Signup Here
                </Link>
              </p>
              <div className="text-center m-1 text-sm text-gray-500 grid gap-3 items-center justify-content">
                <span>Or</span>

                <div id="buttonDiv" className="w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

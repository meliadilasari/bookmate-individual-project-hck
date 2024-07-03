// import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/book-stack.png";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex justify-between items-center py-4 px-6 sticky top-0 z-40 ">
        <div className=" flex items-center gap-3 cursor-pointer">
          <img className="w-12 h-12 " src={logo} alt="logo" />
          <h5>
            <Link to="/">BookMate</Link>
          </h5>
        </div>
        <div className="hidden gap-10 md:flex items-center">
          <Link
            to="/"
            className="cursor-pointer hover:decoration-[#249ed7] hover:underline"
          >
            Home
          </Link>

          <Link
            to="/mybooks"
            className=" hover:decoration-[#249ed7] hover:underline cursor-pointer"
          >
            My Books
          </Link>
        </div>
        <div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="hidden md:flex rounded-full bg-[#249ed7] py-2 px-4 text-white cursor-pointer hover:border-[#249ed7] hover:border hover:bg-white hover:text-[#249ed7] "
          >
            Logout
          </button>
        </div>

        <section className="MOBILE-MENU flex md:hidden">
          <div
            className="HAMBURGER-ICON space-y-2 cursor-pointer"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 bg-gray-600 rounded"></span>
            <span className="block h-0.5 w-8  bg-gray-600 rounded"></span>
            <span className="block h-0.5 w-8  bg-gray-600 rounded"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8 cursor-pointer "
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b hover:border-[#249ed7] my-8 ">
                <Link to="/">Home</Link>
              </li>
              <li className="border-b hover:border-[#249ed7] my-8 ">
                <Link to="/mybooks">My Books</Link>
              </li>
              <li className="border-b  my-8 ">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className=" rounded-full bg-[#249ed7] py-2 px-4 text-white cursor-pointer hover:border-[#249ed7] hover:border hover:bg-white hover:text-[#249ed7] "
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </section>

        <style>{`
         .hideMenuNav {
            display: none;
          }
          .showMenuNav {
            display: block;
            position: absolute;
            width: 100%;
            height: 100vh;
            top: 0;
            left: 0;
            background: white;
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
          }
        `}</style>
      </nav>
    </>
  );
}

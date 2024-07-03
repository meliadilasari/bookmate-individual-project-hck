import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function DetailBookPage() {
  const [books, setBooks] = useState("");
  const [trivia, setTrivia] = useState("");
  const [myBooks, setMyBooks] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/books/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data);
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrivia = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/book-trivia/" + id,
        {}, // Pass an empty object as the second argument for POST request
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(data);
      setTrivia(data.bookTrivia);
    } catch (error) {
      console.log(error);
    }
  };

  const addBook = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/mybooks/" + id,
        { id }, // Pass an empty object as the second argument for POST request
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(data);
      setMyBooks(data);
      navigate("/mybooks");
    } catch (error) {
      console.log(error.response.data.message);
      toast(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center h-screen">
        <div className="relative p-14 my-16 flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
          <div className="w-full md:w-1/3 bg-white grid place-items-center">
            <img
              src={books.imgUrl}
              alt="tailwind logo"
              className="rounded-xl pt-72 md:pt-1"
            />
          </div>
          <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
            <div className="flex justify-between item-center">
              <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                publisher: {books.publisher}
              </div>
            </div>
            <h3 className="font-black text-gray-800 md:text-3xl text-xl">
              {books.title}
            </h3>
            <p className="md:text-lg text-gray-500 text-base">
              {books.authors}
            </p>
            <p className="md:text-lg text-gray-500 text-base">
              {books.description}
            </p>
            <p className="text-xl font-black text-gray-800">
              <div className="h-24 mb-14">
                <button
                  onClick={fetchTrivia}
                  className="rounded bg-[#524994] text-sm text-white flex justify-center items-center my-4 p-2 shadow-xl transform transition duration-500 hover:bg-[#2F2A54]"
                >
                  Book Trivia
                </button>
                <input
                  type="text"
                  className="border-2 p-2 rounded w-full text-sm h-24 justify-center " // Adjust height here (e.g., h-12)
                  disabled
                  value={trivia}
                  id="bookTrivia"
                  placeholder=""
                />
              </div>
            </p>
            <div>
              <button
                onClick={addBook}
                className=" rounded bg-[#524994] text-sm text-white flex justify-center items-center my-4 p-2 shadow-xl transform transition duration-500 hover:bg-[#2F2A54]"
              >
                Add book
              </button>
              <Link
                to="/"
                className="rounded border-2 border-[#524994] text-sm text-[#524994] flex justify-center items-center my-4 p-2 shadow-xl transform transition duration-500 hover:bg-[#2F2A54] hover:text-white"
              >
                Back
              </Link>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
}

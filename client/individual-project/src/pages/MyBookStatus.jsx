import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function MyBookStatus() {
  const [books, setBooks] = useState({});
  const [status, setStatus] = useState(""); // State to manage the selected status
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/books/${id}`, {
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

  const updateBookStatus = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/mybooks/${id}`, // Fixed URL
        { status }, // Include status in the payload
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data, "<<<<");
      toast.success("Book status updated successfully!");

      // Optionally, fetch updated data or navigate to another page
      // Optionally refetch to see the updated data
    } catch (error) {
      console.log(error);
      toast.error("Failed to update book status.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = (e) => {
    setStatus(e.target.value); // Update the status state when the dropdown value changes
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center h-screen ">
        <div className=" items-center  flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
          <div className="w-full ml-3 md:w-3/3 bg-white flex flex-col space-y-2 p-3">
            <div className="flex justify-between item-center"></div>
            <h3 className="font-black text-gray-800 md:text-3xl text-xl">
              Update status
            </h3>
            <p className="md:text-lg text-gray-500 text-base">
              update your book reading status here!
            </p>
            <div>
              <form>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select an option
                  </label>
                  <select
                    id="status"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    value={status} // Bind select value to state
                    onChange={handleStatusChange} // Handle change event
                  >
                    <option value="" disabled>
                      Book status
                    </option>
                    <option value="Want to read">Want to read</option>
                    <option value="Read">Read</option>
                  </select>
                </div>
              </form>
            </div>
            <p className="text-xl font-black text-gray-800"></p>
            <div>
              <button
                onClick={updateBookStatus}
                className="rounded bg-[#524994] text-sm text-white flex justify-center items-center my-4 p-2 shadow-xl transform transition duration-500 hover:bg-[#2F2A54]"
              >
                Update book
              </button>
              <Link
                to="/mybooks"
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

import { Link } from "react-router-dom";
export default function Card({ item }) {
  return (
    <>
      <div className="bg-white flex justify-center items-top h-90">
        <div className=" max-w-xs  container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          {item && (
            <>
              <img
                src={item.imgUrl}
                className="w-full rounded h-90"
                alt="img"
              />
              <div className=" flex flex-col  ">
                <h1 className="text-xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">
                  {item.title}
                </h1>
                <p className="ml-4 mt-1 mb-2 text-gray-700  ">
                  By {item.authors}
                </p>
                <button className="rounded bg-[#524994] text-white px-3 mb-16 flex justify-center items-center mx-16 my-4 p-2 shadow-xl transform transition duration-500 hover:bg-[#2F2A54] ">
                  {" "}
                  <Link to={`/books/${item.id}`}>See Details</Link>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

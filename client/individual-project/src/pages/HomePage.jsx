import { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";

export default function HomePage() {
  const [books, setBooks] = useState(null);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/books`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data);
      setBooks(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <section className="h-screen grid grid-cols-1 gap-4 p-4">
        <div className="flex items-center justify-center bg-white rounded-2xl p-8 mx-16 my-4 shadow-2xl">
          <div>
            <h1 className="text-center pb-4 text-2xl font-bold">Book List</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 ">
              {books &&
                books.map((item) => {
                  return <Card key={item.id} item={item} />;
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

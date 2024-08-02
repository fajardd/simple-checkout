import { useEffect, useState } from "react";
import axios from "axios";

export const getAllProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    if (console.response) {
      console.error("API Response error", error.response);
    } else {
      console.error("Error get products", error.message);
    }
    throw error;
  }
};

function CounterPage() {
  const [products, setProducts] = useState([]);
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("error fetching data", error.message);
      }
    };
    fetchData();

    const storedProducts = JSON.parse(localStorage.getItem("cart")) || [];
    setCounter(storedProducts);
  }, []);

  const handleAddBarang = (product) => {
    setCounter((prevCounter) => {
      const newCounter = [...prevCounter, product];
      localStorage.setItem("cart", JSON.stringify(newCounter));
      return newCounter;
    });
  };

  return (
    <div className="flex justify-between  p-6">
      <div className="max-w-6xl">
        <div className="grid grid-cols-4 gap-6">
          {Array.isArray(products) > 0 &&
            products.map((product) => (
              <div
                key={product.id}
                className=" border border-slate-400 gap-20 bg-red-200 p-6 "
              >
                <div></div>
                <img src={product.image} alt="image" className="h-32 w-full" />
                <p className="font-bold">
                  {product.title.substring(0, 20)} ...
                </p>

                <p className="text-justify">
                  {product.description.substring(0, 100)} ...
                </p>
                <p>Rp {product.price}</p>
                <button
                  className="bg-blue-700 text-white px-4"
                  type="button"
                  onClick={() => handleAddBarang(product)}
                >
                  Add
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className=" bg-white min-w-96 fixed mt-6 mr-6 right-0 top-0 h-auto min-h-80 overflow-y-auto ">
        <h1 className="text-2xl">Checkout Barang</h1>

        <table>
          <thead>
            <tr className="flex justify-between space-x-60 ">
              <th>Item Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(counter) > 0 &&
              counter.map((item, index) => (
                <tr key={index} className="flex justify-between">
                  <td>{item.title.substring(0, 20)} ...</td>
                  <td>{item.price}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CounterPage;

import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

function Counter() {
  const { products, counter, handleAddBarang } = useContext(ProductContext);

  return (
    <div className="flex justify-between  p-6">
      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.isArray(products) > 0 &&
            products.map((product) => (
              <div
                key={product.id}
                className=" border border-slate-400 gap-20 bg-red-200 p-6 "
              >
                <div></div>
                <img
                  src={product.image}
                  alt="apiImage"
                  className="h-32 w-full"
                />
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

      <div className=" bg-white w-24 fixed mt-6  right-0 top-0 h-auto min-h-80 overflow-y-auto border border-slate-400">
        <h1 className="text-2xl">Checkout Barang</h1>

        <table>
          <thead>
            <tr className="flex justify-between space-x-60 ">
              <th>Item Name</th>
              <th>Price</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(counter) > 0 &&
              counter.map((item, index) => (
                <tr key={index} className="flex justify-between ">
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
export default Counter;

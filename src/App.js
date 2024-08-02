import { useEffect, useState } from "react";
import axios from "axios";

export const getAlldata = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API response error", error.response);
    } else {
      console.error("error get data", error.message);
    }
    throw error;
  }
};

function App() {
  const [biodata, setBiodata] = useState({
    nama_lengkap: "",
    tanggal_lahir: "",
    alamat: "",
  });
  const [dataPosts, setDataPosts] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    setBiodata((values) => ({ ...values, [name]: value }));
  };

  const handleTambahData = (e) => {
    e.preventDefault();
    console.log("biodata mahasiswa:", biodata);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAlldata();
        setDataPosts(data);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App" style={{ display: "grid", gap: "10px" }}>
      <form onSubmit={handleTambahData} style={{ display: "grid" }}>
        <label htmlFor="Nama">
          Nama
          <input
            type="text"
            name="nama_lengkap"
            value={biodata.nama_lengkap}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Tanggal Lahir">
          Tanggal Lahir
          <input
            type="text"
            name="tanggal_lahir"
            value={biodata.tanggal_lahir}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Alamat">
          Alamat
          <input
            type="text"
            name="alamat"
            value={biodata.alamat}
            onChange={handleChange}
          />
        </label>
        <button type="submit" style={{ width: "80px" }}>
          Tambah Data
        </button>
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {dataPosts.map((dataPost, index) => (
              <tr key={dataPost.id}>
                <td>{index + 1}</td>
                <td>{dataPost.title}</td>
                <td>{dataPost.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

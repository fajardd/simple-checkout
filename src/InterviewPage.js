import axios from "axios";
import React, { useEffect, useState } from "react";

export const getAllMahasiswa = async () => {
  try {
    const response = await axios.get("http://localhost:5000/mahasiswa");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API response error", error.response);
    } else {
      console.error("Error get data mahasiswa", error.message);
    }
    throw error;
  }
};

export const createMahasiswa = async (dataMahasiswa) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/mahasiswa",
      dataMahasiswa,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API response error", error.response);
    } else {
      console.error("Error create mahasiswa", error.message);
    }
    throw error;
  }
};

function InterviewPage() {
  const [mahasiswas, setMahasiswas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    jurusan: "",
    angkatan: "",
    ipk: "",
  });

  // GET ALL DATA MAHASISWA
  useEffect(() => {
    const getDataMahasiswa = async () => {
      try {
        const data = await getAllMahasiswa();
        setMahasiswas(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getDataMahasiswa();
  }, []);

  // CREATE DATA MAHASISWA
  const handleAddMahasiswa = async (e) => {
    e.preventDefault();
    try {
      const data = await createMahasiswa(formData);
      setMahasiswas([...mahasiswas, data]);
      setFormData({
        nama: "",
        nim: "",
        jurusan: "",
        angkatan: "",
        ipk: "",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // TEST
  const number = [1, 2, 3, 4];
  console.log("Number List", [...number]);

  if (error) {
    return <div>error :{error.message}</div>;
  }

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      {/* GET DATA MAHASISWA */}
      <div>
        <h1>Get Data Mahasiswa</h1>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>NIM</th>
              <th>Jurusan</th>
              <th>Angkatan</th>
              <th>IPK</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(mahasiswas) && mahasiswas.length > 0 ? (
              mahasiswas.map((mahasiswa, index) => (
                <tr key={mahasiswa.id}>
                  <td>{index + 1}</td>
                  <td>{mahasiswa.nama}</td>
                  <td>{mahasiswa.nim}</td>
                  <td>{mahasiswa.jurusan}</td>
                  <td>{mahasiswa.angkatan}</td>
                  <td>{mahasiswa.ipk}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Belum ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* GET DATA MAHASISWA */}

      {/* POST DATA MAHASISWA */}
      <div>
        <h1>Post Data Mahasiswa</h1>
        <form onSubmit={handleAddMahasiswa}>
          <label htmlFor="Nama">
            <p>Nama</p>
            <input
              type="text"
              name="nama"
              onChange={handleInputchange}
              value={formData.nama}
              placeholder="Masukkan Nama"
              required
            />
          </label>
          <label htmlFor="NIM">
            <p>NIM</p>
            <input
              type="text"
              name="nim"
              onChange={handleInputchange}
              value={formData.nim}
              placeholder="Masukkan NIM"
              required
            />
          </label>
          <label htmlFor="Jurusan">
            <p>Jurusan</p>
            <input
              type="text"
              name="jurusan"
              onChange={handleInputchange}
              value={formData.jurusan}
              placeholder="Masukkan Jurusan"
              required
            />
          </label>
          <label htmlFor="Angkatan">
            <p>Angkatan</p>
            <input
              type="text"
              name="angkatan"
              onChange={handleInputchange}
              value={formData.angkatan}
              placeholder="Masukkan Angkatan"
              required
            />
          </label>
          <label htmlFor="IPK">
            <p>IPK</p>
            <input
              type="text"
              name="ipk"
              onChange={handleInputchange}
              value={formData.ipk}
              placeholder="Masukkan IPK"
              required
            />
          </label>
          <br />
          <button type="submit">Add Mahasiswa</button>
        </form>
      </div>
      {/* POST DATA MAHASISWA */}
    </div>
  );
}
export default InterviewPage;

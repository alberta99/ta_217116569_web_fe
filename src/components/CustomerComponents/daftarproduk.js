import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CustomerComponents/ProductList.css"; // Import file CSS untuk styling

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${url}/barang`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const results = products.filter((product) =>
      product.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, products]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="product-list-container">
      <h1>Daftar Produk</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="product-list">
        {searchResults.map((product) => (
          <div
            className="product-item"
            key={product.id_barang}
            onClick={() =>
              navigate(`/customer/detailproduk/${product.id_barang}`)
            }
            role="button"
          >
            <img src={product.gambar1_barang} alt={product.nama_barang} />
            <div>
              <h3>{product.nama_barang}</h3>
              <p>Rp {product.harga_barang}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

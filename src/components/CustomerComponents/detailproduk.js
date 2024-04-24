import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../CustomerComponents/ProductDetail.css";
import "../CustomerComponents/ImageCarousel.css";

function ProductDetail({ match }) {
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const url = process.env.REACT_APP_API_URL;
  const { id_barang } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `${url}/barang/${id_barang}`,
    }).then((response) => {
      setProduct(response.data.data);
      setImages([
        `${response.data.data.gambar1_barang}`,
        `${response.data.data.gambar2_barang}`,
        `${response.data.data.gambar3_barang}`,
      ]);
    });
  }, [id_barang]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="product-detail-container">
      <div className="product-info">
        <div className="image-carousel">
          <button onClick={prevSlide}>{"<"}</button>
          <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
          <button onClick={nextSlide}>{">"}</button>
        </div>
        <h2>{product.nama_barang}</h2>
        <p>
          <strong>Type:</strong> {product.jenis_barang}
        </p>
        <p>
          <strong>Price:</strong> ${product.harga_barang}
        </p>
        <p>
          <strong>Description:</strong> {product.detail_barang}
        </p>
        <p>
          <strong>Sold:</strong> {product.qty_terjual}
        </p>
      </div>
    </div>
  );
}

export default ProductDetail;

// ProductDetailPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../CustomerComponents/ProductDetailPage.css";

const ProductDetailPage = ({ match }) => {
  const [product, setProduct] = useState(null);
  const url = process.env.REACT_APP_API_URL;
  const { id_barang } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `${url}/barang/${id_barang}`,
    }).then((response) => {
      setProduct(response.data.data);
    });
  }, [id_barang]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="product-detail">
      {product && (
        <>
          <Slider {...sliderSettings}>
            <div>
              <img src={product.gambar1_barang} alt="Product Image 1" />
            </div>
            <div>
              <img src={product.gambar2_barang} alt="Product Image 2" />
            </div>
            <div>
              <img src={product.gambar3_barang} alt="Product Image 3" />
            </div>
          </Slider>
          <div> . </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative" }}>
              <p style={{ position: "absolute", left: "5px" }}>
                <b>{product.nama_barang}</b>
              </p>
              <p style={{ position: "absolute", right: "5px" }}>
                Terjual: {product.qty_terjual}
              </p>
            </div>
            <div
              style={{
                position: "relative",
                top: "30px",
                left: "5px",
                right: "5px",
              }}
            >
              <p>Rp{product.harga_barang}</p>
              <p>Jenis: {product.jenis_barang}</p>
              <p>Deskripsi: {product.detail_barang}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;

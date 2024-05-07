import React from "react";
import { useNavigate } from "react-router-dom";

export default function MasterLaporan() {
  const navigate = useNavigate();
  const buttonStyle = {
    margin: 10,
  };
  return (
    <div>
      <h2>Master Laporan</h2>
      <button style={buttonStyle} onClick={() => navigate("/admin/leadmasuk")}>
        Laporan Lead Masuk
      </button>
      <button
        style={buttonStyle}
        onClick={() => navigate("/admin/laporankonversi")}
      >
        Laporan Konversi Lead
      </button>
      <button
        style={buttonStyle}
        onClick={() => navigate("/admin/laporanpenjualan")}
      >
        Laporan Penjualan
      </button>
      <button
        style={buttonStyle}
        onClick={() => navigate("/admin/laporansalesperson")}
      >
        Laporan Salesperson
      </button>
    </div>
  );
}

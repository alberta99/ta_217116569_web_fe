import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import Login from "./Login";
import Admin from "./components/AdminComponents/Sidebar/sidebar";
import RegisterSales from "./components/AdminComponents/MasterSales/RegisterSales";
import DaftarSales from "./components/AdminComponents/MasterSales/DaftarSales";
import InputProduk from "./components/AdminComponents/MasterProduk/InsertUpdateProduk";
import DaftarProduk from "./components/AdminComponents/MasterProduk/DaftarProduk";
import DaftarLead from "./components/AdminComponents/MasterLead/DaftarLead";
import EditLead from "./components/AdminComponents/MasterLead/EditLead";
import EditSales from "./components/AdminComponents/MasterSales/EditSales";
import LaporanLeadMasuk from "./components/AdminComponents/Laporan/Leadmasuk";
import LaporanSalesperson from "./components/AdminComponents/Laporan/Salesperson";
import LaporanKonversi from "./components/AdminComponents/Laporan/KonversiLead";
import LaporanPenjualan from "./components/AdminComponents/Laporan/Penjualan";
import MasterLaporan from "./components/AdminComponents/Laporan/MasterLaporan";
import DaftarOrderCust from "./components/CustomerComponents/daftarorder";
import DaftarProdukCust from "./components/CustomerComponents/daftarproduk";
import DetailProduk from "./components/CustomerComponents/detailproduk";
import DetailOrder from "./components/CustomerComponents/detailorder";
import GantiPassword from "./components/CustomerComponents/gantipassword";

//import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { idID } from "@mui/material/locale";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  idID
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="admin" element={<Admin />}>
          <Route path="registersales" element={<RegisterSales />} />
          <Route path="daftarsales" element={<DaftarSales />} />
          <Route path="daftarproduk" element={<DaftarProduk />} />
          <Route path="inputproduk" element={<InputProduk />} />
          <Route path="updateproduk/:product_id" element={<InputProduk />} />
          <Route path="updatesales/:sales_id" element={<EditSales />} />
          <Route path="editlead/:lead_id" element={<EditLead />} />
          <Route path="leadmasuk" element={<LaporanLeadMasuk />} />
          <Route path="daftarlead" element={<DaftarLead />} />
          <Route path="laporansalesperson" element={<LaporanSalesperson />} />
          <Route path="laporankonversi" element={<LaporanKonversi />} />
          <Route path="laporanpenjualan" element={<LaporanPenjualan />} />
          <Route path="masterlaporan" element={<MasterLaporan />} />
        </Route>
        <Route path="customer">
          <Route path="daftarproduk" element={<DaftarProdukCust />} />
          <Route path="daftarorder" element={<DaftarOrderCust />} />
          <Route path="detailorder/:order_id" element={<DetailOrder />} />
          <Route path="detailproduk/:id_barang" element={<DetailProduk />} />
          <Route path="gantipassword/:id_lead" element={<GantiPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

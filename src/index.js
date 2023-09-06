import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Login from './Login';
import Admin from './components/AdminComponents/Sidebar/sidebar';
import RegisterSales from './components/AdminComponents/MasterSales/RegisterSales';
import DaftarSales from './components/AdminComponents/MasterSales/DaftarSales';
import InputProduk from './components/AdminComponents/MasterProduk/InsertProduk';
import DaftarProduk from './components/AdminComponents/MasterProduk/DaftarProduk';
//import reportWebVitals from './reportWebVitals';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Login from './Login';
import Admin from './components/AdminComponents/Sidebar/sidebar';
import RegisterSales from './components/AdminComponents/MasterSales/RegisterSales';
import DaftarSales from './components/AdminComponents/MasterSales/DaftarSales';
import InputProduk from './components/AdminComponents/MasterProduk/InsertUpdateProduk';
import DaftarProduk from './components/AdminComponents/MasterProduk/DaftarProduk';
import DaftarLead from './components/AdminComponents/MasterLead/DaftarLead';
import EditLead from './components/AdminComponents/MasterLead/EditLead';
import EditSales from './components/AdminComponents/MasterSales/EditSales';

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
          <Route path="updateproduk/:product_id" element={<InputProduk />} />
          <Route path="updatesales/:sales_id" element={<EditSales />} />
          <Route path="editlead/:lead_id" element={<EditLead />} />
          <Route path="daftarlead" element={<DaftarLead />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

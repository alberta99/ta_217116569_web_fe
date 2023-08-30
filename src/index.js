import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Login from './Login';
import Admin from './components/AdminComponents/Sidebar/sidebar';
import RegisterSales from './components/AdminComponents/MasterSales/RegisterSales';
import reportWebVitals from './reportWebVitals';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="admin" element={<Admin />}>
          <Route path="registersales" element={<RegisterSales />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

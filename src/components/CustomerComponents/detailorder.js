import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CustomerComponents/InvoicePage.css";
import axios from "axios";
import moment from "moment";
var idLocale = require("moment/locale/id");
moment.locale("id,", idLocale);

function InvoicePage() {
  const url = process.env.REACT_APP_API_URL;
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceDataTable, setInvoiceDataTable] = useState([]);
  const { order_id } = useParams();

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const detailResponse = await axios.get(`${url}/order/detailorder/${order_id}`);
        const sumResponse = await axios.get(`${url}/order/ordersumbyid/${order_id}`);
        
        setInvoiceDataTable(detailResponse.data.data);
        setInvoiceData(sumResponse.data.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchInvoiceData();
  }, [order_id]);
  
  if (!invoiceData || !invoiceDataTable) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className="invoice-container">
      <h2 className="invoice-title">Invoice</h2>
      <p>Nomor: {invoiceData.id_order}</p>
      <p>
        Tanggal & Waktu:{" "}
        {moment(invoiceData.tanggal_order).locale("id").format("LLLL")}
      </p>
      <p>Sales: {invoiceData.nama_sales}</p>
      <p>Pembayaran: {invoiceData.jenis_pembayaran}</p>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Nama Barang</th>
            <th>Jumlah</th>
            <th>Harga Barang</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceDataTable.map((item) => (
            <tr key={item.id_order}>
              <td>{item.nama_barang}</td>
              <td>{item.qty_barang}</td>
              <td>Rp{item.harga_barang_order}</td>
              <td>Rp{item.qty_barang * item.harga_barang_order}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="invoice-total">Subtotal: Rp{invoiceData.sub_total_order}</p>
      <p className="invoice-total">Diskon: Rp{invoiceData.harga_diskon}</p>
      <p className="invoice-total">Total: Rp{invoiceData.total_order}</p>
    </div>
  );
}

export default InvoicePage;

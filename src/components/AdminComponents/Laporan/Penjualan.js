// Original Thread: https://github.com/TanStack/table/discussions/2453

import React, { useEffect, useState, useMemo } from "react";

import TableContainer from "../Laporan/TableContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SelectColumnFilter,
  DateRangeColumnFilter,
  dateBetweenFilterFn,
} from "../Laporan/filters";
import axios from "axios";

const LeadMasuk = () => {
  const url = process.env.REACT_APP_API_URL;
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    axios
      .get(`${url}/laporan/allorder`)
      .then((response) => {
        setRowData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "ID Order",
        accessor: "id_order",
      },
      {
        Header: "Tanggal Order",
        accessor: "tanggal_order",
        Filter: DateRangeColumnFilter,
        filter: dateBetweenFilterFn,
      },
      {
        Header: "Nama Lead/Customer",
        accessor: "nama_lead",
      },
      {
        Header: "Nama Sales",
        accessor: "nama_sales",
      },
      {
        Header: "Nama Toko",
        accessor: "nama_toko",
      },
      {
        Header: "Jumlah Barang",
        accessor: "qty_total",
      },
      {
        Header: "Subtotal Order",
        accessor: "sub_total_order",
      },
      {
        Header: "Diskon",
        accessor: "harga_diskon",
      },
      {
        Header: "Total",
        accessor: "total_order",
      },
      ,
      {
        Header: "Jenis Pembayaran",
        accessor: "jenis_pembayaran",
      },
    ],
    []
  );
  return (
    <div>
      <h2>Laporan Penjualan</h2>
      <TableContainer columns={columns} data={rowData} />
    </div>
  );
};

export default LeadMasuk;

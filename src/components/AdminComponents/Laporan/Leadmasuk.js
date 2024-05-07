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
      .get(`${url}/laporan/laporanleadmasuk`)
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
        Header: "Nama Lead",
        accessor: "nama_lead",
      },
      {
        Header: "Nama Salesperson",
        accessor: "nama_sales",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Tanggal Bergabung",
        accessor: "tgl_join_lead",
        Filter: DateRangeColumnFilter,
        filter: dateBetweenFilterFn,
      },
    ],
    []
  );
  return (
    <div>
      <h2>Laporan Lead Masuk</h2>
      <TableContainer columns={columns} data={rowData} />
    </div>
  );
};

export default LeadMasuk;

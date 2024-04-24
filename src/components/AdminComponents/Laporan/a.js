import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import SortByAlphaOutlinedIcon from "@mui/icons-material/SortByAlphaOutlined";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { IconButton } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { Box } from "@mui/material";
import "dayjs/locale/id";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import locale from "date-fns/locale/id";
import moment from "moment";

export default function a() {
  const url = process.env.REACT_APP_API_URL;
  const [dataLead, setData] = useState([]);
  const [dataSales, setDatasales] = useState([]);
  const [id_sales, setId_sales] = useState([]);
  var idLocale = require("moment/locale/id");
  moment.locale("id,", idLocale);
  useEffect(() => {
    axios
      .get(`${url}/lead`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(`${url}/salesperson`)
      .then((response) => {
        setDatasales(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleTanggalChange = (tgl) => {
    setTanggal(tgl);
    axios
      .get(
        `${url}/laporan/leadidsalestanggal/${id_sales}/${moment(
          tgl[0].startDate
        ).format("YYYY-MM-DD")}/${moment(tgl[0].endDate).format("YYYY-MM-DD")}`
      )
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (e) => {
    setId_sales(e.target.value);
    axios
      .get(`${url}/lead/s/${e.target.value}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const [tanggal, setTanggal] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <>
      <InputLabel id="demo-simple-select-label">Salesperson</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={handleChange}
      >
        {dataSales?.map((item) => {
          return (
            <MenuItem key={item.id_sales} value={item.id_sales}>
              {item.nama_sales ?? item.nama_sales}
            </MenuItem>
          );
        })}
      </Select>
      <div>
        <DateRange
          locale={locale}
          editableDateInputs={true}
          onChange={(item) => handleTanggalChange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={tanggal}
          maxDate={new Date()}
        />
      </div>
      {/* <TableRow key={row.id_lead}>
                    <TableCell align="center">{row.nama_lead}</TableCell>
                    <TableCell align="center">{row.nama_perusahaan}</TableCell>
                    <TableCell align="center">{row.alamat_lead}</TableCell>
                    <TableCell align="center">{row.nohp_lead}</TableCell>
                    <TableCell align="center">{row.email_lead}</TableCell>
                    <TableCell align="center">
                      {moment(row.tgl_join_lead).locale("id").format("LL")}
                    </TableCell>
                    <TableCell align="center">{row.nama_sales}</TableCell>
                  </TableRow> */}
    </>
  );
}

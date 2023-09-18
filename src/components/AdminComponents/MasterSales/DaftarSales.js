import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function GetDataSales() {
    const url = process.env.REACT_APP_API_URL;
    const [dataSales, setData] = useState([]);

    useEffect(() => {
    axios.get(`${url}/salesperson`)
    .then((response) => {
            setData(response.data.data);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
    }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nama</TableCell>
            <TableCell align="center">Alamat</TableCell>
            <TableCell align="center">Nomor HP</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Tanggal Join</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {dataSales.map((row) => (
                <TableRow key={row.id_sales}>
                    <TableCell align="center">{row.nama_sales}</TableCell>
                    <TableCell align="center">{row.alamat_sales}</TableCell>
                    <TableCell align="center">{row.nohp_sales}</TableCell>
                    <TableCell align="center">{row.email_sales}</TableCell>
                    <TableCell align="center">{row.tgl_join_sales}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

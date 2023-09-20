import React, { useState, useEffect, useCallback } from 'react';
import {useNavigate} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function GetDataLead() {
    const url = process.env.REACT_APP_API_URL;
    const [dataLead, setData] = useState([]);
    const navigate = useNavigate();
    //get all data lead
    useEffect(() => {
    axios.get(`${url}/lead`)
    .then((response) => {
            setData(response.data.data);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
    }, []);
    //edit click
    const onEditClick = useCallback((leadId)=>{
      navigate('/admin/editlead/'+leadId)
    },[])
    //delete click
    const onDeleteClick = useCallback((leadId)=>{
      axios.put(`${url}/lead/del/${leadId}`)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
        console.error('Error deleting data:', error);
        });
        window.location.reload(false);
    })
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
            {dataLead.map((row) => (
                <TableRow key={row.id_lead}>
                    <TableCell align="center">{row.nama_lead}</TableCell>
                    <TableCell align="center">{row.alamat_lead}</TableCell>
                    <TableCell align="center">{row.nohp_lead}</TableCell>
                    <TableCell align="center">{row.email_lead}</TableCell>
                    <TableCell align="center">{row.tgl_join_lead}</TableCell>
                    <TableCell><Button variant="contained" onClick={()=>onEditClick(row.id_lead)}>Edit</Button></TableCell>
                    <TableCell><Button variant="contained" onClick={()=>onDeleteClick(row.id_lead)}>Delete</Button></TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import React, {useState, useEffect, useCallback} from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function FormPropsTextFields() {
    const {sales_id} = useParams();
    const url = process.env.REACT_APP_API_URL;  
    const [namasales, setNamasales] = useState("");
    const [alamatsales, setAlamatsales] = useState("");
    const [nohpsales, setNohpsales] = useState("");
    const [emailsales, setEmailsales] = useState("");

    const handleChangeinput = useCallback((event) => {
        if(event.target.name==="namasales") setNamasales(event.target.value)
        else if(event.target.name==="alamatsales") setAlamatsales(event.target.value)
        else if(event.target.name==="nohpsales") setNohpsales(event.target.value)
        else if(event.target.name==="emailsales") setEmailsales(event.target.value)
    },[]);

    const getDataByID = useCallback(async(sales_id)=>{
        const {data} = await axios.get(`${url}/salesperson/${sales_id}`)
        setNamasales(data.data.nama_sales);
        setEmailsales(data.data.email_sales);
        setNohpsales(data.data.nohp_sales);
        setAlamatsales(data.data.alamat_sales);
      },[])

      useEffect(()=>{
            if(sales_id) getDataByID(sales_id);
        },[sales_id])

  const handleSubmit = useCallback(async() => {
      const {status,data} = await axios({
        method: 'put',
        url: `${url}/salesperson/${sales_id}`,
        data: {
          nama_sales: namasales,
          alamat_sales: alamatsales,
          nohp_sales:nohpsales,
          email_sales:emailsales,
        }
      });
      if(status === 200){
        alert(data.message)
        window.location.reload(false);
      }

  },[namasales,alamatsales,nohpsales,emailsales]);
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch'},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          name="namasales"
          label="Nama Sales"
          value={namasales}
          onChange={
            handleChangeinput
          }
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          name="alamatsales"
          label="Alamat"
          value={alamatsales}
          onChange={
            handleChangeinput
          }
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Nomor HP"
          name="nohpsales"
          value={nohpsales}
          onChange={
            handleChangeinput
          }
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Email"
          name="emailsales"
          value={emailsales}
          onChange={
            handleChangeinput
          }
        />
      </div>
      <Button onClick={
          handleSubmit
        }
      variant="contained">Simpan Perubahan
      </Button>
    </Box>
  );
}
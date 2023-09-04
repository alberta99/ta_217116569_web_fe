import React, {useState, useEffect, useCallback} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function FormPropsTextFields() {
  const url = process.env.API_URL;
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nohp, setNohp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeinput = useCallback((event) => {
    if(event.target.name==="nama") setNama(event.target.value)
    else if(event.target.name==="alamat") setAlamat(event.target.value)
    else if(event.target.name==="nohp") setNohp(event.target.value)
    else if(event.target.name==="email") setEmail(event.target.value)
    else if(event.target.name==="password") setPassword(event.target.value)
  },[]);

  const handleSubmit = useCallback(async() => {
      const {status,data} = await axios({
        method: 'post',
        url: `http://localhost:3000/salesperson`,
        data: {
          nama_sales: nama,
          alamat_sales: alamat,
          nohp_sales:nohp,
          email_sales:email,
          password_sales:password
        }
      });
      if(status === 200){
        alert(data.message)
          setNama("")
          setAlamat("")
          setNohp("")
          setEmail("")
          setPassword("")
      }
  
  },[nama,alamat,nohp,email,password]);
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
          name="nama"
          label="Nama"
          value={nama}
          onChange={
            handleChangeinput
          }
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          name="alamat"
          label="Alamat"
          value={alamat}
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
          name="nohp"
          value={nohp}
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
          name="email"
          value={email}
          onChange={
            handleChangeinput
          }
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Password"
          name="password"
          value={password}
          onChange={
            handleChangeinput
          }
        />
      </div>
      <Button onClick={
          handleSubmit
        }
      variant="contained">Register
      </Button>
    </Box>
  );
}
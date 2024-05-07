import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";

export default function FormPropsTextFields() {
  const url = process.env.REACT_APP_API_URL;
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nohp, setNohp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [namaError, setNamaError] = useState(false);
  const [nohpError, setnohpError] = useState(false);
  const [alamatError, setalamatError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // const handleChangeinput = useCallback((event) => {
  //   if (event.target.name === "nama") setNama(event.target.value);
  //   else if (event.target.name === "alamat") setAlamat(event.target.value);
  //   else if (event.target.name === "nohp") setNohp(event.target.value);
  //   else if (event.target.name === "email") setEmail(event.target.value);
  //   else if (event.target.name === "password") setPassword(event.target.value);
  // }, []);
  const handleNamaChange = (e) => {
    setNama(e.target.value);
    if (e.target.value.length < 3) {
      setNamaError("Nama minimal harus mengandung 3 karakter");
    } else if (e.target.value.length > 20) {
      setNamaError("Panjang nama maksimal 20 karakter");
    } else if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
      setNamaError("Nama hanya dapat mengandung huruf dan spasi");
    } else {
      setNamaError(false);
    }
  };

  const handleNohpChange = (e) => {
    setNohp(e.target.value);
    if (!/^(?:\+62)[2-9]\d{7,11}$/.test(e.target.value)) {
      setnohpError("Format nomor hp tidak valid");
    } else {
      setnohpError(false);
    }
  };

  const handleAlamatChange = (e) => {
    setAlamat(e.target.value);
    if (e.target.value.length < 7) {
      setalamatError("Alamat minimal harus mengandung 7 karakter");
    } else if (e.target.value.length > 20) {
      setalamatError("Panjang alamat maksimal 50 karakter");
    } else {
      setalamatError(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.validity.valid) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      const { status, data } = await axios({
        method: "post",
        url: `${url}/salesperson`,
        data: {
          nama_sales: nama,
          alamat_sales: alamat,
          nohp_sales: nohp,
          email_sales: email,
          password_sales: password,
        },
      });
      if (status === 200) {
        alert("Register berhasil");
        alert(data.message);
        setNama("");
        setAlamat("");
        setNohp("");
        setEmail("");
      }
    } else {
      alert("Harap isi semua data dengan valid...");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <h2>Registrasi Sales</h2>
      <div>
        <TextField
          required
          id="outlined-required"
          name="nama"
          label="Nama"
          value={nama}
          onChange={handleNamaChange}
          error={namaError}
          helperText={namaError}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          name="alamat"
          label="Alamat"
          value={alamat}
          onChange={handleAlamatChange}
          error={alamatError}
          helperText={alamatError}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Nomor HP"
          name="nohp"
          value={nohp}
          onChange={handleNohpChange}
          error={nohpError}
          helperText={nohpError}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          helperText={emailError ? "Harap masukkan email yang valid!" : ""}
          inputProps={{
            type: "email",
          }}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
          helperText={
            passwordError ? "Harap masukkan password yang valid!" : ""
          }
          inputProps={{
            type: "password",
          }}
        />
      </div>
      <Button variant="contained" color="primary" type="submit">
        Register
      </Button>
    </Box>
  );
}

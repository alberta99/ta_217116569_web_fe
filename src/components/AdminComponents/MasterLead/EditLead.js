import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";

export default function FormPropsTextFields() {
  const { lead_id } = useParams();
  const url = process.env.REACT_APP_API_URL;
  const [namalead, setNamalead] = useState("");
  const [namaperusahaan, setNamaperusahaan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nohp, setNohp] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeinput = useCallback((event) => {
    if (event.target.name === "namalead") setNamalead(event.target.value);
    else if (event.target.name === "alamat") setAlamat(event.target.value);
    else if (event.target.name === "nohp") setNohp(event.target.value);
    else if (event.target.name === "email") setEmail(event.target.value);
    else if (event.target.name === "namaperusahaan")
      setNamaperusahaan(event.target.value);
  }, []);

  const getDataByID = useCallback(async (leadId) => {
    const { data } = await axios.get(`${url}/lead/${leadId}`);
    setNamalead(data.data.nama_lead);
    setNamaperusahaan(data.data.nama_perusahaan);
    setEmail(data.data.email_lead);
    setNohp(data.data.nohp_lead);
    setAlamat(data.data.alamat_lead);
  }, []);

  useEffect(() => {
    if (lead_id) getDataByID(lead_id);
  }, [lead_id]);

  const handleSubmit = useCallback(async () => {
    const { status, data } = await axios({
      method: "put",
      url: `${url}/lead/${lead_id}`,
      data: {
        nama_lead: namalead,
        nama_perusahaan: namaperusahaan,
        alamat_lead: alamat,
        nohp_lead: nohp,
        email_lead: email,
      },
    });
    if (status === 200) {
      alert(data.message);
      window.location.reload(false);
    }
  }, [namalead, alamat, nohp, email, namaperusahaan]);
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <h2>Edit Lead</h2>
      <div>
        <TextField
          required
          id="outlined-required"
          name="namalead"
          label="Nama Lead"
          value={namalead}
          onChange={handleChangeinput}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Nama Perusahaan"
          name="namaperusahaan"
          value={namaperusahaan}
          onChange={handleChangeinput}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          name="alamat"
          label="Alamat"
          value={alamat}
          onChange={handleChangeinput}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Nomor HP"
          name="nohp"
          value={nohp}
          onChange={handleChangeinput}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Email"
          name="email"
          value={email}
          onChange={handleChangeinput}
        />
      </div>
      <Button onClick={handleSubmit} variant="contained">
        Simpan Perubahan
      </Button>
    </Box>
  );
}

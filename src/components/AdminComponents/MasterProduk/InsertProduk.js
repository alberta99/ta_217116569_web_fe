import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import { Button, TextField, Paper, Typography } from '@mui/material';
import axios from 'axios';

function InsertProduk() {
  const [namaproduk, setNamaproduk] = useState("");
  const [jenisproduk, setJenisproduk] = useState("");
  const [detailproduk, setDetailproduk] = useState("");
  const [hargaproduk, setHargaproduk] = useState("");
  const [gambar1, setGambar1] = useState(null);
  const [gambar2, setGambar2] = useState(null);
  const [gambar3, setGambar3] = useState(null);

  const handleChangeinput = useCallback((event) => {
    if(event.target.name==="namaproduk") setNamaproduk(event.target.value)
    else if(event.target.name==="jenisproduk") setJenisproduk(event.target.value)
    else if(event.target.name==="detailproduk") setDetailproduk(event.target.value)
    else if(event.target.name==="hargaproduk") setHargaproduk(event.target.value)
  },[]);

  const handleGambar1Change = (event) => {
    const file = event.target.files[0];
    setGambar1(file);
  };

  const handleGambar2Change = (event) => {
    const file = event.target.files[0];
    setGambar2(file);
  };

  const handleGambar3Change = (event) => {
    const file = event.target.files[0];
    setGambar3(file);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    
  };

    const handleSubmit = useCallback(async() => {
      const formdata = new FormData();
      formdata.append('gambar1_barang', gambar1, gambar1.name);
      formdata.append('nama_barang', namaproduk);
      formdata.append('jenis_barang', jenisproduk);
      formdata.append('detail_barang', detailproduk);
      formdata.append('harga_barang', hargaproduk);

      const {status,data} = await axios.post(`http://localhost:3000/barang`, formdata);
      // const {status,data} = await axios({
      //   method: 'post',
      //   url: `http://localhost:3000/barang`,
      //   data: {
      //     nama_barang: namaproduk,
      //     jenis_barang: jenisproduk,
      //     detail_barang:detailproduk,
      //     harga_barang:hargaproduk,
      //     gambar1_barang:gambar1,
      //     gambar2_barang:gambar2,
      //     gambar3_barang:gambar3
      //   }
      // });
      if(status === 200){
        alert(data.message)
          setNamaproduk("")
          setJenisproduk("")
          setHargaproduk("")
          setDetailproduk("")
          setGambar1("")
          setGambar2("")
          setGambar3("")
      }

  },[namaproduk,jenisproduk,detailproduk,hargaproduk,gambar1,gambar2,gambar3]);
  

  return (
    <div>
      <Typography variant="h4">Tambah Produk</Typography>
      <Box>
          <TextField
          label="Gambar 1"
          name="gambar_1"
          type="file"
          onChange={handleGambar1Change}
          accept="image/*"
        />
        {gambar1 && (
          <Paper elevation={3} style={{ width: 100, height: 100, margin: '16px' }}>
            <img src={gambar1} alt="Preview Gambar 1" style={{ width: '100%', height: '100%' }} />
          </Paper>
        )}

        <TextField
          label="Gambar 2"
          type="file"
          name="gambar_2"
          onChange={handleGambar2Change}
          accept="image/*"
        />
        {gambar2 && (
          <Paper elevation={3} style={{ width: 100, height: 100, margin: '16px' }}>
            <img src={gambar2} alt="Preview Gambar 2" style={{ width: '100%', height: '100%' }} />
          </Paper>
        )}

        <TextField
          label="Gambar 3"
          type="file"
          name="gambar_3"
          onChange={handleGambar3Change}
          accept="image/*"
        />
        {gambar3 && (
          <Paper elevation={3} style={{ width: 100, height: 100, margin: '16px' }}>
            <img src={gambar3} alt="Preview Gambar 3" style={{ width: '100%', height: '100%' }} />
          </Paper>
        )}
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
                name="namaproduk"
                label="Nama Produk"
                value={namaproduk}
                onChange={
                   handleChangeinput
                }
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                name="jenisproduk"
                label="Jenis Produk"
                value={jenisproduk}
                onChange={
                  handleChangeinput
                }
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Detail Produk"
                name="detailproduk"
                value={detailproduk}
                onChange={
                  handleChangeinput
                }
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Harga Produk"
                name="hargaproduk"
                value={hargaproduk}
                onChange={
                  handleChangeinput
                }
              />
            </div>
            <Button onClick={
                handleSubmit
            }
            variant="contained">Simpan Produk
            </Button>
          </Box>
      </Box>
      
    </div>
  );
}

export default InsertProduk;

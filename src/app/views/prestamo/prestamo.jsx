import React, { useState, useEffect } from 'react';
import {
  Card,
  Grid,
  TextField,
  InputLabel,
  Stack,
  MenuItem,
  Button,
  Select,
  IconButton,
  Typography,
} from '@mui/material';
import { styled, Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { obtener_inplemeto, crearPrestamo } from '../../api/prestamo.ts';

import 'react-toastify/dist/ReactToastify.css';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const Prestar = () => {
  const token = localStorage.getItem('token');

  let usuario = '';

  try {
    const tokenData = token ? JSON.parse(atob(token.split('.')[1])) : {};
    usuario = tokenData.id || '';
  } catch (error) {
    console.error('Error al parsear el token:', error);
  }

  const [formData, setFormData] = useState({
    usuario: usuario,
    implementos: [''],
    cantidad_implementos: [''],
    estado: 'pendiente'
  });

    

  const [implementoData, setN_iData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const n_i = await obtener_inplemeto();
        setN_iData(n_i);
      } catch (error) {
        console.error('Error al obtener los nombres de los implementos', error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newValues = [...formData[name]];
    newValues[index] = value;
    setFormData((prevData) => ({ ...prevData, [name]: newValues }));
  };

  const handleAddSet = () => {
    setFormData((prevData) => ({
      ...prevData,
      implementos: [...prevData.implementos, ''],
      cantidad_implementos: [...prevData.cantidad_implementos, ''],
    }));
  };

  //   const handleSubmit = async () => {
  //   try {
  //     await crearPrestamo(formData);
  //     console.log('Prestamo creado exitosamente!');
  //     setFormData({
  //       usuario: usuario,
  //       implementos: [''],
  //       cantidad_implementos: [''],
  //       estado: 'pendiente',   
  //     });
  //   } catch (error) {
  //     console.error('Error al crear el prestamo:', error);
  //   }
  // };

  const handleSubmit = () => {
    console.log('prestamo: ', formData);
  }

  return (
    <>
      <Card className="card">
        <center>
          <h2>CREAR PRESTAMO</h2>
        </center>
        <form>
          {formData.implementos.map((_, index) => (
            <Grid container spacing={2} key={index} style={{ marginBottom: '15px' }}>
              <Grid item xs={12} md={1}></Grid>
              <Grid item xs={12} md={5}>
                <Stack spacing={0}>
                  <InputLabel htmlFor={`implemento-${index}`}>Nombre del implemento</InputLabel>
                  <Select
                    id={`implemento-${index}`}
                    name={`implementos`}
                    fullWidth
                    value={formData.implementos[index]}
                    onChange={(e) => handleChange(e, index)}
                  >
                    {implementoData.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
              </Grid>
              <Grid item xs={12} md={5}>
                <Stack spacing={0}>
                  <InputLabel htmlFor={`cantidad-${index}`}>Cantidad de implementos</InputLabel>
                  <TextField
                    fullWidth
                    type="string"
                    name={`cantidad_implementos`}
                    value={formData.cantidad_implementos[index]}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={1}></Grid>
            </Grid>
          ))}
          <br />
          <br />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={6} md={6}>
              <Typography variant="h5">
                Cantidad:
                <IconButton color="primary" aria-label="Añadir" onClick={handleAddSet}>
                  <AddIcon />
                </IconButton>
              </Typography>
            </Grid>
            <Grid item xs={12} md={1}></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={12} md={10}>
              <center>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Prestar
                </Button>
              </center>
            </Grid>
            <Grid item xs={12} md={1}></Grid>
          </Grid>
        </form>
        <br />
        <br />
      </Card>
    </>
  );
};

export default Prestar;

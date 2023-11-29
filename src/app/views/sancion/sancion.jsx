import React, { useState, useEffect } from 'react';
import {
  Card,
  Grid,
  TextField,
  TextareaAutosize,
  InputLabel,
  Stack,
  Button,
  TableBody,
  TableCell,
  Table,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { styled, Box } from '@mui/system';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import {
  buscar_sancionado,
  Sancionar,
  eliminar_sancion,
  buscar_sanciones,
} from '../../api/sancion.ts';

import 'react-toastify/dist/ReactToastify.css';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const SancionarComponent = () => {
  const [formData, setFormData] = useState({
    correo: '',
    description: '',
    dias: 0,
  });

  const [sanciones, setSanciones] = useState([]);
  const [sancionSeleccionada, setSancionSeleccionada] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    buscar_sanciones()
      .then((data) => setSanciones(data))
      .catch((error) => console.error(error));
  }, []);

  const handleEliminarSancion = (id) => {
    eliminar_sancion(id)
      .then(() => {
        buscar_sanciones()
          .then((data) => setSanciones(data))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = await buscar_sancionado({
        correo: formData.correo,
      });

      if (userId) {
        const response = await Sancionar({
          usuario: userId,
          description: formData.description,
          duracion: formData.dias * 24,
          estado: true,
        });

        if (response) {
          console.log('Sanción exitosa');
          setFormData({
            correo: '',
            description: '',
            dias: 0,
          });
        } else {
          console.error('Error en la sanción:', response);
        }
      } else {
        console.error('No se encontró al usuario');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      duracion: prevData.dias * 24,
    }));
  }, [formData.dias]);

  const handleDiasChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      dias: e.target.value,
    }));
  };

  return (
    <>
      <Card className="card">
        <center>
          <h2>CREAR SANCIONES</h2>
        </center>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={0}>
                <TextField
                  label="Correo del sancionado"
                  type="email"
                  fullWidth
                  name="correo"
                  value={formData.correo}
                  margin="normal"
                  onChange={handleChange}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={0}>
                <TextField
                  label="Dias"
                  fullWidth
                  type="number"
                  name="dias"
                  value={formData.dias}
                  onChange={handleDiasChange}
                  margin="normal"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={1}></Grid>

            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={12} md={10}>
              <Stack spacing={0}>
                <InputLabel htmlFor="descripcion">Descripción</InputLabel>
                <TextareaAutosize
                  id="descripcion"
                  name="description"
                  placeholder="Descripción de la sanción"
                  minRows={4}
                  style={{ width: '100%', height: '250px' }}
                  onChange={handleChange}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={1}></Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={12} md={10}>
              <center>
                <Button type="submit" variant="contained" color="primary">
                  Crear Sancion
                </Button>
              </center>
            </Grid>
            <Grid item xs={12} md={1}></Grid>
          </Grid>
        </form>
        <br />
        <br />
      </Card>

      <br />
      <br />

      <Card className="card">
        <center>
          <h2>LISTA DE SANCIONES</h2>
        </center>
              <Grid container spacing={2}>
                   <Grid item xs={12} md={1}></Grid>
                   <Grid item xs={20} md={11}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Número de Documento</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción de la Sanción</TableCell>
                            <TableCell>Duración</TableCell>
                            <TableCell>Eliminar</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {sanciones.map((sancion) => (
                            <TableRow key={sancion._id}>
                            <TableCell>
                                {sancion.usuario && sancion.usuario.n_doc}
                            </TableCell>
                            <TableCell>
                                {sancion.usuario &&
                                `${sancion.usuario.nombres} ${sancion.usuario.apellidos}`}
                            </TableCell>
                            <TableCell>{sancion.description}</TableCell>
                            <TableCell>{sancion.duracion}</TableCell>
                            <TableCell>
                                <IconButton
                                onClick={() => handleEliminarSancion(sancion._id)}
                                >
                                <DeleteOutline />
                                </IconButton>
                            </TableCell>
                            {/* <TableCell>
                                <IconButton onClick={() => handleEditarSancion(sancion)}>
                                <EditOutlinedIcon />
                                </IconButton>
                            </TableCell> */}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                  </Grid>
              </Grid>
      </Card>
    </>
  );
};

export default SancionarComponent;

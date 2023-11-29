import React, { useState, useEffect } from 'react';
import {
  Card,
  Grid,
  Button,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  IconButton,
  Typography,
} from '@mui/material';
import { styled, Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutline from '@mui/icons-material/DeleteOutline';

import 'react-toastify/dist/ReactToastify.css';

// Assuming these imports are correctly set up
import { inventario } from '../../api/inventario.ts';
import { eliminarI } from '../../api/eliminar_inpl.ts';
import { marca } from '../../api/marca.ts';
import { categoria } from 'app/api/categiria.ts';
import { Crear_implemento } from '../../api/crear_implemento.ts';
import { estado_implemento } from 'app/api/estado_implemento.ts';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const IMPLEMENTO = () => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    marca: '',
    descripcion: {
      peso: '',
      color: '',
      material: '',
      detalle: '',
      tamano: '',
    },
    categoria: '',
    cantidad: 0,
    img: null,
    estado: [{ estado: '', cantidad: 0, apto: true }],
  });

  
  const handleChange = (event, index) => {
    const { name, value } = event.target;

    if (name === 'cantidad') {
      const valorNumerico = parseFloat(value);
      setFormData((prevData) => ({
        ...prevData,
        cantidad: isNaN(valorNumerico) ? 0 : valorNumerico,
      }));
    } else if (name.startsWith('descripcion')) {
      const campoDescripcion = name.split('.')[1];
      setFormData({
        ...formData,
        descripcion: { ...formData.descripcion, [campoDescripcion]: value || 'N/A' },
      });
    } else if (name.startsWith('estado')) {
      setFormData((prevData) => {
        const newEstado = prevData.estado || [];
        const newCantidad = newEstado.reduce((total, e) => total + (parseInt(e.cantidad, 10) || 0), 0);
        return {
          ...prevData,
          cantidad: newCantidad,
          estado: newEstado.map((e, i) =>
            i === index ? { ...e, estado: value || 'N/A' } : e
          ),
        };
      });
    } else if (name.startsWith('cantidad')) {
      setFormData((prevData) => {
        const newEstado = [...(prevData.estado || [])];
        const updatedEstado = newEstado.map((e, i) =>
          i === index ? { ...e, cantidad: parseInt(value, 10) || 0 } : e
        );

        return {
          ...prevData,
          cantidad: updatedEstado.reduce((total, e) => total + (e.cantidad || 0), 0),
          estado: updatedEstado,
        };
      });
    } else if (name.startsWith('apto')) {
      setFormData((prevData) => {
        const newEstado = prevData.estado || [];
        return {
          ...prevData,
          estado: newEstado.map((e, i) =>
            i === index ? { ...e, apto: !e.apto } : e
          ),
        };
      });
    } else {
      setFormData({ ...formData, [name]: value || 'N/A' });
    }
  };

  const handleAddSet = () => {
    setCantidadSets(cantidadSets + 1);
    setFormData((prevData) => ({
      ...prevData,
      estado: [
        ...prevData.estado,
        {
          estado: '',
          cantidad: 0,
          apto: true,
        },
      ],
    }));
  };

  const [estado_iData, setEstado_iData] = useState([]);
  const [cantidadSets, setCantidadSets] = useState(1);
  const [categoriaData, setCategoriaData] = useState([]);
  const [inventarioData, setInventarioData] = useState([]);
  const [marcaData, setMarcaData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const estado_i = await estado_implemento();
        setEstado_iData(estado_i);

        const categorias = await categoria();
        setCategoriaData(categorias);

        const inventarioResult = await inventario();
        setInventarioData(inventarioResult);

        const marcas = await marca();
        setMarcaData(marcas);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleEliminarImplemento = (id) => {
    eliminarI(id)
      .then(() => {
        setInventarioData((prevData) => prevData.filter((item) => item._id !== id));
      })
      .catch((error) => console.error(error));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(formData.cantidad)) {
      console.error('La cantidad no es un número válido.');
      return;
    }

    try {
      // const result = await Crear_implemento(formData);
      console.log(formData);

      // if (result) {
      //   window.location.reload();
      // }
    } catch (error) {
      console.error('Error al crear el implemento:', error);
    }
  };

  return (
    <>
      <Card className="card">
        <center>
          <h2>CREAR IMPLEMENTOS</h2>
        </center>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={0}>
                <TextField
                  label="codigo"
                  type="string"
                  fullWidth
                  name="codigo"
                  value={formData.codigo}
                  margin="normal"
                  onChange={handleChange}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={0}>
                <TextField
                  label="nombre"
                  fullWidth
                  type="string"
                  name="nombre"
                  value={formData.nombre}
                  margin="normal"
                  onChange={handleChange}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={1}></Grid>

            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={0}>
                <InputLabel htmlFor="marca">Marca</InputLabel>
                <Select
                  id="marca"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                >
                  {marcaData.map((marca) => (
                    <MenuItem key={marca._id} value={marca._id}>
                      {marca.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            <Grid item xs={12} md={5}>
              <Stack spacing={0}>
                <InputLabel htmlFor="categoria">Categoría</InputLabel>
                <Select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  fullWidth
                  style={{ width: '100%' }}
                  onChange={handleChange}
                >
                  {categoriaData.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>
            <Grid item xs={12} md={1}></Grid>

            <Grid item xs={12} md={12}>
              <div>
                <center>
                  <h3>DESCRIPCION</h3>
                </center>
              </div>
            </Grid>

            <Grid item md={1}></Grid>
            <Grid item md={5}>
              <Stack spacing={0}>
                <TextField
                label="Peso"
                fullWidth
                type="string"
                name="descripcion.peso"
                value={formData.descripcion.peso}
                onChange={handleChange}
                margin="normal"
              />

              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={0}>
                <TextField
                  label="Color"
                  type="string"
                  fullWidth
                  name="descripcion.color"
                  value={formData.descripcion.color}
                  margin="normal"
                  onChange={handleChange}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={1}></Grid>

            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={0}>
                <TextField
                  label="Material"
                  fullWidth
                  type="string"
                  name="descripcion.material"
                  value={formData.descripcion.material}
                  onChange={handleChange}
                  margin="normal"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={0}>
                <TextField
                  label="Detalle"
                  fullWidth
                  type="string"
                  name="descripcion.detalle"
                  value={formData.descripcion.detalle}
                  onChange={handleChange}
                  margin="normal"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={1}></Grid>

            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={12} md={10}>
              <Stack spacing={0}>
                <TextField
                  label="tamaño"
                  fullWidth
                  type="string"
                  name="descripcion.tamano"
                  value={formData.descripcion.tamano}
                  onChange={handleChange}
                  margin="normal"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={1}></Grid>

            {[...Array(cantidadSets)].map((_, index) => (
              <React.Fragment key={index}>
            <Grid item xs={12} md={1}></Grid>

              <Grid item xs={12} md={5}>
                <Stack spacing={0}>
                  <InputLabel htmlFor={`estado-${index}`}>Estado</InputLabel>
                  <Select
                    id={`estado-${index}`}
                    name={`estado-${index}`}
                    value={formData.estado[index]?.estado || ''}
                    onChange={(e) => handleChange(e, index)}
                    fullWidth
                    style={{ width: '100%' }}
                  >
                    {estado_iData.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.estado}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
              </Grid>

              <Grid item xs={12} md={5}>
                <Stack spacing={0}>
                  <InputLabel htmlFor={`cantidad-${index}`}>Cantidad</InputLabel>
                  <OutlinedInput
                    id={`cantidad-${index}`}
                    type="number"
                    name={`cantidad-${index}`}
                    value={formData.estado[index]?.cantidad || 0}
                    onChange={(e) => handleChange(e, index)}
                    fullWidth
                    style={{ width: '100%' }}
                  />
                </Stack>
                </Grid>
            <Grid item xs={12} md={1}></Grid>
                
            </React.Fragment>
            ))}

            <Grid item xs={12} md={5}></Grid>
            <Grid item xs={6} md={6}>
              <Typography variant="h5">
                Cantidad:
                <IconButton color="primary" aria-label="Añadir" onClick={handleAddSet}>
                  <AddIcon />
                </IconButton>
              </Typography>
            </Grid>
            <Grid item xs={12} md={1}></Grid>

            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={12} md={10}>
              <center>
                <Button onClick={handleSubmit}  variant="contained" color="primary">
                  Guardar
                </Button>
              </center>
            </Grid>
            <Grid item xs={12} md={1}></Grid>
            

          </Grid>
        </form>
        <br /><br />
            <Grid item xs={12} md={1}></Grid>

      </Card>

      <br />
      <br />

      <Card className="card">
        <center>
          <h2>LISTA DE IMPLEMENTOS</h2>
        </center>
        <Stack spacing={7}></Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Cantidad Nuevo</TableCell>
              <TableCell>Cantidad Malos</TableCell>
              <TableCell>Cantidad Disponible</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventarioData.map((item) => (
              <TableRow key={item._id}>
                <TableCell></TableCell>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.marca && item.marca.nombre}</TableCell>
                <TableCell>
                  {item.categoria[0] && item.categoria[0].nombre}
                </TableCell>
                <TableCell>{item.estado[0] && item.estado[0].cantidad}</TableCell>
                <TableCell>{item.estado[2] && item.estado[2].cantidad}</TableCell>
                <TableCell>{item.estado[1] && item.estado[1].cantidad}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEliminarImplemento(item._id)}
                  >
                    <DeleteOutline />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default IMPLEMENTO;

import React, { useState, useEffect } from 'react';
import {
  Card,
  Grid,
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
    buscar_prestamos,
    eliminar_prestamo
} from '../../api/prestamo.ts';

import 'react-toastify/dist/ReactToastify.css';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const Lista = () => {
    const [buscar_prestamosData, setbuscar_prestamosData] = useState([]);

    useEffect(() => {
        buscar_prestamos()
            .then((data) => {
                setbuscar_prestamosData(data);
            })
            .catch((error) => console.error(error));
    }, []);
        const handleEliminarPrestamo = (id) => {
        eliminar_prestamo(id)
            .then(() => {
                // Después de eliminar el préstamo, puedes volver a cargar la lista
                buscar_prestamos()
                    .then((data) => setbuscar_prestamosData(data))
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    };

  return (
    <>
      <Card className="card">
        <center>
          <h2>LISTA DE PRESTAMOS</h2>
        </center>
              <Grid container spacing={2}>
                   <Grid item xs={12} md={1}></Grid>
                   <Grid item xs={20} md={11}>
                    <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Implemento</TableCell>
                        <TableCell>Fecha de inicio</TableCell>
                        <TableCell>Hora de inicio</TableCell>
                        <TableCell>Fecha final</TableCell>
                        <TableCell>Hora final</TableCell>
                        <TableCell>Eliminar préstamo</TableCell>
                        <TableCell>Editar préstamo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {buscar_prestamosData.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell> {item.implementos[0] ? item.implementos[0].nombre : 'N/A'}</TableCell>
                            <TableCell>{new Date(item.fecha_inicio).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(item.fecha_inicio).toLocaleTimeString()}</TableCell>
                            <TableCell>{new Date(item.fecha_fin).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(item.fecha_fin).toLocaleTimeString()}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleEliminarPrestamo(item._id)}>
                                    <DeleteOutline />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                {/* <IconButton onClick={() => handleEditarPrestamo(item)}> */}
                                <IconButton>
                                    <EditOutlined />
                                </IconButton>
                            </TableCell>
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

export default Lista;

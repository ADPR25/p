import React, { useState, useEffect } from 'react';

import {
    Grid,
    Card,
    Select,
    Stack,
    InputLabel,
    MenuItem,
    TextField,
    Button,
    TextareaAutosize
} from '@mui/material';
import { Tipo_informe } from 'app/api/tipo_informe.ts';
import { obtener_inplemeto } from 'app/api/obtener_implemento.ts';
import { estado_implemento } from 'app/api/estado_implemento.ts';
// import { informes } from '../../api/informe.ts'; 

const Informes = () => {
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const handleGuardarInforme = async () => {
    //     try {
    //         await informes(formData);
    //         setFormData({
    //             tipo_informe: '',
    //             usuario: usuario,
    //             dependencia: '',
    //             implemento: '',
    //             estado_implemento: '',
    //             estado: '',
    //             usuarios: '',
    //             observaciones: ''
    //         });
    //     } catch (error) {
    //         console.error('Error al guardar el informe', error);
    //     }
    // };

    const handleGuardarInforme = () => {
        console.log(formData);
    };

    const token = localStorage.getItem('token');

    let usuario = '';

    try {
        const tokenData = token ? JSON.parse(atob(token.split('.')[1])) : {};
        usuario = tokenData.id || '';
    } catch (error) {
        console.error('Error al parsear el token:', error);
    }

    const [formData, setFormData] = useState({
        tipo_informe: '',
        usuario: usuario,
        dependencia: '',
        implemento: '',
        estado_implemento: '',
        usuarios: '',
        estado: '',
        observaciones: ''
    });

    const [informeData, setinformeData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const inform = await Tipo_informe();
                setinformeData(inform);
            } catch (error) {
                console.error('Error al obtener los nombres de los implementos', error);
            }
        }
        fetchData();
    }, []);

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

    const [estadoData, setestadoData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const estado = await estado_implemento();
                setestadoData(estado);
            } catch (error) {
                console.error('Error al obtener los nombres de los implementos', error);
            }
        }
        fetchData();
    }, []);


    return (
        <>
            <Card className="card">
            <center>
                <h1>Crear informes</h1>
            </center>

            <form>
                <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                    <Grid item xs={12} md={1}></Grid>
                    <Grid item xs={12} md={10}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="tipo_informe">Tipo de informe</InputLabel>
                            <Select
                                id="tipo_informe"
                                name="tipo_informe"
                                fullWidth
                                onChange={handleFormChange}
                            >
                                {informeData.map((option) => (
                                    <MenuItem key={`tipo_informe-option-${option._id}`} value={option._id}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={1}></Grid>
                    <Grid item xs={12} md={1}></Grid>
                    <Grid item xs={12} md={10}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor="dependencia">Dependencia</InputLabel>
                            <TextField
                                fullWidth
                                type="string"
                                name={`dependencia`}
                                value={formData.dependencia}
                                onChange={handleFormChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={1}></Grid>

                    <Grid item xs={12} md={1}></Grid>
                    <Grid item xs={12} md={5}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor='implemento'>Inplemento</InputLabel>
                            <Select
                                id="implemento"
                                name="implemento"
                                fullWidth
                                onChange={handleFormChange}
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
                            <InputLabel htmlFor='estado_implemento'>Estado del implemento</InputLabel>
                            <Select
                                id="estado_iplemento"
                                name="estado_implemento"
                                fullWidth
                                onChange={handleFormChange}
                            >
                                {estadoData.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.estado}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={1}></Grid>

                    <Grid item xs={12} md={1}></Grid>
                    <Grid item xs={12} md={10}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="estado">Estado</InputLabel>
                            <TextField
                                fullWidth
                                type="string"
                                name={`estado`}
                                value={formData.estado}
                                onChange={handleFormChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={1}></Grid>
                        

                    <Grid item xs={12} md={1}></Grid>
                    <Grid item xs={12} md={10}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="observaciones">observaciones</InputLabel>
                            <TextareaAutosize
                                id="observaciones"
                                name={`observaciones`}
                                minRows={4}
                                value={formData.observaciones}
                                onChange={handleFormChange}
                                placeholder='Descripción de la observacion'
                                style={{ width: '100%', height: '250px' }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={1}></Grid>

                    <Grid item xs={12} md={1}></Grid>
                    <Grid item xs={12} md={10}>
                        <center>
                            <Button variant="contained" color="primary" onClick={handleGuardarInforme}>
                                Guardar informe
                            </Button>
                        </center>
                    </Grid>
                    <Grid item xs={12} md={1}></Grid>

                </Grid>
                </form>
            </Card>
        </>
    );
};

export default Informes;

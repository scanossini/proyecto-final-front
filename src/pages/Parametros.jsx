import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Parametros = () => {
    const [hospitales, setHospitales] = useState([]);
    const [id, setId] = useState("");
    const [donacion, setDonacion] = useState("");
    const [serologia, setSerologia] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/hospital/')
            .then((response) => {
                setHospitales(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    })

    const setearValores = (event) => {
        setId(event.target.value)
        var hospital = hospitales.filter(hospital => hospital._id === event.target.value)
        setDonacion(hospital[0].diasSinDonar)
        setSerologia(hospital[0].diasSerologia)
    }

    const handleClick = () => {
        var data = {
            diasSinDonar: donacion,
            diasSerologia: serologia
        }

        axios.put('http://localhost:5000/hospital/'+id, data)
    }

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Parámetros de donación</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                            <InputLabel>Hospital</InputLabel>
                            <Select
                                id="hospital"
                                name="hospital"
                                value={id}
                                onChange={(event) => setearValores(event)}   
                            >
                                {hospitales ? hospitales.map((hospital) => (
                                    <MenuItem value={hospital._id}>{hospital.nombre}</MenuItem>
                                )) : null}
                            </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="donacion"
                        name="donacion"
                        label="Días requeridos para volver a donar"
                        inputProps={{ min: 1, max: 10 }}
                        type="number"
                        fullWidth
                        value={donacion}
                        onChange={(event) => setDonacion(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="serologia"
                        name="serologia"
                        label="Días requeridos para actualizar la serología"
                        inputProps={{ min: 1, max: 10 }}
                        type="number"
                        fullWidth
                        value={serologia}
                        onChange={(event) => setSerologia(event.target.value)}
                    />
                </Grid>
                <Button
                    disabled={id === "" ? true : false}
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    Actualizar
                </Button>
            </Grid>
        </Container>
    )
}

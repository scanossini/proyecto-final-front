import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

export const Parametros = () => {
    const [hospitales, setHospitales] = useState([]);
    const [id, setId] = useState("");
    const [donacion, setDonacion] = useState("");
    const [serologia, setSerologia] = useState("");
    const [radio, setRadio] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        axios.get('http://localhost:5000/hospital/')
            .then((response) => {
                setHospitales(response.data.docs);
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
        setRadio(hospital[0].radioNotificacion)
    }

    const handleClick = () => {
        var data = {
            diasSinDonar: donacion,
            diasSerologia: serologia,
            radio: radio
        }

        axios.put('http://localhost:5000/hospital/'+id, data, {"headers": {"token": sessionStorage.getItem("token")}})
            .then(res => enqueueSnackbar("Datos actualizados", {variant: "success"}))
            .catch(err => swal(err.response.data, "", "error"))
    }

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Parámetros de donación</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} className="my-4">
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
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="radio"
                        name="radio"
                        label="Radio de notificaciones (en Kilómetros)"
                        inputProps={{ min: 1, max: 10 }}
                        type="number"
                        fullWidth
                        value={radio}
                        onChange={(event) => setRadio(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={12} className="mt-5">
                    <Button
                        disabled={id === "" ? true : false}
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >
                        Actualizar
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

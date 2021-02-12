import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    buttons: {
        marginTop: theme.spacing(3),
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    }
}))

export const HospitalesForm = () => {
    const classes = useStyles();
    const history = useHistory();
    const [nombre, setNombre] = useState("");
    const [latitud, setLatitud] = useState("");
    const [longitud, setLongitud] = useState("");

    const handleCancel = () => {
        history.push("/admin/hospitales")
    }

    const handleCreate = () => {
        var data = {
            nombre: nombre,
            lat: latitud,
            lng: longitud
        }

        axios.post('http://localhost:5000/hospital', data)
                    .then(res => {
                        history.push("/admin/hospitales")
                    })
                    .catch(err => console.log(err))
    }

    return(
        <Container>
            <Typography variant="h6" gutterBottom>
                Añadir hospital
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        inputProps={{ min: 1, max: 10 }}
                        fullWidth
                        onChange={(event) => setNombre(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="latitud"
                        name="latitud"
                        label="Latitud"
                        inputProps={{ min: 1, max: 10 }}
                        type="number"
                        fullWidth
                        onChange={(event) => setLatitud(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="longitud"
                        name="longitud"
                        label="Longitud"
                        inputProps={{ min: 1, max: 10 }}
                        type="number"
                        fullWidth
                        onChange={(event) => setLongitud(event.target.value)}
                    />
                </Grid>
            </Grid>
            <div className={classes.buttons}>
                <Button
                    color="secondary"
                    className={classes.button}
                    onClick={handleCancel}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleCreate}
                >
                    Crear
                </Button>
            </div>
        </Container>
    )
} 
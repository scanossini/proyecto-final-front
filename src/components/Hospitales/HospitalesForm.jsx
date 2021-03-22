import { Button, Container, Grid, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Map from '../Map/Map'

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
    const [admin, setAdmin] = useState("");
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [latLng, setLatLng] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/admin/info", {"headers": {"token": sessionStorage.getItem("token")}})
            .then(res => setAdmin(res.data))
    }, [])

    const handleCancel = () => {
        history.push("/admin/hospitales")
    }

    const handleCreate = () => {
        var data = {
            nombre: nombre,
            lat: latLng.lat,
            lng: latLng.lng,
            direccion: direccion,
            ciudad: ciudad
        }

        axios.post('http://localhost:5000/hospital', data)
                    .then(res => {
                        history.push("/admin/hospitales")
                    })
                    .catch(err => console.log(err))
    }

    const handleAddress = () => {
        if (!ciudad || !direccion) return null
        
        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address: direccion + ", " + ciudad,
                key: "AIzaSyDI4eXkh46mcHYH1Qfuxp4x18sBgQG7pfc"
            }
        }).then(res => {
            var location = res.data.results[0].geometry.location
            setLatLng({lat: location.lat, lng: location.lng})
        })
    }
    
    return(
        admin ?
            !admin.hospital ?
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
                                id="direccion"
                                name="direccion"
                                label="Dirección"
                                inputProps={{ min: 1, max: 10 }}
                                fullWidth
                                onChange={(event) => setDireccion(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="ciudad"
                                name="ciudad"
                                label="Ciudad"
                                inputProps={{ min: 1, max: 10 }}
                                fullWidth
                                onChange={(event) => setCiudad(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={handleAddress}
                            >
                                Buscar en el mapa
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Map 
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDI4eXkh46mcHYH1Qfuxp4x18sBgQG7pfc"
                                containerElement={<div style={{height: "400px"}}/>}
                                mapElement={<div style={{height: "100%"}}/>}
                                loadingElement={<p>Cargando...</p>}
                                onInput={(event) => setLatLng({lat: event.latLng.lat(), lng: event.latLng.lng()})}
                                marker={latLng}
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
                </Container> : <h1>Esto solo puede ser accedido por el administrador general</h1>
        : null
    )
} 
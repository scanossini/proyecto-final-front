import React, { useEffect, useState } from 'react'
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
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

export function Editar(props) {
    const id = props.location.pathname.split('/').slice(4,5).join('/');
    const [solicitud, setSolicitud] = useState("");
    const classes = useStyles();
    const history = useHistory();
    const [hospitalActual, setHospitalActual] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [tipo, setTipo] = useState("");
    const [hospitales, setHospitales] = useState("");
    const [estado, setEstado] = useState("")

    useEffect(() => {
        axios.get('http://localhost:5000/solicitud/' + id)
            .then((response) => {
                setSolicitud(response.data.docs);
                setHospitalActual(solicitud.hospital);
            })
            .catch((error) => {
                console.log(error);
        })
       
        axios.get('http://localhost:5000/hospital/')
        .then((response) => {
            setHospitales(response.data.docs);
        })
        .catch((error) => {
            console.log(error);
        })
    })

    const handleCancel = () => {
        history.push("/admin/solicitudes")
    }

    const handleCreate = (id) => {
        var data = {
            estado: estado,
            cantidad: cantidad,
            hospital: hospitalActual,
            tipoDeSangre: tipo,
            radio: 50,
            tiempoIncompleta: 10
        }

        axios.put('http://localhost:5000/solicitud/' + id, data)
                    .then(res => {
                        history.push("/admin/solicitudes")
                    })
                    .catch(err => console.log(err))
    }

    return (
        <Container>
            <Typography variant="h6" gutterBottom>
                Editar solicitud
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                            <InputLabel>Hospital</InputLabel>
                            <Select
                                id="hospital"
                                name="hospital"
                                value={hospitalActual}
                                onChange={(event) => setHospitalActual(event.target.value)}   
                            >
                                {hospitales ? hospitales.map((hospital) => (
                                    <MenuItem value={hospital._id}>{hospital.nombre}</MenuItem>
                                )) : null}
                            </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                     <FormControl fullWidth>
                        <InputLabel>Estado</InputLabel>
                        <Select
                            id="estado"
                            name="estado"
                            value={estado}
                            onChange={(event) => setEstado(event.target.value)}
                        >
                            <MenuItem value={"Abierta"}>Abierta</MenuItem>
                            <MenuItem value={"En proceso"}>En proceso</MenuItem>
                            <MenuItem value={"Cerrada"}>Cerrada</MenuItem>
                        </Select>
                     </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="cantidad"
                        name="cantidad"
                        label="Cantidad"
                        inputProps={{ min: 1, max: 10 }}
                        type="number"
                        fullWidth
                        onChange={(event) => setCantidad(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Tipo de sangre</InputLabel>
                        <Select
                            id="tipo"
                            name="tipo"
                            value={tipo}
                            onChange={(event) => setTipo(event.target.value)}
                        >
                            <MenuItem value={"0+"}>0+</MenuItem>
                            <MenuItem value={"0-"}>0-</MenuItem>
                            <MenuItem value={"A+"}>A+</MenuItem>
                            <MenuItem value={"A-"}>A-</MenuItem>
                            <MenuItem value={"B+"}>B+</MenuItem>
                            <MenuItem value={"B-"}>B-</MenuItem>
                            <MenuItem value={"AB+"}>AB+</MenuItem>
                            <MenuItem value={"AB-"}>AB-</MenuItem>
                        </Select>
                    </FormControl>
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

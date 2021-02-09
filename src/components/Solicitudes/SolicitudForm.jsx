import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import React, { useState } from 'react'
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

export const SolicitudForm = () => {
    const classes = useStyles();
    const history = useHistory();
    const [hospital, setHospital] = useState("");
    const [estado, setEstado] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [tipo, setTipo] = useState("");

    const handleCancel = () => {
        history.push("/admin/solicitudes")
    }

    const handleCreate = () => {
        var data = {
            estado: estado,
            cantidad: cantidad,
            hospital: hospital,
            tipoDeSangre: tipo,
            radio: 50,
            tiempoIncompleta: 10
        }

        axios.post('http://localhost:5000/solicitud', data)
                    .then(res => {
                        history.push("/admin/solicitudes")
                    })
                    .catch(err => console.log(err))
    }

    return(
        <Container>
            <Typography variant="h6" gutterBottom>
                Crear nueva solicitud
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        required
                        id="hospital"
                        name="hospital"
                        label="Hospital"
                        fullWidth
                        onChange={(event) => setHospital(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        required
                        id="estado"
                        name="estado"
                        label="Estado"
                        fullWidth
                        onChange={(event) => setEstado(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="cantidad"
                        name="cantidad"
                        label="Cantidad"
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
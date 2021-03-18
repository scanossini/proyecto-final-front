import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack';
import swal from 'sweetalert';

export const Administradores = () => {
    const [admin, setAdmin] = useState("");
    const [hospitales, setHospitales] = useState([]);
    const [hospital, setHospital] = useState("");
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        axios.get("http://localhost:5000/admin/info", {"headers": {"token": sessionStorage.getItem("token")}})
            .then(res => setAdmin(res.data))
        
        axios.get('http://localhost:5000/hospital/')
            .then((response) => {
                setHospitales(response.data);
            })
            .catch((error) => {
                console.log(error);
        })
    }, [])

    const handleCreate = () => {
        var data = {
            hospital: hospital,
            nickname: nombre,
            password: password 
        } 

        axios.post("http://localhost:5000/admin/signup", data)
            .then(res => enqueueSnackbar("Administrador agregado", {variant: "success"}))
            .catch(err => swal(err.response.data, "", "error"))
    }

    return (
        admin ? 
            !admin.hospital ? 
                <Container>
                    <Typography variant="h6" gutterBottom>
                        Agregar nuevo administrador
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                    <InputLabel>Hospital</InputLabel>
                                    <Select
                                        id="hospital"
                                        name="hospital"
                                        value={hospital}
                                        onChange={(event) => setHospital(event.target.value)}   
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
                                id="nombre"
                                name="nombre"
                                label="Nombre del administrador"
                                fullWidth
                                onChange={(event) => setNombre(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="contraseña"
                                name="contraseña"
                                label="Contraseña del administrador"
                                fullWidth
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreate}
                        >
                            Crear
                        </Button>
                    </div>
                </Container>
            : <h1>Esto solo puede ser accedido por el administrador general</h1>
        : null
    )

}
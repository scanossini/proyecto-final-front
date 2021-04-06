import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert';
import { Spinner } from '../components/Spinner/Spinner';

export const Administradores = () => {
    const [admin, setAdmin] = useState("");
    const [hospitales, setHospitales] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [hospital, setHospital] = useState("");
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        axios.get("http://localhost:5000/admin/info", {"headers": {"token": sessionStorage.getItem("token")}})
            .then(res => setAdmin(res.data))
        
        axios.get('http://localhost:5000/hospital/all')
            .then((response) => {
                setHospitales(response.data);
            })
            .catch((error) => {
                console.log(error);
        })

        axios.get('http://localhost:5000/admin')
            .then((response) => setAdmins(response.data))
    }, [])

    const handleCreate = () => {
        var data = {
            hospital: hospital,
            nickname: nombre,
            password: password 
        } 

        axios.post("http://localhost:5000/admin/signup", data)
            .then(res => {
                var data = res.data
                var newAdmins = admins.concat(data)
                setAdmins(newAdmins)
                enqueueSnackbar("Administrador agregado", {variant: "success"})
            })
            .catch(err => swal(err.response.data, "", "error"))
    }
    
    const nombreHospital = (id) => {
            const hospital = hospitales.filter(hospital => hospital._id === id)
            return hospital[0].nombre
    }

    const handleDelete = (id) => {
        axios.delete("http://localhost:5000/admin/" + id, {"headers": {"token": sessionStorage.getItem("token")}})
            .then(res => { 
                setAdmins(admins.filter(admin => admin._id !== id))
                enqueueSnackbar("Administrador eliminado", {variant: "success"}) 
            })
            .catch(err => swal(err.response.data, "", "error"))
    }

    return (
        admin ? 
            !admin.hospital ? 
                <Container>
                    <Typography variant="h6" gutterBottom>
                        Agregar nuevo administrador
                    </Typography>
                    <Grid container spacing={3} className="mb-5">
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
                                id="nick"
                                name="nick"
                                label="Nick del administrador"
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
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreate}
                            >
                                Crear
                            </Button>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper} className="mt-5">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Administrador</TableCell>
                                    <TableCell>Hospital</TableCell>
                                    <TableCell>Eliminar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    admins.map((admin) => (
                                        <TableRow>
                                            <TableCell>{admin.nickname}</TableCell>
                                            <TableCell>{nombreHospital(admin.hospital)}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Eliminar">
                                                    <IconButton onClick={() => handleDelete(admin._id)}>
                                                        <DeleteIcon color="secondary" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            : <h1>Esto solo puede ser accedido por el administrador general</h1>
        : <Spinner />
    )

}
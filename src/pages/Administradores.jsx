import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';
import swal from 'sweetalert';
import { Spinner } from '../components/Spinner/Spinner';
import { NoPermission } from '../components/NoPermission/NoPermission';
import Swal from 'sweetalert2';

export const Administradores = () => {
    const [admin, setAdmin] = useState("");
    const [hospitales, setHospitales] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [hospital, setHospital] = useState("");
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [numPaginas, setNumPaginas] = useState(1);
    const [pagina, setPagina] = useState(1);
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

        axios.get('http://localhost:5000/admin?page=' + pagina)
        .then((response) => {
            setAdmins(response.data.docs);
            setNumPaginas(response.data.totalPages);
        })
    }, [pagina, numPaginas])

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
        if (hospitales.length > 0) {
            const hospital = hospitales.filter(hospital => hospital._id === id)
            return hospital[0].nombre
        } else return "Cargando..."
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Desea eliminar al administrador?",
            showDenyButton: true,
            denyButtonText: "No, cancelar",
            confirmButtonText: "Sí, deseo eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("http://localhost:5000/admin/" + id, {"headers": {"token": sessionStorage.getItem("token")}})
                    .then(res => { 
                        setAdmins(admins.filter(admin => admin._id !== id))
                        enqueueSnackbar("Administrador eliminado", {variant: "success"}) 
                    })
                    .catch(err => swal(err.response.data, "", "error"))
            }
        })
    }

    const handleChange = (event, value) => {
        setPagina(value);
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
                                type="password"
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
                    {admins.length > 0 ? 
                    <>
                    <TableContainer component={Paper} className="mt-5">
                        <Table size="small">
                            <TableHead>
                                <TableRow style={{backgroundColor: "lightblue"}}>
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
                    <Pagination className="mt-3" count={numPaginas} page={pagina} color="primary" onChange={handleChange} /> </>  : null}
                </Container>
            : <NoPermission />            
        : <Spinner />
        
    )

}
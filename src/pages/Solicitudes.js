import { Container, Fab, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/tooltip';

const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    head: {
        backgroundColor: "lightblue",
    },
    button: {
        position: "fixed",
        right: "100px",
        bottom: "40px",
    },
    container: {
        maxHeight: 440,
        marginTop: 70
    },
    editButton: {
        backgroundColor: "rgb(230,230,230)",
        fontSize: 15,
    },
    deleteButton: {
        backgroundColor: "rgb(230,230,230)",
        fontSize: 15,
        marginLeft: 5, 
    }
})

export const Solicitudes = () => {
    const classes = useStyles();
    const history = useHistory();
    const [solicitudes, setSolicitudes] = useState("");
    const [hospitales, setHospitales] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/solicitud/')
            .then((response) => {
                setSolicitudes(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:5000/hospital/')
            .then((response) => {
                setHospitales(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleCreation = () => {
        history.push("/admin/solicitudes/crear")
    }

    const handleEdit = (id) => {
        var url = "/admin/solicitudes/editar/" + id
        history.push(url)
    }

    const handleDelete = (solicitud) => {
        axios.delete(`http://localhost:5000/solicitud/${solicitud._id}`)
        .then(res => {
            axios.get('http://localhost:5000/solicitud/')
            .then((response) => {
                setSolicitudes(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            history.push("/admin/solicitudes")
        })
        .catch(err =>console.log(err))
    }

    const nombreHospital = (id) => {
        const hospital = hospitales.filter(hospital => hospital._id === id)
        return hospital[0].nombre
    }
    
    return (
        <Container>
            { solicitudes && hospitales ? 
                <TableContainer component={Paper} className={classes.container}> 
                    <Table stickyHeader className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.head}>
                                <TableCell>Hospital</TableCell>
                                <TableCell>Donaciones</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Operación</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                solicitudes.map((solicitud) => (
                                    <TableRow hover>
                                        <TableCell>{nombreHospital(solicitud.hospital)}</TableCell>
                                        <TableCell>{solicitud.cantidad}</TableCell>
                                        <TableCell>{solicitud.tipoDeSangre}</TableCell>
                                        <TableCell>{solicitud.estado}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Editar" aria-label="editar">
                                                <IconButton 
                                                    className={classes.editButton}
                                                    onClick={() => handleEdit(solicitud._id)}
                                                >
                                                <EditIcon color="action" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Eliminar" aria-label="eliminar">
                                                <IconButton 
                                                    className={classes.deleteButton}
                                                    onClick={() => handleDelete(solicitud)}
                                                >
                                                <DeleteIcon color="secondary" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer> : null
            }
            <Fab onClick={handleCreation} className={classes.button} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
       </Container>
    )
}

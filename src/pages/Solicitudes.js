import { Container, Fab, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

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
        backgroundColor: "rgb(255,255,102)",
        fontSize: 15,
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
                                <TableCell>Operacion</TableCell>
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
                                            <IconButton className={classes.editButton}>
                                                <EditIcon color="primary" />
                                                Editar
                                            </IconButton>
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

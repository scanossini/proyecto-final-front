import { Container, Fab, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from 'react-router-dom';

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
    }
})

export const Solicitudes = () => {
    const classes = useStyles();
    const history = useHistory();
    const [solicitudes, setSolicitudes] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/solicitud/')
            .then((response) => {
                setSolicitudes(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleCreation = () => {
        history.push("/admin/solicitudes/crear")
    }

    return (
        <Container>
            { solicitudes ? 
                <TableContainer component={Paper} className={classes.container}> 
                    <Table stickyHeader className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.head}>
                                <TableCell>Hospital</TableCell>
                                <TableCell>Donaciones</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                solicitudes.map((solicitud) => (
                                    <TableRow hover>
                                        <TableCell>{solicitud.hospital}</TableCell>
                                        <TableCell>{solicitud.cantidad}</TableCell>
                                        <TableCell>{solicitud.tipoDeSangre}</TableCell>
                                        <TableCell>{solicitud.estado}</TableCell>
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

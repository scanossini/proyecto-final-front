import { Container, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    head: {
        backgroundColor: "lightblue",
        color: "white",
    }
})

export const Solicitudes = () => {
    const classes = useStyles();
    const [solicitudes, setSolicitudes] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/solicitud/')
            .then((response) => {
                setSolicitudes(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <Container>
            { solicitudes ? 
            <TableContainer component={Paper}> 
                <Table className={classes.table}>
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
                                <TableRow>
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
       </Container>
    )
}

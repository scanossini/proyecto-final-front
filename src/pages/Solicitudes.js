import { Container, Fab, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddIcon from "@material-ui/icons/Add";
import { Row, Col } from "react-bootstrap";
import swal from '@sweetalert/with-react';

const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    head: {
        backgroundColor: "lightblue",
        color: "white",
    },
    button: {
        position: "fixed",
        right: "100px",
        bottom: "40px",
    },
})

export const Solicitudes = () => {
    const classes = useStyles();
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
        swal(
            <div>
                <Row>
                    <Col xs={{ span: 6, offset: 1 }}>
                        <TextField type="text" name="estado" id="estadoField" placeholder="Estado"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 6, offset: 1 }}>
                        <TextField type="number" name="cantidad" id="cantidadField" placeholder="Cantidad"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 6, offset: 1 }}>
                        <TextField type="text" name="hospital" id="hospitalField" placeholder="Hospital"/>
                    </Col>
                </Row>
            </div>
        , {
            buttons: {
                cancel: "Cancelar",
                confirm: "Confirmar"
            }
        }).then(value => {
            if (value !== null){
                var data = {
                    estado: document.getElementById("estadoField").value,
                    cantidad: document.getElementById("cantidadField").value,
                    hospital: document.getElementById("hospitalField").value,
                    tipoDeSangre: 0,
                    radio: 50,
                    tiempoIncompleta: 10
                }

                axios.post('http://localhost:5000/solicitud', data)
                    .then(res => {
                        setSolicitudes(solicitudes.concat(res.data))
                    })
                    .catch(err => console.log(err))
            }
        })
    }

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
            <Fab onClick={handleCreation} className={classes.button} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
       </Container>
    )
}

import { Paper, Container, Fab, Table, TableCell, TableHead, Tooltip, TableContainer, TableBody, TableRow, IconButton } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from 'react-router-dom';

export const Hospitales = () => {
    const history = useHistory();
    const [hospitales, setHospitales] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/hospital/')
            .then((response) => {
                setHospitales(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return(
        <Container>
            { hospitales ? 
                <TableContainer component={Paper}> 
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Hospital</TableCell>
                                <TableCell>Operación</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                hospitales.map((hospital) => (
                                    <TableRow hover>
                                        <TableCell>{hospital.nombre}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Editar" aria-label="editar">
                                                <IconButton >
                                                <EditIcon color="action" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Eliminar" aria-label="eliminar">
                                                <IconButton >
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
            <Fab onClick={()=>history.push("/admin/hospitales/crear")} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
       </Container>
    )
}
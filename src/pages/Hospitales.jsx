import { Paper, makeStyles, Container, Fab, Table, TableCell, TableHead, Tooltip, TableContainer, TableBody, TableRow, IconButton } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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


export const Hospitales = () => {
    const classes = useStyles();
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
                                                <IconButton
                                                    className={classes.editButton} >
                                                <EditIcon color="action" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Eliminar" aria-label="eliminar">
                                                <IconButton
                                                   className={classes.deleteButton}
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
            <Fab onClick={()=>history.push("/admin/hospitales/crear")} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
       </Container>
    )
}
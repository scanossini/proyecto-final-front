import { Container, Fab, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Spinner } from '../components/Spinner/Spinner'
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from '@material-ui/icons/FilterList';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/tooltip';
import swal from 'sweetalert2';

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
    button2: {
        position: "fixed",
        right: "180px",
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
    const [tipo, setTipo] = useState("");

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
        swal.fire({
            title: 'Estado',
            input: 'select',
            inputOptions: {
              'Estados': {
                'Abierta': 'Abierta',
                'En Proceso': 'En proceso',
                'Cerrada': 'Cerrada'
              }
            },
            inputPlaceholder: 'Seleccione un estado',
            showCancelButton: true,
            inputValidator: (value) => {
                var data = {
                    estado: value
                }
                axios.put('http://localhost:5000/solicitud/'+id, data)
                    .then(res => {
                        axios.get('http://localhost:5000/solicitud/')
                            .then((response) => {
                                setSolicitudes(response.data);
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    })
                    .catch(err => console.log(err))
            }
        })
    }

    function axiosDelete(solicitud){
        axios.delete(`http://localhost:5000/solicitud/${solicitud._id}`)
        .then(res => {
            setSolicitudes(solicitudes.filter(solicitud2 => solicitud2._id !== solicitud._id))
            history.push("/admin/solicitudes")
        })
        .catch(err =>console.log(err))
    }
    
    const nombreHospital = (id) => {
        const hospital = hospitales.filter(hospital => hospital._id === id)
        return hospital[0].nombre
    }

    const handleFilter = () => {
        swal.fire({
            title: 'Filtrar tabla de solicitudes',
            input: 'select',
            inputOptions: {
              'Tipos de sangre': {
                '': 'Todos',
                'A+': 'A+',
                'B+': 'B+',
                '0+': '0+',
                'AB+': 'AB+',
                'A-': 'A-',
                'B-': 'B-',
                '0-': '0-',
                'AB-': 'AB-'
              }
            },
            inputPlaceholder: 'Seleccione un tipo de sangre',
            showCancelButton: true,
            inputValidator: (value) => {
                setTipo(value);
            }
        })
    }

    const filterList = () => {
        var filter;
        tipo !== "" ? 
            filter = solicitudes.filter(solicitud => solicitud.tipoDeSangre === tipo) 
            : filter = solicitudes
        return filter
    }

    return (
        <Container>
            { solicitudes && hospitales ? 
                <TableContainer component={Paper} className={classes.container}> 
                    <Table className={classes.table}>
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
                                filterList().map((solicitud) => (    
                                <>                        
                                    <TableRow hover>
                                        <TableCell>{nombreHospital(solicitud.hospital)}</TableCell>
                                        <TableCell>{solicitud.donantes+"/"+solicitud.cantidad}</TableCell>
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
                                                    onClick= {() => axiosDelete(solicitud)}
                                                >
                                                <DeleteIcon color="secondary" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                </>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer> : <Spinner />
            }
            <Fab onClick={handleCreation} className={classes.button} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
            <Fab onClick={handleFilter} className={classes.button2} color="primary" aria-label="add">
                <FilterListIcon />
            </Fab>
       </Container>
    )
}

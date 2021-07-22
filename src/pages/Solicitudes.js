import { Container, Fab, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Spinner } from '../components/Spinner/Spinner'
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from '@material-ui/icons/FilterList';
import Pagination from '@material-ui/lab/Pagination';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/tooltip';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

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
    const [numPaginas, setNumPaginas] = useState(1);
    const [pagina, setPagina] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:5000/solicitud?tipo=' + tipo + '&page=' + pagina)
            .then((response) => {
                setSolicitudes(response.data.docs);
                setNumPaginas(response.data.totalPages);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:5000/hospital/all')
            .then((response) => {
                setHospitales(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [pagina, numPaginas, tipo])

    const handleCreation = () => {
        history.push("/admin/solicitudes/crear")
    }

    function axiosDelete(solicitud){
        Swal.fire({
            title: "Desea eliminar la solicitud?",
            showDenyButton: true,
            denyButtonText: "No, cancelar",
            confirmButtonText: "Sí, deseo eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/solicitud/${solicitud._id}`)
                    .then(res => {
                        setSolicitudes(solicitudes.filter(solicitud2 => solicitud2._id !== solicitud._id))
                        history.push("/admin/solicitudes")
                       
                    })
                    .catch(err =>console.log(err))
                    if(solicitudes.length === 1){
                        setNumPaginas(prevState => ({ numPaginas: prevState.numPaginas - 1}))
                        handleChange(numPaginas)
                    }
            }
        })
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
                setPagina(1);
                setTipo(value);
            }
        })
    }

    const handleChange = (event, value) => {
        setPagina(value);
    }

    return (
        <Container>
            { solicitudes && hospitales ? 
                <TableContainer component={Paper} className={classes.container}> 
                    <Table className={classes.table} size="small">
                        <TableHead>
                            <TableRow className={classes.head}>
                                <TableCell>Hospital</TableCell>
                                <TableCell>Paciente</TableCell>
                                <TableCell>DNI</TableCell>
                                <TableCell>Donaciones</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Eliminar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                solicitudes.map((solicitud) => (                    
                                    <TableRow hover key={solicitud._id}>
                                        <TableCell>{nombreHospital(solicitud.hospital)}</TableCell>
                                        <TableCell>{solicitud.persona}</TableCell>
                                        <TableCell>{solicitud.DNIPersona}</TableCell>
                                        <TableCell>{solicitud.donantes+"/"+solicitud.cantidad}</TableCell>
                                        <TableCell>{solicitud.tipoDeSangre}</TableCell>
                                        <TableCell>{solicitud.estado}</TableCell>
                                        <TableCell>
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
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer> : <Spinner />
            }
            <Fab onClick={handleCreation} className={classes.button} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
            <Fab onClick={handleFilter} className={classes.button2} color="primary" aria-label="filter">
                <FilterListIcon />
            </Fab>
            <Pagination className="mt-3" count={numPaginas} page={pagina} color="primary" onChange={handleChange} /> 
       </Container>
    )
}

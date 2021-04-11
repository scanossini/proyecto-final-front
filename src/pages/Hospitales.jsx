import { Paper, makeStyles, Container, Fab, Table, TableCell, TableHead, Tooltip, TableContainer, TableBody, TableRow, IconButton } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import { Spinner } from '../components/Spinner/Spinner'
import swal from 'sweetalert';
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
    const [admin, setAdmin] = useState("");
    const [hospitales, setHospitales] = useState("");
    const [numPaginas, setNumPaginas] = useState(1);
    const [pagina, setPagina] = useState(1);

    useEffect(() => {
        axios.get("http://localhost:5000/admin/info", {"headers": {"token": sessionStorage.getItem("token")}})
            .then(res => setAdmin(res.data))

        axios.get('http://localhost:5000/hospital/')
            .then((response) => {
                setHospitales(response.data.docs);
                setNumPaginas(response.data.totalPages);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [pagina, numPaginas])

    const handleDelete = (id) => {
        Swal.fire({
            title: "Desea eliminar al hospital?",
            showDenyButton: true,
            denyButtonText: "No, cancelar",
            confirmButtonText: "Sí, deseo eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("http://localhost:5000/hospital/"+id, {"headers": {"token": sessionStorage.getItem("token")}})
                    .then(() => {
                        var hospis = hospitales.filter(hospital => hospital._id !== id);
                        setHospitales(hospis)
                    })
                    .catch((err) => {
                        swal(err.response.data, "", "error")
                    })
                    if(hospitales.length === 1){
                        setNumPaginas(prevState => ({ numPaginas: prevState.numPaginas - 1}))
                        handleChange(numPaginas)
                     }
            }
        })
    }
    
    const handleChange = (event, value) => {
        setPagina(value);
    }

    return(
        <Container>
            { hospitales ? 
                <TableContainer className={classes.container} component={Paper}> 
                    <Table className={classes.table} size="small">
                        <TableHead>
                            <TableRow className={classes.head}>
                                <TableCell>Hospital</TableCell>
                                <TableCell>Localización</TableCell>
                                <TableCell>Eliminar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {                             
                                hospitales.map((hospital) => (
                                    <TableRow hover>
                                        <TableCell>{hospital.nombre}</TableCell>
                                        <TableCell>{hospital.direccion + ", " + hospital.ciudad}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Eliminar" aria-label="eliminar">
                                                <IconButton
                                                   className={classes.deleteButton}
                                                   onClick={() => handleDelete(hospital._id)}
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
            {   
                !admin.hospital ?
                <Fab className={classes.button} onClick={()=>history.push("/admin/hospitales/crear")} color="primary" aria-label="add">
                    <AddIcon />
                </Fab> : null
            }
            <Pagination className="mt-3" count={numPaginas} page={pagina} color="primary" onChange={handleChange} /> 
       </Container>
    )
}
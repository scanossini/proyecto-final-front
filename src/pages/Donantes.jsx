import { Container, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import axios from 'axios'
import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/tooltip';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { useHistory } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import { SearchBar } from '../components/SearchBar/SearchBar'

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
  hospitalIcon: {
      backgroundColor: "rgb(230,230,230)",
      fontSize: 15,
      marginLeft: 5, 
  }
})

export const Donantes = () => {
  const [donantes, setDonantes] = useState([])
  const [input, setInput] = useState("");
  const classes = useStyles();
  const history = useHistory();

  const handleEdit = (id) => {
    var date = new Date();
    var today = date.getFullYear() + '-'
                + ('0' + (date.getMonth()+1)).slice(-2) + '-'
                + ('0' + date.getDate()).slice(-2);
    swal(
      <div>
        <TextField 
          id="fechaDon"
          name="fechaDon"
          label="Fecha de última donación"
          type="date"
          defaultValue={today}
          fullWidth
        />
      </div>
    ).then(() => {
      var data = {
        date: document.getElementById("fechaDon").value
      }
      axios.put('http://localhost:5000/donante/'+id, data)
        .then(res => {
          var nData = {
            nombre: input
          }
          axios.post('http://localhost:5000/donante/input', nData)
            .then((response) => {
                setDonantes(response.data);
            })
            .catch((error) => {
                console.log(error);
            })}
        )
    })
  }

  const fechaDon = (fecha) => {
    var date = new Date(fecha)
    return (date.getDate()+1)+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
  }

  const handleSearch = () => {
    var data = {
      nombre: input
    }
    
    axios.post('http://localhost:5000/donante/input', data)
            .then((response) => {
                setDonantes(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
  }

  return (
    <Container>
      <SearchBar onInput={(event) => setInput(event.target.value)} onSearch={handleSearch} />
      <TableContainer component={Paper} className={classes.container}> 
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.head}>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Última fecha de donación</TableCell>
              <TableCell>Anotado para donar</TableCell>
              <TableCell>Operación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {
                donantes.length > 0 ? 
                donantes.map((donante) => (    
                <>                        
                  <TableRow hover>
                      <TableCell>{donante.nombre}</TableCell>
                      <TableCell>{donante.apellido}</TableCell>
                      <TableCell>{donante.dni}</TableCell>
                      <TableCell>{donante.fechaDonacion ? fechaDon(donante.fechaDonacion) : "N/A"}</TableCell>
                      <TableCell>{donante.anotadoEnSolicitud ? "Sí" : "No"}</TableCell>
                      <TableCell>
                        <Tooltip title="Banco de sangre" aria-label="banco de sangre">
                            <IconButton 
                                className={classes.hospitalIcon}
                                onClick={() => history.push('donantes/'+donante._id)}
                            >
                              <LocalHospitalIcon color="secondary" />
                            </IconButton>
                        </Tooltip>
                        {donante.anotadoEnSolicitud ?
                          <Tooltip title="Registrar fecha de donación" aria-label="editar">
                              <IconButton 
                                  className={classes.editButton}
                                  onClick={() => handleEdit(donante._id)}
                              >
                                <EditIcon color="action" />
                              </IconButton>
                          </Tooltip> : null
                        }
                      </TableCell>
                  </TableRow>
                </>
                )) : null
              }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}


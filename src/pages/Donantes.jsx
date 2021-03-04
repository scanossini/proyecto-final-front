import { Container, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/tooltip';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
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
  hospitalIcon: {
      backgroundColor: "rgb(230,230,230)",
      fontSize: 15,
      marginLeft: 5, 
  }
})

export const Donantes = () => {
  const [donantes, setDonantes] = useState([])
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:5000/donante/')
            .then((response) => {
                setDonantes(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
  }, [])
  
  return (
    <Container>
      <TableContainer component={Paper} className={classes.container}> 
        <Table stickyHeader className={classes.table}>
          <TableHead>
            <TableRow className={classes.head}>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Última fecha de donación</TableCell>
              <TableCell>Operación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {
                donantes.map((donante) => (    
                <>                        
                  <TableRow hover>
                      <TableCell>{donante.nombre}</TableCell>
                      <TableCell>{donante.apellido}</TableCell>
                      <TableCell>{donante.dni}</TableCell>
                      <TableCell>{donante.fechaDonacion}</TableCell>
                      <TableCell>
                          <Tooltip title="Editar" aria-label="editar">
                              <IconButton 
                                  className={classes.editButton}
                              >
                                <EditIcon color="action" />
                              </IconButton>
                          </Tooltip>
                          <Tooltip title="Banco de sangre" aria-label="banco de sangre">
                              <IconButton 
                                  className={classes.hospitalIcon}
                                  onClick={() => history.push('donantes/'+donante._id)}
                              >
                                <LocalHospitalIcon color="secondary" />
                              </IconButton>
                          </Tooltip>
                      </TableCell>
                  </TableRow>
                </>
                ))
              }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}


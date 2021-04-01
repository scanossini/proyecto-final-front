import { Box, Card, CardContent, Container, Divider, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Home = () => {
    const [admin, setAdmin] = useState("")
    const [hospital, setHospital] = useState("")

    useEffect(() => {
      axios.get("http://localhost:5000/admin/info", {"headers": {"token": sessionStorage.getItem("token")}})
        .then(response => { 
          setAdmin(response.data) 
          
          if (response.data.hospital) 
            axios.get("http://localhost:5000/hospital/"+response.data.hospital)
              .then(response => setHospital(response.data.nombre))
        })
        
      
    }, [admin.hospital])

    return(
        admin ?
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h4">{(!admin.hospital) ? "Administrador general": "Administrador del hospital "+ hospital}</Typography>
                    <Box m={2}>
                        <Divider variant="middle" />
                    </Box>
                    <Typography variant="h6">
                      {!admin.hospital ? 
                        "Esta cuenta tiene permisos para administrar tanto solicitudes como todos los hospitales y crear administradores." : 
                        "Esta cuenta tiene permisos para administrar los párametros del hospital al que pertenece y gestionar cualquier tipo de solicitud."
                      }
                    </Typography>
                </CardContent>
            </Card>
        </Container> : null
    )
}
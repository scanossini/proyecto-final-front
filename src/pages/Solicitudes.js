import { Container, Grid, Typography } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Solicitud } from '../components/Cards/Solicitud'

export const Solicitudes = () => {
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

    return (
        <Container>
            <Typography variant="h3">Solicitudes</Typography>
            <Grid
            container
            spacing={4}
            >
                { solicitudes ? (
                    solicitudes.map((solicitud) => (
                        <Grid item xs={12} sm={6} md={4} key={solicitud._id}>
                            <Solicitud solicitud={solicitud}/>
                        </Grid>
                    ))
                ) : null}
            </Grid>
        </Container>
    )
}

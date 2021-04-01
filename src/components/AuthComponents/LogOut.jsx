import { Button, Container, Grid, Typography } from '@material-ui/core';
import React from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

export const LogOut = () => {
    const history = useHistory();

    const logout = () => {
        Swal.fire({
            title: "Desea cerrar sesión?",
            showDenyButton: true,
            denyButtonText: "No",
            confirmButtonText: "Sí"
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem("dtoken");
                history.push("/");
            }
        })
    }


    return(
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">Desea desconectarse?</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={() => logout()}
                    >
                        Sí
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
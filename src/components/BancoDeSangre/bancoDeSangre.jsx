import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';

export const BancoDeSangre = (props) =>{
    const id = props.location.pathname.split("/")[3];
    const [banco, setBanco] = useState([]);
    const [vih, setVih] = useState("");
    const [sifilis, setSifilis] = useState("");
    const [hepatitisB, setHepatitisB] = useState("");
    const [hepatitisC, setHepatitisC] = useState("");
    const [htlv, setHtlv] = useState("");
    const [chagas, setChagas] = useState("");
    const [brucelosis, setBrucelosis] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        axios.get('http://localhost:5000/banco/'+id)
            .then(response => {
                if (!response.data){
                    var data = {
                        donante: id
                    }
                    axios.post('http://localhost:5000/banco/', data)
                        .then(response => setBanco(response.data))
                } else setBanco(response.data)

                setVih(banco.vih)
                setSifilis(banco.sifilis)
                setHepatitisB(banco.hepatitisB)
                setHepatitisC(banco.hepatitisC)
                setHtlv(banco.htlv)
                setChagas(banco.chagas)
                setBrucelosis(banco.brucelosis)
            })
    }, [banco.brucelosis, banco.vih, banco.sifilis, banco.hepatitisB, banco.hepatitisC, banco.htlv, banco.chagas, id])

    const handleClick = () => {
        var data = {
            vih: vih,
            sifilis: sifilis,
            hepatitisB: hepatitisB,
            hepatitisC: hepatitisC,
            htlv: htlv,
            chagas: chagas,
            brucelosis: brucelosis
        }
        
        axios.put('http://localhost:5000/banco/'+banco._id, data)
            .then(res => enqueueSnackbar("Datos actualizados", {variant: "success"}))
            .catch(err => console.log(err))
    }
    
    return (
        <Container>
            <Typography variant="h6" gutterBottom>
                Banco de sangre
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                        <TextField
                            id="vih"
                            name="vih"
                            label="VIH"
                            type="number"
                            value={vih}
                            onChange={(event) => setVih(event.target.value)}
                            fullWidth
                        />
                </Grid>
                <Grid item xs={12} sm={4}>
                        <TextField
                            id="sifilis"
                            name="sifilis"
                            label="Sífilis"
                            type="number"
                            value={sifilis}
                            onChange={(event) => setSifilis(event.target.value)}
                            fullWidth
                        />
                </Grid>
                <Grid item xs={12} sm={4}>
                        <TextField
                            id="chagas"
                            name="chagas"
                            label="Chagas"
                            type="number"
                            value={chagas}
                            onChange={(event) => setChagas(event.target.value)}
                            fullWidth
                        />
                </Grid>
                <Grid item xs={12} sm={4}>
                        <TextField
                            id="hepatitis B"
                            name="hepatitis B"
                            label="Hepatitis B"
                            type="number"
                            value={hepatitisB}
                            onChange={(event) => setHepatitisB(event.target.value)}
                            fullWidth
                        />
                </Grid>
                <Grid item xs={12} sm={4}>
                        <TextField
                            id="hepatitis C"
                            name="hepatitis C"
                            label="Hepatitis C"
                            type="number"
                            value={hepatitisC}
                            onChange={(event) => setHepatitisC(event.target.value)}
                            fullWidth
                        />
                </Grid>
                <Grid item xs={12} sm={4}>
                        <TextField
                            id="htlv"
                            name="htlv"
                            label="HTLV"
                            type="number"
                            value={htlv}
                            onChange={(event) => setHtlv(event.target.value)}
                            fullWidth
                        />
                </Grid>
                <Grid item xs={12} sm={4}>
                        <TextField
                            id="brucelosis"
                            name="brucelosis"
                            label="Brucelosis"
                            type="number"
                            value={brucelosis}
                            onChange={(event) => setBrucelosis(event.target.value)}
                            fullWidth
                        />
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    Actualizar
                </Button>
            </Grid>
        </Container>
    )
}
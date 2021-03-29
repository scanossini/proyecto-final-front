import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';

export const BancoDeSangre = (props) =>{
    const id = props.location.pathname.split("/")[3];
    const [banco, setBanco] = useState([]);
    const [vih, setVih] = useState(false);
    const [sifilis, setSifilis] = useState(false);
    const [hepatitisB, setHepatitisB] = useState(false);
    const [hepatitisC, setHepatitisC] = useState(false);
    const [htlv, setHtlv] = useState(false);
    const [chagas, setChagas] = useState(false);
    const [brucelosis, setBrucelosis] = useState(false);
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
                } else {
                    setBanco(response.data)
                    setVih(response.data.vih)
                    setSifilis(response.data.sifilis)
                    setHepatitisB(response.data.hepatitisB)
                    setHepatitisC(response.data.hepatitisC)
                    setHtlv(response.data.htlv)
                    setChagas(response.data.chagas)
                    setBrucelosis(response.data.brucelosis)
                }
            })
    }, [id])

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
                    <FormControl fullWidth>
                        <InputLabel>VIH</InputLabel>
                        <Select
                            id="vih"
                            name="vih"
                            value={vih}
                            onChange={(event) => setVih(event.target.value)} 
                        >
                            <MenuItem value={true}>Positivo</MenuItem>
                            <MenuItem value={false}>Negativo</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Sífilis</InputLabel>
                        <Select
                            id="sifilis"
                            name="sifilis"
                            value={sifilis}
                            onChange={(event) => setSifilis(event.target.value)} 
                        >
                            <MenuItem value={true}>Positivo</MenuItem>
                            <MenuItem value={false}>Negativo</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Chagas</InputLabel>
                        <Select
                            id="chagas"
                            name="chagas"
                            value={chagas}
                            onChange={(event) => setChagas(event.target.value)} 
                        >
                            <MenuItem value={true}>Positivo</MenuItem>
                            <MenuItem value={false}>Negativo</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Hepatitis B</InputLabel>
                        <Select
                            id="hepatitis B"
                            name="hepatitis B"
                            value={hepatitisB}
                            onChange={(event) => setHepatitisB(event.target.value)} 
                        >
                            <MenuItem value={true}>Positivo</MenuItem>
                            <MenuItem value={false}>Negativo</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Hepatitis C</InputLabel>
                        <Select
                            id="hepatitis C"
                            name="hepatitis C"
                            value={hepatitisC}
                            onChange={(event) => setHepatitisC(event.target.value)} 
                        >
                            <MenuItem value={true}>Positivo</MenuItem>
                            <MenuItem value={false}>Negativo</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>HTLV</InputLabel>
                        <Select
                            id="htlv"
                            name="htlv"
                            value={htlv}
                            onChange={(event) => setHtlv(event.target.value)} 
                        >
                            <MenuItem value={true}>Positivo</MenuItem>
                            <MenuItem value={false}>Negativo</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Brucelosis</InputLabel>
                        <Select
                            id="brucelosis"
                            name="brucelosis"
                            value={brucelosis}
                            onChange={(event) => setBrucelosis(event.target.value)} 
                        >
                            <MenuItem value={true}>Positivo</MenuItem>
                            <MenuItem value={false}>Negativo</MenuItem>
                        </Select>
                    </FormControl>
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
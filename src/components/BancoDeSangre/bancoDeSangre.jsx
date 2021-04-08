import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export const BancoDeSangre = (props) =>{
    const id = props.location.pathname.split("/")[3];
    const [banco, setBanco] = useState([]);
    const [hospital, setHospital] = useState("");
    const [vih, setVih] = useState(false);
    const [sifilis, setSifilis] = useState(false);
    const [hepatitisB, setHepatitisB] = useState(false);
    const [hepatitisC, setHepatitisC] = useState(false);
    const [htlv, setHtlv] = useState(false);
    const [chagas, setChagas] = useState(false);
    const [brucelosis, setBrucelosis] = useState(false);
    const [hospitales, setHospitales] = useState("");
    const [actualizado, setActualizado] = useState(true);
    const [fechaDeActualizacion, setFechaDeActualizacion] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory()

    useEffect(() => {
        axios.get('http://localhost:5000/hospital/all')
            .then((response) => {
                setHospitales(response.data);
            })
            .catch((error) => {
                console.log(error);
        })

        axios.get('http://localhost:5000/banco/'+id)
            .then(response => {
                if (!response.data){
                    var data = {
                        donante: id
                    }
                    axios.post('http://localhost:5000/banco/', data)
                        .then(response => setBanco(response.data))
                } else {
                    setBanco(response.data.banco)
                    if(response.data.banco){
                        setVih(response.data.banco.vih)
                        setSifilis(response.data.banco.sifilis)
                        setHepatitisB(response.data.banco.hepatitisB)
                        setHepatitisC(response.data.banco.hepatitisC)
                        setHtlv(response.data.banco.htlv)
                        setChagas(response.data.banco.chagas)
                        setBrucelosis(response.data.banco.brucelosis)
                        setActualizado(response.data.actualizado)
                        setFechaDeActualizacion(response.data.banco.fechaDeActualizacion)
                    }
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
            brucelosis: brucelosis,
            hospital: hospital
        }
        
        axios.put('http://localhost:5000/banco/'+banco._id, data)
            .then(res => enqueueSnackbar("Datos actualizados", {variant: "success"}))
            .catch(err => console.log(err))
    }
    
    const fechaParser = (fecha) => {
        var date = new Date(fecha)
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    }

    return (
        <Container>
            <Typography variant="h6" gutterBottom>
                {"Banco de sangre" + ((actualizado ? "" : " (desactualizado)"))}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {"Fecha de actualización: "+((fechaDeActualizacion) ? fechaParser(fechaDeActualizacion) : "N/A")}
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
                <Grid item xs={12} sm={8}>
                    <FormControl fullWidth>
                        <InputLabel>Hospital</InputLabel>
                        <Select
                            id="hospital"
                            name="hospital"
                            value={hospital}
                            onChange={(event) => setHospital(event.target.value)}   
                        >
                            {hospitales ? hospitales.map((hospital) => (
                                <MenuItem value={hospital._id}>{hospital.nombre}</MenuItem>
                            )) : null}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button
                        className="mr-3"
                        color="secondary"
                        onClick={() => history.push("/admin/donantes")}
                    >
                        Cancelar
                    </Button>
                    <Button disabled={(hospital === "" ? true: false)}
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >
                        Actualizar
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
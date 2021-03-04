import axios from 'axios';
import React, { useEffect } from 'react';

export const BancoDeSangre = (props) =>{
    const id = props.location.pathname.split("/")[3];

    useEffect(() => {
        axios.get('http://localhost:5000/banco/'+id)
            .then(response => {
                if (!response.data){
                    var data = {
                        donante: id
                    }
                    axios.post('http://localhost:5000/banco/', data)
                        .then(response => console.log(response))
                }
            })
    }, [])
    
    return (
        <h1>Banco de sangre</h1>
    )
}
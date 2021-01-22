import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
        <div className='solicitudes'>
            <h1>
                Solicitudes
            </h1>
        </div>
    )
}

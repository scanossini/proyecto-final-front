import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Administradores = () => {
    const [admin, setAdmin] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/admin/info", {"headers": {"token": sessionStorage.getItem("token")}})
            .then(res => setAdmin(res.data))
    }, [])

    return (
        admin ? 
            !admin.hospital ? 
            <h1>Admin</h1> : <h1>Esto solo puede ser accedido por el administrador general</h1>
        : null
    )

}
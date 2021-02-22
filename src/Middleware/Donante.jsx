import React, { useState } from 'react'
import { useEffect } from 'react'
import Axios from 'axios'
import swal from '@sweetalert/with-react';
import { useHistory } from 'react-router-dom';

export const Donante = (props) => {
    const history = useHistory();
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        Axios.get("http://localhost:5000/donante/isAuth", {"headers": {"token": sessionStorage.getItem("token")}})
            .then(() => setAuth(true))
            .catch(() => {
                swal("Debes estar logueado como donante para acceder a este recurso", "", "error")
                    .then(() => history.push("/"));
            })
    })
    
    return(
        <>
            {auth ? props.children : null}
        </>
    )
}
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export function Editar(props) {
    const id = props.location.pathname.split('/').slice(4,5).join('/');
    return (
        <h1 className='home'>
            Editar {id}
        </h1>
    )
}

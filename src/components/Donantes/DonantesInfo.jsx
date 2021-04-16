import { Typography } from '@material-ui/core'
import React from 'react'
import { DateParser } from '../Utils/DateParser'

export const DonantesInfo = (props) => {
    return (
        <div>
        <Typography variant="h4">{props.donante.nombre+" "+props.donante.apellido}</Typography>
        <div>
          <Typography variant="h6">{"Tipo de sangre: " + props.donante.tipoDeSangre}</Typography>
          <Typography variant="h6">{"DNI: " + props.donante.dni}</Typography>
          <Typography variant="h6">{"Fecha de nacimiento: " + DateParser(props.donante.fechaNac)}</Typography>
          <Typography variant="h6">{"Domicilio: " + props.donante.domicilio}</Typography>
          <Typography variant="h6">{"Localidad: " + props.donante.localidad}</Typography>
          <Typography variant="h6">{"Domicilio del DNI: " + props.donante.domicilioDNI}</Typography>
          <Typography variant="h6">{"Localidad del DNI: " + props.donante.localidadDNI}</Typography>
          <Typography variant="h6">{"Teléfono: " + props.donante.telefono}</Typography>
          <Typography variant="h6">{"Código postal: " + props.donante.codPostal}</Typography>
          <Typography variant="h6">{"Mail: " + props.donante.mail}</Typography>
          <Typography variant="h6">{"Lugar de nacimiento: " + props.donante.lugarNac}</Typography>
          <Typography variant="h6">{"Ocupación: " + props.donante.ocupacion}</Typography>
        </div>
      </div>
    )
}
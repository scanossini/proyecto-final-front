import React from 'react';
import { Card, CardContent, Typography, CardActions, IconButton, Tooltip} from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

export const CustomerCard = (props) => {
    const classes = useStyles();

    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography>{"Hospital: "+ props.solicitud.hospital}</Typography>
            </CardContent>
            <CardActions>
                <Tooltip title="Editar solicitud" aria-label="Editar solicitud" arrow>
                    <IconButton>
                            <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar solicitud" aria-label="Eliminar solicitud" arrow>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    )
}
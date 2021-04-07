import React from 'react'
import { Container, Grid, Card, CardContent} from '@material-ui/core'

export const NoPermission = () => {
    return(
        <Container>
            <Grid container className="mt-3">
                <Grid item xs={9} sm={6}>
                    <Card variant="outlined">
                        <CardContent>
                            Esto solo puede ser accedido por el administrador general
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
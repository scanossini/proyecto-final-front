import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../pages/Home'
import { Donantes } from '../pages/Donantes'
import { Parametros } from '../pages/Parametros'
import { Solicitudes } from '../pages/Solicitudes'
import { Edit } from '../pages/Edit'
import Navbar from '../components/Navbar/NavBar';
import { SolicitudForm } from '../components/Solicitudes/SolicitudForm';

function AuthRoutes(){

    return (
        <>
            <Navbar />
            <Switch>
                    <Route exact path='/admin' component={Home} />
                    <Route exact path='/admin/donantes' component={Donantes} />
                    <Route exact path='/admin/parametros' component={Parametros} />
                    <Route exact path='/admin/solicitudes' component={Solicitudes} />
                    <Route exact path='/admin/edit' component={Edit} />
                    <Route exact path='/admin/solicitudes/crear' component={SolicitudForm}/>
            </Switch>
        </>
    )
}

export default AuthRoutes;
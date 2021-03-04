import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../pages/Home'
import { Donantes } from '../pages/Donantes'
import { Parametros } from '../pages/Parametros'
import { Solicitudes } from '../pages/Solicitudes'
import { Editar } from '../pages/Editar'
import Navbar from '../components/Navbar/NavBar';
import { SolicitudForm } from '../components/Solicitudes/SolicitudForm';
import { Hospitales } from '../pages/Hospitales';
import { HospitalesForm } from '../components/Hospitales/HospitalesForm';
import { LogOut } from '../components/AuthComponents/LogOut';
import { BancoDeSangre } from '../components/BancoDeSangre/BancoDeSangre';

function AuthRoutes(){

    return (
        <>
            <Navbar />
            <Switch>
                    <Route exact path='/admin' component={Home} />
                    <Route exact path='/admin/donantes' component={Donantes} />
                    <Route exact path='/admin/parametros' component={Parametros} />
                    <Route exact path='/admin/solicitudes' component={Solicitudes} />
                    <Route exact path='/admin/solicitudes/crear' component={SolicitudForm}/>
                    <Route exact path='/admin/solicitudes/editar/:id' component={Editar}/>
                    <Route exact path='/admin/hospitales/' component={Hospitales}/>
                    <Route exact path='/admin/hospitales/crear' component={HospitalesForm}/>
                    <Route exact path='/admin/logout' component={LogOut}/>
                    <Route exact path='/admin/donantes/:id' component={BancoDeSangre}/>
            </Switch>
        </>
    )
}

export default AuthRoutes;
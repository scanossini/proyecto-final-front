import React from 'react';
import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import { Home } from '../pages/Home'
import { Donantes } from '../pages/Donantes'
import { Parametros } from '../pages/Parametros'
import { Solicitudes } from '../pages/Solicitudes'
import { Edit } from '../pages/Edit'

function AuthRoutes(){

    return (
        <Switch>
            <Router>
                <Route exact path='/' component={Home} />
                <Route exact path='/donantes' component={Donantes} />
                <Route exact path='/parametros' component={Parametros} />
                <Route exact path='/solicitudes' component={Solicitudes} />
                <Route exact path='/edit' component={Edit} />
            </Router>
        </Switch>
    )
}

export default withRouter(AuthRoutes);
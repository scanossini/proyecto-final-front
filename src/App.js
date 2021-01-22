import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { LogIn } from './components/AuthComponents/LogIn';
import LogOut from './components/AuthComponents/LogOut'
import Navbar from './components/Navbar/NavBar'
import Home from './pages/Home'
import { Donantes } from './pages/Donantes/Donantes'
import Parametros from './pages/Parametros'
import { Solicitudes } from './pages/Solicitudes';

const App = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/login' component={LogIn}/>
                    <Route path='/donantes' component={Donantes} />
                    <Route path='/parametros' component={Parametros} />
                    <Route path='/solicitudes' component={Solicitudes} />
                    <Route path='/logout' component={LogOut} />
                </Switch>
            </Router>
        </div> 
    );
}

export default App;
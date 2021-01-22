import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home'
import Donantes from './pages/Donantes'

const App = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/donantes' component={Donantes} />
                </Switch>
            </Router>
        </div> 
    );
}

export default App;
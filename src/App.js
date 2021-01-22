import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { LogIn } from './components/AuthComponents/LogIn';
import Navbar from './components/NavBar';
import Home from './pages/Home'
import Donantes from './pages/Donantes'

const App = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route exact path="/login" component={LogIn}/>
                    <Route path='/donantes' component={Donantes} />
                </Switch>
            </Router>
        </div> 
    );
}

export default App;
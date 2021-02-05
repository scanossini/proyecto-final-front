import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { LogIn } from './components/AuthComponents/LogIn';
import Navbar from './components/Navbar/NavBar'
import { Auth } from './Middleware/Auth';
import AuthRoutes from './Middleware/AuthRoutes'

const App = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/login' component={LogIn} />
                    <Auth>
                        <Route path="/" component={AuthRoutes} />
                    </Auth>
                </Switch>
            </Router>
        </div> 
    );
}

export default App;
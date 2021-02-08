import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { LogIn } from './components/AuthComponents/LogIn';
import { Auth } from './Middleware/Auth';
import AuthRoutes from './Middleware/AuthRoutes'

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path='/' component={LogIn} />
                    <Auth>
                        <Route path="/admin" component={AuthRoutes} />
                    </Auth>
                </Switch>
            </Router>
        </div> 
    );
}

export default App;
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { LogIn } from './components/AuthComponents/LogIn';
import { Auth } from './Middleware/Auth';
import AuthRoutes from './Middleware/AuthRoutes'

const App = () => {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
            vertical: "top",
            horizontal: "right",
            }}
        >
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
        </SnackbarProvider>
    );
}

export default App;
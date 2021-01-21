import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { LogIn } from './components/AuthComponents/LogIn';

const App = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={LogIn}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
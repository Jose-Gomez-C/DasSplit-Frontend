import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {LogIn} from './pages/login/LogIn';
import {Register} from './pages/register/Register';
import {Dashboard} from './pages/dashboard/Dashboard';
import {NewAccount} from "./pages/newAccount/NewAccount";
import {AuthProvider} from "./contexts/AuthContext";
import {PrivateRoute} from "./components/PrivateRoute";
import {DetailsAccount} from "./pages/detailsAccount/DetailsAccount";


function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route exact path="/" render={() => <LogIn/>}/>
                        <Route exact path="/register" render={() => <Register/>}/>
                        <PrivateRoute exact path="/detailsAccount" component= {DetailsAccount}/>
                        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                        <PrivateRoute exact path="/newAccount" component={NewAccount}/>
                    </Switch>
                </AuthProvider>
            </Router>
        </>
    );
}

export default App;
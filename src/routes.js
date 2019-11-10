import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Login ,
    Activate,
    Recovery,
    Main
} from "./pages";

const Routes = ({ auth }) => (
    <Router>
        <Switch>
            <Route path="/" exact>
                { auth.isLoggedIn ? <Redirect push  to="/main/establishments/" /> : <Login /> }
            </Route>
            <Route path="/activate/:token" exact component={ Activate } />
            <Route path="/recovery" exact component={ Recovery } />
            <PrivateRoute  path='/main' isLoggedIn={ auth.isLoggedIn } component={ Main }  />
        </Switch>
    </Router>
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Routes);


const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route { ...rest } render={(props) => (
            isLoggedIn
            ? <Component { ...props } />
            : <Redirect to="/" />
    )} />
)
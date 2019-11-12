import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Login ,
    Activate,
    Recovery,
    Register,
    Reset,
    Main,
    NotFound
} from "./pages";

const Routes = ({ auth }) => (
    <Router>
        <Switch>
            <Route path="/" exact>
                { auth.isLoggedIn ? <Redirect push  to="/main/establishments/" /> : <Login /> }
            </Route>
            <Route path="/activate/:transientToken" exact component={ Activate } />
            <Route path="/reset/:transientToken" exact component={ Reset } />
            <Route path="/recovery" exact component={ Recovery } />
            <Route path="/register" exact component={ Register } />
            <PrivateRoute  path='/main' isLoggedIn={ auth.isLoggedIn } component={ Main }  />
            <Route path="*" component={NotFound}/>
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
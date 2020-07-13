import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';
import Dashboard from './Dashboard';
import Login from './pages/Login/Login';

const DashboardRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props =>
                Cookie.get('token') ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

class App extends React.Component {
    render() {
        return (
        <Router>
            <Switch>
                <Redirect exact from='/' to='/dashboard' />
                <DashboardRoute path='/dashboard' component={ Dashboard } />
                <Route path='/login' component={ Login } />
            </Switch>
        </Router>
        ) 
    }
}

export default App;
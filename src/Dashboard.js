import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './style/style.css'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ErrorLogs from './pages/ErrorLogs/ErrorLogs';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DrawerForClick from './DrawerForClick';
import AppInstance from './pages/AppInstance/AppInstance';
import Inbox from './pages/Inbox';
import Archive from './pages/Archive';
import Processing from './pages/Processing';
import FindById from './pages/FindById';
import All from './pages/All';
import OnlyExample from './pages/onlyExample';
import { Grid } from '@material-ui/core';


// function Copyright() {
//     /*return (
//       <Typography variant="body2" color="textSecondary" align="center">
//         {'Copyright © '}
//         <Link color="inherit">
//           Central logger
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//     );*/
//     return null;
//   }

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed

    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        maxWidth: "initial",
        paddingRight: theme.spacing(0),
        paddingLeft: theme.spacing(0),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const NotFound = () => {
    return (
        <div>
            <h1>Page not found</h1>
            <a href='/dashboard'>Back to dashboard</a>
        </div>
    )
}

export default function Dashboard() {
    console.log('in Dashboard')

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Router>
                <DrawerForClick />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Switch>
                            <Redirect exact from='/' to='/dashboard/error-logs' />
                            <Route exact path='/dashboard' component={Home} />
                            <Route exact path='/dashboard/error-logs' component={() => <ErrorLogs />} />
                            <Route exact path='/dashboard/app-instance' component={AppInstance} />
                            <Route exact path='/dashboard/inbox' component={Inbox} />
                            <Route exact path='/dashboard/archive' component={Archive} />
                            <Route exact path='/dashboard/processing' component={Processing} />
                            <Route exact path='/dashboard/all' component={All} />
                            <Route exact path='/dashboard/findbyid' component={FindById} />
                            <Route exact path='/dashboard/onlyexample' component={OnlyExample} />
                            <Route exact path='/login' component={Login} />
                            <Route component={NotFound} />
                        </Switch>
                    </Container>
                </main>
            </Router>
        </div>
    );
}

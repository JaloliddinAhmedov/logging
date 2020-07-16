import React from 'react';
import timeAction from './actions/timeAction';
import timeFromAction from './actions/timeFromAction';
import timeToAction from './actions/timeToAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Drawer from '@material-ui/core/Drawer';
import './style/style.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DateFnsUtils from "@date-io/date-fns";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Notification from './pages/ErrorLogs/Notification';
import { mainListItems } from './dashboardComponents/listItems';
import { makeStyles } from '@material-ui/core/styles';
import Cookie from 'js-cookie';
import { Grid, NativeSelect, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';

const drawerWidth = 240;

class DashboardForClick extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open : false,
            timeFrom: new Date(),
            timeTo: new Date()
        }
    }

    logOut = () => {
        console.log('im callin');
        Cookie.remove('cookies');
        window.location = '/';
    };

    toggleDrawer = (side, opened) => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        this.setState({
            open : opened
        })
    };

    render() {
        {console.log('in drawer for click')}

        const classes = makeStyles(theme => ({
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

        return (
            <div>
                <AppBar position="absolute" className="">
                    <Toolbar className={classes.toolbar}>
                        <Grid container>
                            <Grid item xs={1}>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={this.toggleDrawer("left", true)}
                                // className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={0}>
                                    <Grid item xs={6}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2} align="center">
                                                <p>From</p>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDateTimePicker
                                                        value={this.state.timeFrom}
                                                        onChange={date => {
                                                            this.props.timeAction({
                                                                timeTo: this.state.timeTo,
                                                                timeFrom: date
                                                            });
                                                            this.setState({
                                                                timeFrom : date
                                                            });
                                                            this.props.timeFromAction(date);
                                                            // console.log('date mi ', date.getTime());
                                                            // setSelectFromTime(date);
                                                            // setFullData([]);
                                                            // setMainData([]);
                                                            // handleRequest(date, selectToTime);
                                                        }}
                                                        ampm={false}
                                                        // label="From"
                                                        onError={console.log}
                                                        minDate={new Date("1018-01-01T00:00")}
                                                        format="yyyy/MM/dd hh:mm"
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2} align="center">
                                                <p>To</p>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDateTimePicker
                                                        value={this.state.timeTo}
                                                        onChange={date => {
                                                            this.props.timeToAction(date);
                                                            this.props.timeAction({
                                                                timeTo:date,
                                                                timeFrom:this.state.timeFrom
                                                            });
                                                            this.setState({
                                                                timeTo : date
                                                            });
                                                            // setSelectToTime(date);
                                                            // handleRequest();
                                                        }}
                                                        ampm={false}
                                                        // label="To"
                                                        onError={console.log}
                                                        minDate={new Date("2018-01-01T00:00")}
                                                        format="yyyy/MM/dd hh:mm"
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2}>
                                <NativeSelect
                                    value='All'
                                    className='selector'
                                >
                                    <option value={''} >Select</option>
                                    <option value={'All'}>All</option>
                                    <option value={'log_level_label'}>log_level_label</option>
                                    <option value={'message_short'}>message_short</option>
                                    <option value={'em_code'}>em_code</option>
                                    <option value={'app_client_type_id'}>app_client_type_id</option>
                                    <option value={'created_ts_hr'}>created_ts_hr</option>
                                    <option value={'threat_level'}>threat_level</option>
                                    <option value={'subdomain_code'}>subdomain_code</option>
                                    <option value={'src_host'}>src_host</option>
                                    <option value={'dst_host'}>dst_host</option>
                                    <option value={'id'}>id</option>
                                    <option value={'chain_id'}>chain_id</option>
                                    <option value={'user_id'}>user_id</option>
                                    <option value={'app_instance_id'}>app_instance_id</option>
                                </NativeSelect>


                            </Grid>
                            <Grid item xs={2}>
                                <TextField placeholder="Search" />
                            </Grid>

                            <Grid item xs={1}>
                                <Grid container spacing={0}>
                                    <Grid item xs={6}>
                                        <Notification />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <IconButton color="inherit" onClick={this.logOut}>
                                            <ExitToAppIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.open} onClick={this.toggleDrawer("left", false)}>
                    {mainListItems}
                </Drawer>
            </div>
        )
    }
} 

function mapStateToProps(state) {
    return { timeFrom: state.timeFrom,
             timeTo: state.timeTo
     };
  }
  
  function mapDispatchToProps(dispatch) {  
    return bindActionCreators({
    timeAction : timeAction,
    timeFromAction: timeFromAction,
    timeToAction: timeToAction
  }, dispatch);}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(DashboardForClick);
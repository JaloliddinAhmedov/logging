import React from 'react';
import MaterialTable from 'material-table';
import '../../style/style.css'
import axios from 'axios';
import Cookie from 'js-cookie'
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class AppInstance extends React.Component {
    constructor(props) {
        super(props);
        var myDate = new Date();
        myDate.setTime(myDate.getTime() - ((24 * 60 * 60 * 1000) * 7));

        this.state = {
            data: [],
            data2: [],
            selectedDate: new Date(),
            selectedOldDate: myDate,
        }

        this.handleRequest();
    }

    handleDateChange = (date) => {
        this.setState({
            selectedDate: date
        }, () => {
            this.handleRequest()
        })
    }

    handleOldDateChange = (date) => {
        this.setState({
            selectedOldDate: date
        }, () => {
            this.handleRequest()
        })
    }

    handleRequest = () => {
        axios.post('https://logger-api.antexpert.uz/app_instance_count', {
            "payload": [
                {
                    "time_from": this.state.selectedOldDate.getTime(),
                    "time_to": this.state.selectedDate.getTime()
                }
            ]
        }
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': 'Bearer ' + Cookie.get('cookies')
                }

            }).then(r => {
                this.setState({
                    data: r.data.payload
                })
            }).catch(err => {
                console.error(err);
                if (err.response) {
                    if (err.response.status === 401) {
                        window.location = '/login';
                        Cookie.remove('cookies');
                    }
                }
            })

        axios.post('https://logger-api.antexpert.uz/app_hardware_id_count', {
            "payload": [
                {
                    "time_from": this.state.selectedOldDate.getTime(),
                    "time_to": this.state.selectedDate.getTime()
                }
            ]
        }
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': 'Bearer ' + Cookie.get('cookies')
                }

            }).then(r => {
                this.setState({
                    data2: r.data.payload
                })
            }).catch(err => {
                console.error(err);
                if (err.response) {
                    if (err.response.status === 401) {
                        window.location = '/login';
                        Cookie.remove('cookies');
                    }
                }
            })
    }

    render() {
        const classes = makeStyles(theme => ({
            root: {
                flexGrow: 1,
            },
            paper: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },
        }));
        return (
            <div>
                <div className={classes.root}>
                    <Grid container spacing={3} className="app_instance">
                        <Grid item xs className="app_instance2">
                            <Paper className={classes.paper}>
                            <Grid container spacing={1}>
                            <Grid item xs={2} align="center">
                                <p>From</p>
                                </Grid>
                                <Grid item xs={10}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDateTimePicker
                                        value={this.state.selectedOldDate}
                                        onChange={this.handleOldDateChange}
                                        ampm={false}
                                        // label="From Time (default a week ago)"
                                        onError={console.log}
                                        minDate={new Date("2018-01-01T00:00")}
                                        format="yyyy/MM/dd hh:mm"
                                    />
                                </MuiPickersUtilsProvider>
                                </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs className="app_instance2">
                            <Paper className={classes.paper}>
                            <Grid container spacing={1}>
                            <Grid item xs={2} align="center">
                                <p>To</p>
                                </Grid>
                                <Grid item xs={10}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDateTimePicker
                                        value={this.state.selectedDate}
                                        onChange={this.handleDateChange}
                                        ampm={false}
                                        // label="Until Time (default now)"
                                        onError={console.log}
                                        minDate={new Date("2018-01-01T00:00")}
                                        format="yyyy/MM/dd hh:mm"
                                    />
                                </MuiPickersUtilsProvider>
                                </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <div className='app_instance'>
                    <div className={classes.root}>
                        {/* --------------------------------------------------------------------------------------------- */}
                        <Grid container spacing={1} justify="space-between" alignItems="flex-start">
                            
                            <Grid item xs={12} sm={6}>
                                <MaterialTable
                                    title="App Instance"
                                    options={{
                                        paging: false,
                                        search: false
                                    }}
                                    columns={[
                                        { title: 'app_version', field: 'app_version' },
                                        { title: 'app_client_type_id', field: 'app_client_type_id' },
                                        { title: 'app_instance_id_count', field: 'app_instance_id_count' },
                                    ]}
                                    data={this.state.data}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MaterialTable
                                    title="App Hardware"
                                    options={{
                                        paging: false,
                                        search: false
                                    }}
                                    columns={[
                                        { title: 'app_version', field: 'app_version' },
                                        { title: 'app_client_type_id', field: 'app_client_type_id' },
                                        { title: 'hardware_id_count', field: 'hardware_id_count' },
                                    ]}
                                    data={this.state.data2}
                                />
                            </Grid>
                            
                        </Grid>
                        {/* --------------------------------------------------------------------------------------------------------- */}
                    </div>
                </div>

            </div>
        )
    }
}

export default AppInstance;
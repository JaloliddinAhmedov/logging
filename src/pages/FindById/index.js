import React from 'react';
import '../../style/style.css'
import axios from 'axios';
import Cookie from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import SubTable from '../ErrorLogs/Subtable';
import { Button, Input } from '@material-ui/core';

class FindById extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            idforreq: null,
            error_message: null
        }
        console.log('in constructor of errorlogs')
    }

    onchangeHandler = event => {
        this.setState({
            idforreq: event.target.value
        });
    }

    onClickHandler = event => {
        axios.post('https://logger-api.antexpert.uz/find_by_id', {
            "meta": {
            },
            "payload": [
                {
                    "id": this.state.idforreq
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': 'Bearer ' + Cookie.get('cookies')
            }

        }).then(r => {
            if (r.data.payload[0]) {
                this.setState({
                    data: r.data.payload[0]
                })
            } else {
                this.setState({
                    error_message: 'Not Found'
                })
            }


        }).catch(err => {
            console.error(err);
            console.log(err.response.data.meta.message);
            console.log(err.response.status);


            if (err.response) {
                if (err.response.status === 401) {
                    window.location = '/login';
                    Cookie.remove('cookies');
                } else if (err.response.status === 500) {
                    console.log('in in in');

                    this.setState({
                        error_message: err.response.data.meta.message
                    }, () => { console.log(this.state.error_message); })
                }
            }
        })
    }

    handleInboxPostClick = () => {

        axios.post('https://logger-api.antexpert.uz/change_status', {
            "payload": [
                {
                    "ids": [this.state.data.id]
                    ,
                    "status_id": 3
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': 'Bearer ' + Cookie.get('cookies')
            }

        }).then(r => {
            console.log('r in inbox', r);

            if (r.status === 200) {
                alert('sucsessfully posted');    
            }
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

    handleArchivePostClick = () => {

        axios.post('https://logger-api.antexpert.uz/change_status', {
            "payload": [
                {
                    "ids": [this.state.data.id]
                    ,
                    "status_id": 4
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': 'Bearer ' + Cookie.get('cookies')
            }

        }).then(r => {
            console.log('r in inbox', r);

            if (r.status === 200) {
                    alert('sucsessfully posted');    
            }
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

    handleProcessingPostClick = () => {

        axios.post('https://logger-api.antexpert.uz/change_status', {
            "payload": [
                {
                    "ids": [this.state.data.id]
                    ,
                    "status_id": 5
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': 'Bearer ' + Cookie.get('cookies')
            }

        }).then(r => {
            console.log('r in inbox', r);

            if (r.status === 200) {
                alert('sucsessfully posted');    
            }
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
        console.log('props.datas', this.state.data);
        console.log('in render of FindById');


        const classes = makeStyles(theme => ({
            root: {
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
                flex: 1,
            },
            paper: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },
            input: {
                margin: theme.spacing(1),
            },
        }));
        console.log('errormes', this.state.error_message)
        return (


            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={3}  justify="space-around" alignItems="flex-start">

                                <Grid item xs={3}>
                                    <Paper className={classes.paper}>
                                        <Input
                                            placeholder='Id to find'
                                            className={classes.input}
                                            onChange={this.onchangeHandler}
                                            inputProps={{
                                                'aria-label': 'description',
                                            }}
                                        />
                                        <Button variant="contained" color="primary" onClick={this.onClickHandler}>Find</Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={9}>
                                {this.state.data
                                    ?(
                                        
                                    <Grid container spacing={1} direction="row" justify="center" alignItems="center">
                                        
                                            <Button variant="contained" onClick={this.handleInboxPostClick} color="primary">Inb</Button>
                                        
                                            <Button variant="contained" onClick={this.handleArchivePostClick} color="secondary">Arc</Button>
                                        
                                            <Button variant="contained" onClick={this.handleProcessingPostClick} color="primary">Pro</Button>
                                        
                                    </Grid>
                               
                                    )
                                    :null
                                }
                                 </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {this.state.data
                                ? (<SubTable currentData={this.state.data} />)
                                : <p>{this.state.error_message}</p>
                            }
                        </Paper>
                    </Grid>
                </Grid>


            </div>
        )
    }
}


export default FindById;
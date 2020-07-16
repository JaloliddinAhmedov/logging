import React from 'react';
import '../../style/style.css'
import { connect } from 'react-redux';
import Cookie from 'js-cookie';
import axios from 'axios';

import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import SubTable from './Subtable';
import { bindActionCreators } from 'redux'
import dataAction from '../../actions/dataAction';

class MaterialTableDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentData: null
    }
    
    console.log('in constructor of errorlogs')
  }

  componentWillMount () {

    axios.post('https://logger-api.antexpert.uz/find_by_last_limit', {
      "meta": {
      },
      "payload": [
        {
          "limit": 2000
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': 'Bearer ' + Cookie.get('cookies')
      }

    }).then(r => {
      this.props.dataAction(r.data.payload)
      console.log(r);

    }).catch(err => {
      console.error(err);
      if (err.response) {
        if (err.response.status === 401) {

          Cookie.remove('cookies');
          console.log('in axios error of App Component');

        }
      }
    })
  }

 

  handleClick = async (event, id, something) => {
    this.setState({
      currentData: null
    });

    this.setState({
      currentData: id,
    }, () => { console.log('clicked row data', this.state.currentData) })

    //  event.target.style.backgroundColor = '#b0b0b0';
  }

  render() {
    // console.log('props.datas', this.props.datas);
    console.log('in render of errorlogs');


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
      table: {
        minWidth: 650,
      },
    }));

    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs>
            <Paper className={classes.paper}>
              {this.props.datas
                ? (
                  <MaterialTable
                    title=""
                    onRowClick={this.handleClick}
                    columns={[
                      { title: 'lvl', field: 'log_level' },
                      { title: 'message', field: 'message_short' },
                      { title: 'stack_trace', field: 'stack_trace_short' },
                      { title: 'emc', field: 'em_code' },
                      { title: 'act', field: 'app_client_type_id' },
                      { title: 'c_ts_hr', field: 'created_ts_hr', cellStyle: { fontSize: '0.7em' } },
                      { title: 't_lvl', field: 'threat_level' },
                      { title: 's_code', field: 'subdomain_code' },
                      { title: 'src_host', field: 'src_host' },
                      { title: 'dst_host', field: 'dst_host' },
                      { title: 'id', field: 'id', cellStyle: { fontSize: '0.0001px', maxWidth: '0.5px' } },
                      { title: 'ch', field: 'chain_id', cellStyle: { fontSize: '0.0001px' } },
                      { title: 'u', field: 'user_id', cellStyle: { fontSize: '0.0001px' } },
                      { title: 'ai', field: 'app_instance_id', cellStyle: { fontSize: '0.0001px', padding: '0.5px' } }
                    ]}
                    data={this.props.datas}
                  />
                )
                : null
              }
            </Paper>
          </Grid>
        </Grid>

        {this.state.currentData
          ? (<SubTable currentData={this.state.currentData} />)
          : (null)
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { datas: state.datas };
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
  dataAction : dataAction
}, dispatch);}


export default connect(mapStateToProps,mapDispatchToProps)(MaterialTableDemo);
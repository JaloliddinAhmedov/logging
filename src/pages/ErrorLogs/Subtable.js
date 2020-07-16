import React from 'react';
import '../../style/style.css'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class SubTable extends React.Component {

  render() {
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
      <div className='subtable'>
        {this.props.currentData
          ? (
            <div className='subtable'>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <div className="MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters"><div className=""><h6 className="MuiTypography-root MuiTypography-h6">Message</h6></div><div className=""></div><div className=""><div><div><span></span></div></div></div></div>
                  <p className='wrapping'>{this.props.currentData.message}</p>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Paper className={classes.paper}>
                  <div className="MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters"><div className=""><h6 className="MuiTypography-root MuiTypography-h6">Params</h6></div><div className=""></div><div className=""><div><div><span></span></div></div></div></div>
                    {this.props.currentData.params
                      ?(
                      // -----------------------------------------------------------------------------------------
                      <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      {Object.entries(this.props.currentData.params).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell align="left">{key}</TableCell>
                          <TableCell align="left">{value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                        // ----------------------------------------------------------------------------------
                        )
                      :null}
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Paper className={classes.paper}>
                  <div className="MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters"><div className=""><h6 className="MuiTypography-root MuiTypography-h6">Environment</h6></div><div className=""></div><div className=""><div><div><span></span></div></div></div></div>
                    {this.props.currentData.environment
                    ?
                    // ----------------------------------------------------------------------------------------------------------------
                    <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      {Object.entries(this.props.currentData.environment).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell align="left">{key}</TableCell>
                          <TableCell align="left">{value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                      // -------------------------------------------------------------------------------------------------------------------------------------
                    :null}
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Paper className={classes.root}>
                    <div className="MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters"><div className=""><h6 className="MuiTypography-root MuiTypography-h6">Details</h6></div><div className=""></div><div className=""><div><div><span></span></div></div></div></div>
                    <Table className={classes.table}>
                      <TableBody >
                        <TableRow >
                          <TableCell component="th" scope="row">id</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.id
                              ? this.props.currentData.id
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">user_id</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            (!!this.props.currentData.user_id)
                              ? this.props.currentData.user_id
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">app_client_type_id</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            (this.props.currentData.app_client_type_id)
                              ? this.props.currentData.app_client_type_id
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">app_instance_id</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.app_instance_id
                              ? this.props.currentData.app_instance_id
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">chain_id</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.chain_id
                              ? this.props.currentData.chain_id
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">type_id</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.type_id
                              ? this.props.currentData.type_id
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">created_ts_hr</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.created_ts_hr
                              ? this.props.currentData.created_ts_hr
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">dst_host</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.dst_host
                              ? this.props.currentData.dst_host
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">em_code</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.em_code
                              ? this.props.currentData.em_code
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">last_mod_ts_hr</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.last_mod_ts_hr
                              ? this.props.currentData.last_mod_ts_hr
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">log_level</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.log_level
                              ? this.props.currentData.log_level
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">log_level_label</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.log_level_label
                              ? this.props.currentData.log_level_label
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">log_ts_hr</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.log_ts_hr
                              ? this.props.currentData.log_ts_hr
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">src_host</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.src_host
                              ? this.props.currentData.src_host
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">subdomain_code</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.subdomain_code
                              ? this.props.currentData.subdomain_code
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">threat_level</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.threat_level
                              ? this.props.currentData.threat_level
                              : " "
                          } /></TableCell>
                        </TableRow>
                        <TableRow >
                          <TableCell component="th" scope="row">user_role_type_ids</TableCell>
                          <TableCell align="right"><input className="inboxPad" onChange={() => { }} type="text" name="LastName" value={
                            this.props.currentData.user_role_type_ids
                              ? this.props.currentData.user_role_type_ids
                              : " "
                          } /></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <div className='wrapping'>
                    <hr />
                    <div className="MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters"><div className=""><h6 className="MuiTypography-root MuiTypography-h6">Stack Trace</h6></div><div className=""></div><div className=""><div><div><span></span></div></div></div></div>

                    {this.props.currentData.stack_trace}
                  </div>
                </Grid>
              </Grid>
            </div>
          )
          : null
        }
      </div>
    )
  }
}

export default SubTable;
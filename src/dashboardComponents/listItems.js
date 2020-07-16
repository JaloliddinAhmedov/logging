import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { Link } from "react-router-dom";
import '../style/style.css'

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

export const mainListItems = (
  <React.Fragment>
    <ListItem button component={AdapterLink} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={AdapterLink} to="/dashboard/error-logs">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Error logs" />
    </ListItem>
    <ListItem button component={AdapterLink} to="/dashboard/app-instance">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="App Instance" />
    </ListItem>
    <ListItem button component={AdapterLink} to="/dashboard/inbox">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItem>
    <ListItem button component={AdapterLink} to="/dashboard/archive">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Archive" />
    </ListItem>
    <ListItem  button component={AdapterLink} to="/dashboard/processing">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Processing" />
    </ListItem>
    <ListItem  button component={AdapterLink} to="/dashboard/all">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="All" />
    </ListItem>
    <ListItem  button component={AdapterLink} to="/dashboard/findbyid">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Find By Id" />
    </ListItem>
  </React.Fragment>
);
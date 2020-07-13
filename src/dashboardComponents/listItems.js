import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { Link, LinkProps } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

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
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Menu 3" />
    </ListItem>
  </React.Fragment>
);
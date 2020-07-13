import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function SimpleSnackbar(props) {
  const classes = useStyles();

  return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.isSnackbarOpen}
        autoHideDuration={3000}
        onClose={props.closeSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span id="message-id">Login or password is incorrect</span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={props.closeSnackbar}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
  );
}
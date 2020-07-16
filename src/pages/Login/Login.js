import axios from "axios";
import Cookie from 'js-cookie';

import PropTypes from 'prop-types';
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import LoginSnackbar from "./components/Snackbar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Central logger
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  close: {
    padding: theme.spacing(0.5),
  },
}));

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      isSubmitting: false,
      isSnackbarOpen: false,
      login: '',
      password: '',
    }

    if(Cookie.get('cookies')){
      window.location = '/dashboard';
    }
  }

  componentWillMount () {
    
  }

  openSnackbar = () => this.setState({ isSnackbarOpen: true });
  
  closeSnackbar = () => this.setState({ isSnackbarOpen: false })

  changeEventHandler = (e) => {
	  this.setState({ [e.target.name]: e.target.value })
  }

  authLogin = (e) => {
    e.preventDefault();
    console.log('go to server');
    console.log(this.state);
    this.setState({ isSubmitting: true })
    axios({
        url: 'https://logger-api.antexpert.uz/auth/login',
        method: 'POST',
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        },
        data: {
          "meta": {
          },
          "payload": [
            {
              "login": this.state.login,
              "password": this.state.password
            }
          ]
        }
    }).then((res) => {
        if(res.status === 200 && res.data.payload[0].token) {
            
            console.log(res);
            
            Cookie.set('cookies', res.data.payload[0].token);
            setTimeout(() => {
                window.location = '/dashboard/error-logs';
            }, 300);
            
          }
          this.setState({ isSubmitting: false })
    }).catch((err) => {
      this.setState({
        login: '',
        password: '',
        isSubmitting: false,
        isSnackbarOpen: true,
      })
    })
  }

  render() {
    const { isSubmitting, isSnackbarOpen, login, password } = this.state;
    const { classes } = this.props;
    
    return (
      <React.Fragment>
        <Container component="main" maxWidth="xs" style={{ marginTop: 100 }}>
          <CssBaseline />
          <div className={classes.paper}>
            <Card className={classes.card} style={{ textAlign: 'center' }}>
              <Fade in={isSubmitting}>
                <LinearProgress variant="query" />
              </Fade>
              <CardContent>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                  <form className={classes.form} onSubmit={this.authLogin}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="login"
                      label="Login"
                      name="login"
                      autoComplete="login"
                      autoFocus
                      onChange={this.changeEventHandler}
                      value={login}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.changeEventHandler}
                      value={password}
                    />
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Sign In
                    </Button>
                  </form>
              </CardContent>
            </Card>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
        <LoginSnackbar isSnackbarOpen={isSnackbarOpen} closeSnackbar={this.closeSnackbar} />
      </React.Fragment>
    );
  }
  
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(SignIn);
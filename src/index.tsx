import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import icon from './images/icon.png';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';

interface RequestOpts {
  method: string;
  body: string;
}

const useStyles = makeStyles({
  root: {
    textAlign: 'center'
  },
  textField: {
    minWidth: 200,
    minHeight: 60
  },
  button: {
    height: '75px',
    width: '300px'
  },
  logo: {
    height: '50px',
    marginRight: '8px'
  },
  alert: {
    width: '80%',
    margin: '0 auto',
    marginTop: '20px'
  }
});

const SupertypeButton = () => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [supertypeUsername, setSupertypeUsername] = useState('');
  const [supertypePassword, setSupertypePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailure, setLoginFailure] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFailure, setCreateFailure] = useState(false);
  const [newUser, setNewUser] = useState(false);

  const implement = async (
    supertypeUsername: string,
    supertypePassword: string
  ) => {
    const url =
      'https://z1lwetrbfe.execute-api.us-east-1.amazonaws.com/default/implement-supertype';

    const opts: RequestOpts = {
      method: 'POST',
      body: JSON.stringify({
        username: supertypeUsername,
        password: supertypePassword
      })
    };

    const result = await fetch(url, opts);
    const resultJson = await result.text();
    setDialogOpen(false);
    setLoading(false);
    if (result.status === 200) {
      setLoginSuccess(true);
      setTimeout(() => {
        setLoginSuccess(false);
      }, 5000);
      document.cookie = `supertypeID=${resultJson}`;
    } else {
      setLoginFailure(true);
      setTimeout(() => {
        setLoginFailure(false);
      }, 5000);
    }
  };

  const create = async (
    supertypeUsername: string,
    supertypePassword: string
  ) => {
    const url =
      'https://z1lwetrbfe.execute-api.us-east-1.amazonaws.com/default/create-supertype-user';

    const opts: RequestOpts = {
      method: 'POST',
      body: JSON.stringify({
        username: supertypeUsername,
        password: supertypePassword
      })
    };

    const result = await fetch(url, opts);
    // TODO return better success response, user's sid
    // const resultJson = await result.text();
    setDialogOpen(false);
    setLoading(false);
    if (result.status === 200) {
      setCreateSuccess(true);
      setTimeout(() => {
        setCreateSuccess(false);
      }, 5000);
    } else {
      setCreateFailure(true);
      setTimeout(() => {
        setCreateFailure(false);
      }, 5000);
    }
  };

  return (
    <div>
      <Button
        variant='outlined'
        onClick={() => setDialogOpen(true)}
        className={classes.button}
      >
        <img src={icon} className={classes.logo} />
        Implement Supertype
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby='form-dialog-title'
      >
        {!loading && (
          <div>
            {!newUser && (
              <div>
                <DialogTitle id='form-dialog-title'>
                  Implement Supertype
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Log in with your Supertype account to immediately pair this
                    device with all others.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='supertypeUsername'
                    label='Supertype Username'
                    type='text'
                    fullWidth
                    onChange={(e) => setSupertypeUsername(e.target.value)}
                  />
                  <TextField
                    autoFocus
                    margin='dense'
                    id='supertypePassword'
                    label='Supertype Password'
                    type='text'
                    fullWidth
                    onChange={(e) => setSupertypePassword(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDialogOpen(false)} color='primary'>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setLoading(true);
                      implement(supertypeUsername, supertypePassword);
                    }}
                    color='primary'
                  >
                    Implement
                  </Button>
                </DialogActions>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setNewUser(true);
                    }}
                    color='secondary'
                  >
                    Create an Account
                  </Button>
                </DialogActions>
              </div>
            )}
            {newUser && (
              <div>
                <DialogTitle id='form-dialog-title'>
                  Create a Supertype account
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Create a Supertype account. Pair devices once, and pair
                    devices everywhere. Supertype never stores passwords, or any
                    of your app data.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='supertypeUsername'
                    label='Create a username'
                    type='text'
                    fullWidth
                    onChange={(e) => setSupertypeUsername(e.target.value)}
                  />
                  <TextField
                    autoFocus
                    margin='dense'
                    id='supertypePassword'
                    label='Create a Password'
                    type='text'
                    fullWidth
                    onChange={(e) => setSupertypePassword(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDialogOpen(false)} color='primary'>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setLoading(true);
                      create(supertypeUsername, supertypePassword);
                    }}
                    color='primary'
                  >
                    Create Account
                  </Button>
                </DialogActions>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setNewUser(false);
                    }}
                    color='secondary'
                  >
                    Log in
                  </Button>
                </DialogActions>
              </div>
            )}
          </div>
        )}
        <div>
          {loading && (
            <div>
              <h2>Loading...</h2>
            </div>
          )}
        </div>
      </Dialog>
      <div className={classes.alert}>
        {loginSuccess && (
          <Alert severity='success'>Supertype implemented successfully.</Alert>
        )}
      </div>
      <div className={classes.alert}>
        {loginFailure && (
          <Alert severity='error'>Failed to login. Please try again</Alert>
        )}
      </div>
      <div className={classes.alert}>
        {createSuccess && (
          <Alert severity='success'>
            Supertype account created. Log in to continue.
          </Alert>
        )}
      </div>
      <div className={classes.alert}>
        {createFailure && (
          <Alert severity='error'>
            Failed to create Supertype account. Pick a different username and
            try again.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default SupertypeButton;

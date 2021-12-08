import { makeStyles } from '@mui/styles'
import { Paper, Button, TextField, RadioGroup, FormLabel, FormControl, FormControlLabel, Radio} from '@mui/material'
import React, { useState} from 'react'


const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'center',
  },
  userManagementRoot: {
    margin: 'auto',
    height: '60vh',
    minHeight: '50vh',
    paddingTop: 30,
  },
  userManagementPaper: {
    width: '500px',
    padding: theme.spacing(4),
  },

  userManagementRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '&:last-child': {
      paddingBottom: theme.spacing(0),
    },
    '&:first-child': {
      paddingTop: theme.spacing(0),
    },
  },
  submitButtons: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    color: 'secondary',
    alignItems: 'center',
    width: 1,
  },
  submitButton: {
    width: 1,
    textAlign: 'center',
    color: 'secondary',
  },
}))

const Customer = () => {
    const classes = useStyles()

    // registration
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rfidToken, setRfidToken] = useState('')

    const [setSubmitted] = useState(false)
    const [setError] = useState(false)

    //changing input once already entered
      const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
      };

      const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
      };

      const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
      };

      const handleRfidToken = (e) => {
        setRfidToken(e.target.value);
        setSubmitted(false);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
          if (username === '' || email === '' || password === '') {
            setError(true);
          } else {
            setSubmitted(true);
            setError(false);
          }
        };


    return (
      <div className={classes.container}>
        <h1>Create Users</h1>
        <h3>Please insert the necessary data about the users</h3>
        <div className={classes.userManagementRoot}>
          <Paper className={classes.userManagementPaper} component='form'>
          <FormControl component="fieldset">
            <FormLabel component="legend">User Type</FormLabel>
              <RadioGroup row aria-label="userType" name="row-radio-buttons-group">
                <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                <FormControlLabel value="dispatcher" control={<Radio />} label="Dispatcher" />
                <FormControlLabel value="deliverer" control={<Radio />} label="Deliverer" />
              </RadioGroup>
          </FormControl>
          <div className={classes.userManagementRow}>
            <TextField label='Username' variant='outlined' fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className={classes.userManagementRow}>
            <TextField label='Email' variant='outlined' fullWidth value={email} onChange={(e) => setEmail(e.target.value)} type='password' />
          </div>
          <div className={classes.userManagementRow}>
            <TextField label='RFID Token' variant='outlined' fullWidth value={rfidToken} onChange={(e) => setRfidToken(e.target.value)} type='password' />
          </div>
          <div className={classes.userManagementRow}>
            <TextField label='Password' variant='outlined' fullWidth value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
          </div>

          <div className={classes.userManagementRow + ' ' + classes.submitButtons}>
              <div>
                <Button className={classes.submitButton} variant='contained' color='primary' onClick={handleSubmit} type='submit'>
                  Submit
                </Button>
              </div>
            </div>
          </Paper>
          {(
            <div className='form-group'>
              <div className='alert alert-danger' role='alert'>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

export default Customer

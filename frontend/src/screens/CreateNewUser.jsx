import { makeStyles } from '@mui/styles'
import { Paper, Button, TextField, RadioGroup, FormLabel, FormControl, FormControlLabel, Radio } from '@mui/material'
import React, { useState } from 'react'
import DispatcherService from '../services/dispatcher.service'
import { useNavigate } from 'react-router-dom'

const reload=()=>window.location.reload();

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
    height: '90vh',
    minHeight: '50vh',
    paddingTop: 10,
  },
  userManagementPaper: {
    width: '500px',
    padding: theme.spacing(2),
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

const CreateNewUser = () => {
  const classes = useStyles()

  const navigate = useNavigate()

  // registration
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rfidToken, setRfidToken] = useState('')
  const [role, setRole] = useState([])

  const [setSubmitted] = useState(false)
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false)

  //changing input once already entered
  const handleUsername = (e) => {
    setUsername(e.target.value)
    setSubmitted(false)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
    setSubmitted(false)
  }

  const handleLastname = (e) => {
    setLastname(e.target.value)
    setSubmitted(false)
  }

  const handleFirstname = (e) => {
    setFirstname(e.target.value)
    setSubmitted(false)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setSubmitted(false)
  }

  const handleRfidToken = (e) => {
    setRfidToken(e.target.value)
    setSubmitted(false)
  }

  const handleAddress = (e) => {
    setAddress(e.target.value)
    setSubmitted(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log('bla bla ')
    setLoading(true)

    try {
      if (username === '' || email === '' || password === '' || role === '' || firstname === ''|| lastname === '') {
          setIsError(true)
          setLoading(false)
          setMessage('Please fill in first name, last name, username, email, password, and role');
        } else {
        const user = {
          username: username,
          password: password,
          email: email,
          firstName: firstname,
          lastName: lastname,
          rfidToken: rfidToken,
          address: address,
          role: role,
        }

        try {
          DispatcherService.registerNewUser(user)
              .then(() => {
                setIsError(false)
                setLoading(false)
                navigate('/dispatcher')
                reload()
              })
              .catch((error) => {
                setIsError(true)
                setMessage(error.message)
                setLoading(false)
                reload()
              })
        }
        catch (e) {
          console.error(e);
        }
      }
    }
    catch (e) {
      console.error(e);
      setLoading(false)
    }
  }
  //console.log(role)

  return (
    <div className={classes.container}>
      <h1>Create Users</h1>
      <div className={classes.userManagementRoot}>
        <Paper className={classes.userManagementPaper} component='form'>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>User Type</FormLabel>
            <RadioGroup
              row
              aria-label='userType'
              name='row-radio-buttons-group'
              onChange={(e) => {
                setRole([e.currentTarget.value])
              }}
            >
              <FormControlLabel value='customer' control={<Radio />} label='Customer' />
              <FormControlLabel value='dispatcher' control={<Radio />} label='Dispatcher' />
              <FormControlLabel value='deliverer' control={<Radio />} label='Deliverer' />
            </RadioGroup>
          </FormControl>
          <div className={classes.userManagementRow}>
            <TextField label='First name' variant='outlined' fullWidth value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          </div>
          <div className={classes.userManagementRow}>
            <TextField label='Last name' variant='outlined' fullWidth value={lastname} onChange={(e) => setLastname(e.target.value)} />
          </div>
          <div className={classes.userManagementRow}>
            <TextField label='Username' variant='outlined' fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className={classes.userManagementRow}>
            <TextField label='Email' variant='outlined' fullWidth value={email} onChange={(e) => setEmail(e.target.value)} type='Email' />
          </div>
          <div className={classes.userManagementRow}>
            <TextField label='Address' variant='outlined' fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          {!role.includes('dispatcher') ? (
            <div className={classes.userManagementRow}>
              <TextField label='RFID Token' variant='outlined' fullWidth value={rfidToken} onChange={(e) => setRfidToken(e.target.value)} type='text' />
            </div>
          ) : (
            <></>
          )}

          <div className={classes.userManagementRow}>
            <TextField label='Password' variant='outlined' fullWidth value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
          </div>

          <div className={classes.userManagementRow + ' ' + classes.submitButtons}>
            <div>
              <Button className={classes.submitButton} variant='contained' color='primary' onClick={handleSubmit} type='submit'>
                {loading ? 'Loading...' : 'Submit'}
              </Button>
            </div>
          </div>
        </Paper>
        {isError && (
            <div className='form-group'>
              <div className='alert alert-danger' role='alert'>
                {message}
              </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default CreateNewUser

import { makeStyles } from '@mui/styles'
import { Paper, Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../slices/auth'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userLoginRoot: {
    margin: 'auto',
    height: '70vh',
    minHeight: '50vh',
    paddingTop: 100,
  },
  loginPaper: {
    width: '300px',
    padding: theme.spacing(4),
  },
  loginRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '&:last-child': {
      paddingBottom: theme.spacing(0),
    },
    '&:first-child': {
      paddingTop: theme.spacing(0),
    },
  },
  loginButtons: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    color: 'secondary',
    alignItems: 'center',
    flex: 1,
  },
  loginButton: {
    flex: 1,
    textAlign: 'center',
    color: 'secondary',
  },
}))

const Signin = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { isLoggedIn, loading } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)

  const { user: currentUser } = useSelector((state) => state.auth)

  let isDispatcher = false
  let isDeliverer = false
  let isCustomer = false

  try {
    isDispatcher = currentUser.roles.includes('ROLE_DISPATCHER') && true
    isDeliverer = currentUser.roles.includes('ROLE_DELIVERER') && true
    isCustomer = currentUser.roles.includes('ROLE_CUSTOMER') && true
  } catch (error) {
    console.log(error)
  }

  const navigate = useNavigate()

  console.log(isCustomer,isDeliverer, isDispatcher)

  useEffect(() => {
    if (isLoggedIn) {
      if (isDispatcher) {
        navigate('/dispatcher')
      } else if (isDeliverer) {
        navigate('/deliverer')
      } else if (isCustomer) {
        navigate('/customer')
      }
    }
  }, [isLoggedIn,isDispatcher,isDeliverer,isCustomer, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(username, password, 'asdasd')
    dispatch(login({ username, password }))
  }

  return (
    <div className={classes.container}>
      <div className={classes.userLoginRoot}>
        <Paper className={classes.loginPaper} component='form'>
          <div className={classes.loginRow}>
            <TextField label='username' variant='outlined' fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className={classes.loginRow}>
            <TextField label='Password' variant='outlined' fullWidth value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
          </div>

          <div className={classes.loginRow + ' ' + classes.loginButtons}>
            <div>
              <Button className={classes.loginButton} variant='contained' color='primary' onClick={handleSubmit} type='submit' lo>
                {loading ? 'Loading...' : 'Login'}
              </Button>
            </div>
          </div>
        </Paper>
        {message && (
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

export default Signin

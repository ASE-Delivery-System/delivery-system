import { makeStyles } from '@mui/styles'
import { Paper, Button, TextField, RadioGroup, FormLabel, FormControl, FormControlLabel, Radio } from '@mui/material'
import React, { useState } from 'react'
import DispatcherService from '../services/dispatcher.service'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'center',
  },
  deliveryManagementRoot: {
    margin: 'auto',
    height: '50vh',
    minHeight: '30vh',
    paddingTop: 10,
  },
  deliveryManagementPaper: {
    width: '500px',
    padding: theme.spacing(2),
  },

  deliveryManagementRow: {
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

const CreateNewDelivery = () => {
  const classes = useStyles()

  const navigate = useNavigate()

  // registration
  const [targetBox, setTargetBox] = useState('')
  const [targetCustomer, setTargetCustomer] = useState('')
  const [deliverer, setDeliverer] = useState('')

  const [setSubmitted] = useState(false)
  const [setError] = useState(false)

  const [loading, setLoading] = useState(false)

  //changing input once already entered
  const handleTargetBox = (e) => {
    setTargetBox(e.target.value)
    setSubmitted(false)
  }

  const handleTargetCustomer = (e) => {
    setTargetCustomer(e.target.value)
    setSubmitted(false)
  }

  const handleDeliverer = (e) => {
    setDeliverer(e.target.value)
    setSubmitted(false)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('bla bla ')
    setLoading(true)

    if (targetBox === '' || targetCustomer === '' || deliverer === '') {
      setError(true)
    } else {
      const user = {
        targetBox: targetBox,
        targetCustomer: targetCustomer,
        deliverer: deliverer,
      }
    }
  }

  return (
    <div className={classes.container}>
      <h1>Create New Delivery</h1>
      <div className={classes.deliveryManagementRoot}>
        <Paper className={classes.deliveryManagementPaper} component='form'>
          <div className={classes.deliveryManagementRow}>
            <TextField label='Target Box' variant='outlined' fullWidth value={targetBox} onChange={(e) => setTargetBox(e.target.value)} />
          </div>
          <div className={classes.deliveryManagementRow}>
            <TextField label='Target Customer' variant='outlined' fullWidth value={targetCustomer} onChange={(e) => setTargetCustomer(e.target.value)} />
          </div>
          <div className={classes.deliveryManagementRow}>
            <TextField label='Deliverer' variant='outlined' fullWidth value={deliverer} onChange={(e) => setDeliverer(e.target.value)} />
          </div>
          <div className={classes.deliveryManagementRow + ' ' + classes.submitButtons}>
            <div>
              <Button className={classes.submitButton} variant='contained' color='primary' onClick={handleSubmit} type='submit'>
                {loading ? 'Loading...' : 'Submit'}
              </Button>
            </div>
          </div>
        </Paper>
        {
          <div className='form-group'>
            <div className='alert alert-danger' role='alert'></div>
          </div>
        }
      </div>
    </div>
  )
}

export default CreateNewDelivery

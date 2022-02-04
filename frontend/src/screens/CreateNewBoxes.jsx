import { makeStyles } from '@mui/styles'
import { Paper, Button, TextField, RadioGroup, FormLabel, FormControl, FormControlLabel, Radio } from '@mui/material'
import React, {useRef, useState} from 'react'
import DispatcherService from '../services/dispatcher.service'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import dispatcherService from "../services/dispatcher.service";

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

const CreateNewBoxes = () => {
  const classes = useStyles()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  // registration
  const [boxName, setBoxName] = useState('')
  const [boxAddress, setBoxAddress] = useState('')
  const [role, setRole] = useState([])

  const [setSubmitted] = useState(false)
  const [setError] = useState(false)

  //changing input once already entered
  const handleBoxName = (e) => {
    setBoxName(e.target.value)
    setSubmitted(false)
  }

  const handleBoxAddress = (e) => {
    setBoxAddress(e.target.value)
    setSubmitted(false)
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      console.log('bla bla ')
      setLoading(true)

      if (boxName === '' || boxAddress === '') {
        setError(true)
      } else {
        const box = {
          boxName: boxName,
          boxAddress: boxAddress,
        }

        DispatcherService.createNewBox(box)
          .then(() => {
            setLoading(false)
            navigate('/listboxes')
          })
          .catch((error) => {
            setLoading(false)
          })
      }
    }

  return (
    <div className={classes.container}>
      <h1>Create Users</h1>
      <div className={classes.userManagementRoot}>
        <Paper className={classes.userManagementPaper} component='form'>
          <div className={classes.userManagementRow}>
            <TextField label='Box name' variant='outlined' fullWidth value={boxName} onChange={(e) => setBoxName(e.target.value)} />
          </div>
          <div className={classes.userManagementRow}>
            <TextField label='Box address' variant='outlined' fullWidth value={boxAddress} onChange={(e) => setBoxAddress(e.target.value)} />
          </div>

          <div className={classes.userManagementRow + ' ' + classes.submitButtons}>
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

export default CreateNewBoxes

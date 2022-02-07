import { makeStyles } from '@mui/styles'
import {
  Paper,
  Button,
  TextField,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  Stack
} from '@mui/material'
import React, {useRef, useState} from 'react'
import DispatcherService from '../services/dispatcher.service'
import { useNavigate } from 'react-router-dom'
import MenuItem from "@mui/material/MenuItem";

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'center',
    padding: 120,
  },
  boxManagementRoot: {
    margin: 'auto',
    height: '30vh',
    minHeight: '30vh',
    paddingTop: 10,
  },
  boxManagementPaper: {
    width: '300px',
    padding: theme.spacing(2),
  },

  boxManagementRow: {
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
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [role, setRole] = useState([])

  const [setSubmitted] = useState(false)
  const [setError] = useState(false)

  //changing input once already entered
  const handleName = (e) => {
    setName(e.target.value)
    setSubmitted(false)
  }

  const handleAddress = (e) => {
    setAddress(e.target.value)
    setSubmitted(false)
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      setLoading(true)

      if (name === '' || address === '') {
        //setError(true)
      } else {
        const box = {
          name: name,
          address: address,
          status: "EMPTY"
        }

        DispatcherService.createNewBox(box)
          .then(() => {
            setLoading(false)
            navigate('/listboxes')
          })
          .catch((error) => {
            console.log('response: ', error.response.data)
            setLoading(false)
          })
      }
    }

  return (
    <div className={classes.container}>
      <h1>Create New Boxes </h1>
      <div >
        <Paper sx={{
          width: 'fit-content',
          padding: (1),}}>
          <Stack
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 500,
                width: 'fit-content',
                padding: (2),
              }}
              noValidate
              autoComplete="off"
              spacing={4}
          >
            <TextField label='Box name' variant='outlined' fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label='Box address' variant='outlined' fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
          </Stack>
          <Button className={classes.submitButton} variant='contained' color='primary' onClick={handleSubmit} type='submit'>
            {loading ? 'Loading...' : 'Submit'}
          </Button>
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

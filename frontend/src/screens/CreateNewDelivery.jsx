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

const CreateNewDelivery = () => {
  const classes = useStyles()

  const [loading, setLoading] = useState(false)


  const boxIdRef = useRef();
  const customerIdIdRef = useRef();
  const delivererIdRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const enteredBoxId = boxIdRef.current.value;
    const enteredCustomerId = customerIdIdRef.current.value;
    const enteredDelivererId = delivererIdRef.current.value;

    let delivery = null;

    delivery = {
      targetBoxId: enteredBoxId,
      customerId: enteredCustomerId,
      delivererId: enteredDelivererId,
      status: "IN_DEPOT"
    }
    console.log(delivery)
    console.log(JSON.stringify(delivery));

    try {
      dispatcherService.createNewDelivery(JSON.stringify(delivery));
      setLoading(false)
    }
    catch (e) {
      console.error(e)
    }
    /*fetch('https://ase-delivery-service.herokuapp.com/deliveries',
        {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(delivery)
        })
        .then(response => response.json())
        .then(data => console.log(data));;*/


  }
  return (
    <div className={classes.container}>
      <h1>Create New Delivery</h1>
      <div className={classes.deliveryManagementRoot}>
        <Paper className={classes.deliveryManagementPaper} component='form'>
          <div className={classes.deliveryManagementRow}>
            <TextField label='Target Box' variant='outlined' fullWidth inputRef={boxIdRef} />
          </div>
          <div className={classes.deliveryManagementRow}>
            <TextField label='Target Customer' variant='outlined' fullWidth inputRef={customerIdIdRef} />
          </div>
          <div className={classes.deliveryManagementRow}>
            <TextField label='Deliverer' variant='outlined' fullWidth inputRef={delivererIdRef} />
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

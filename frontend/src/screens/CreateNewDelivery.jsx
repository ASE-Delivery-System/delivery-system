import { makeStyles } from '@mui/styles'
import {
  Paper,
  Button,
  TextField,
  Stack
} from '@mui/material'
import React, {useEffect, useRef, useState} from 'react'
import dispatcherService from "../services/dispatcher.service";
import MenuItem from "@mui/material/MenuItem";
import DispatcherService from "../services/dispatcher.service";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'center',
    padding: 50,
  },
}))

function readBoxes(data) {
  let newRows = [];
  let name = "";
  let id = "";

  try {
    newRows = data.map( (item) => {
      id = item.id;
      name = item.name;

      return {
        value: id,
        label: name,
      }
    });
  }
  catch (e) {
    console.error(e);
  }

  return newRows;
}

function readUsers(data) {
  let newRows = [];
  let firstName = "";
  let lastName = "";
  let id = "";

  try {
    newRows = data.map( (item) => {
      id = item.id;
      firstName = item.firstName;
      lastName = item.lastName;

      return {
        value: id,
        label: firstName + ' ' + lastName,
      }
      //newRows.push(itemInfo)
    });
  }
  catch (e) {
    console.error(e);
  }

  return newRows;
}


const CreateNewDelivery = () => {
  let isDispatcher = false;

  try {
    const userData = JSON.parse(localStorage.getItem('user'));
    if(userData!=null && userData.roles.includes('ROLE_DISPATCHER')) {
      isDispatcher = true
      console.log(JSON.parse(localStorage.getItem('user')));
    }
  }
  catch (e) {
    console.error(e);
  }
  const classes = useStyles()

  const navigate = useNavigate()

  //const [setSubmitted] = useState(false)
  //const [setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [selectedBox, setSelectedBox] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedDeliverer, setSelectedDeliverer] = useState('');

  const [listBoxes, setListBoxes] = useState([])
  const [listCustomers, setListCustomers] = useState([])
  const [listDeliverers, setListDeliverers] = useState([])

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const handleChangeBox = (event) => {
    setSelectedBox(event.target.value);
  };

  const handleChangeCustomer = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const handleChangeDeliverer = (event) => {
    setSelectedDeliverer(event.target.value);
  };

  try {
    useEffect(()=>{
      if(isDispatcher) {
        DispatcherService.getBoxes()
            .then(function (response) {
              //console.log(response);
              setListBoxes(readBoxes(response.data));
            })
        return () => {
          setListBoxes([]);
        };
      }
    }, [])
  }
  catch (e) {
    console.error(e);
  }

  try {
    useEffect(()=>{
      if(isDispatcher) {
        DispatcherService.getCustomers()
            .then(function (response) {
              //console.log(response);
              setListCustomers(readUsers(response.data));
            })
        return () => {
          setListCustomers([]);
        };
      }
    }, [])
  }
  catch (e) {
    console.error(e);
  }

  try {
    useEffect(()=>{
      if (isDispatcher) {
        DispatcherService.getDeliverers()
            .then(function (response) {
              //console.log(response);
              setListDeliverers(readUsers(response.data));
            })
        return () => {
          setListDeliverers([]);
        };
      }
    }, [])
  }
  catch (e) {
    console.error(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const enteredBoxId = selectedBox;
    const enteredCustomerId = selectedCustomer;
    const enteredDelivererId = selectedDeliverer;

    if (enteredBoxId === '' || enteredCustomerId === '' || enteredDelivererId === '') {
      setIsError(true)
      setMessage('No Target Box or Customer or Deliverer selected')
      setLoading(false)
    }
    else {
      const delivery = {
        targetBoxId: enteredBoxId,
        customerId: enteredCustomerId,
        delivererId: enteredDelivererId,
        status: "IN_DEPOT"
      }

      try {
        dispatcherService.createNewDelivery(delivery)
            .then(() => {
              setIsError(false)
              setLoading(false)
              navigate('/listdeliveries')
            })
            .catch((error) => {
              console.log(error)
              setIsError(true)
              setMessage(error.message)
              setLoading(false)
            })
      } catch (e) {
        console.error(e)
        setLoading(false)
      }
    }
  }

  return (
    <div className={classes.container}>
      <h1>Create New Delivery</h1>
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
              spacing={3}
          >
            <TextField
                id="outlined-select-box"
                select
                label="Select"
                value={selectedBox}
                onChange={handleChangeBox}
                helperText="Please select a target box"
            >
              {listBoxes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
              ))}
            </TextField>
            <TextField
                id="outlined-select-box"
                select
                label="Select"
                value={selectedCustomer}
                onChange={handleChangeCustomer}
                helperText="Please select a Customer"
            >
              {listCustomers.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
              ))}
            </TextField>
            <TextField
                id="outlined-select-box"
                select
                label="Select"
                value={selectedDeliverer}
                onChange={handleChangeDeliverer}
                helperText="Please select a Deliverer"
            >
              {listDeliverers.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Button variant='contained' color='primary' onClick={handleSubmit} type='submit'>
            {loading ? 'Loading...' : 'Submit'}
          </Button>
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

export default CreateNewDelivery

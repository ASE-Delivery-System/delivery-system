import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useEffect, useRef, useState} from "react";
import { Paper, Button, TextField, RadioGroup, FormLabel, FormControl, FormControlLabel, Radio } from "@mui/material";
import {makeStyles} from "@mui/styles";
import DispatcherService from "../../services/dispatcher.service";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: 'auto',
    boxShadow: 20,
    p: 3,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
        height: '60vh',
        minHeight: '30vh',
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

function NewUserModal(props) {
    // for opening the snackbar
  // registration
   const [email, setEmail] = useState('')
   const [firstname, setFirstname] = useState('')
   const [lastname, setLastname] = useState('')
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [rfidToken, setRfidToken] = useState('')
   const [role, setRole] = useState([])

    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const classes = useStyles()
    const open = props.open
    const handleOpen = props.handleOpen;
    const handleClose = props.handleClose;
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState('')
    // registration
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')

    const boxIdRef = useRef();
    const boxNameRef = useRef();
    const boxAddressRef = useRef();
    const boxStatusRef = useRef();

    const [setSubmitted] = useState(false)

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
      console.log('bla bla ')
      setLoading(true)

      if (username === '' || email === '' || password === '') {
          setError(true)
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

        DispatcherService.registerNewUser(user)
          .then(() => {
            setLoading(false)
            navigate('/dispatcher')
            handleClose()
            reload()
          })
          .catch((error) => {
            console.log('response: ', error.response.data)
            setLoading(false)
          })
      }
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h1>Create New User</h1>
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

                        <div className={classes.userManagementRow}>
                            <div>
                                <Button className={classes.submitButton} variant='contained' color="success" onClick={handleSubmit} type='submit'>
                                    {loading ? 'Loading...' : 'Submit'}
                                </Button>&nbsp;&nbsp;
                                <Button className={classes.submitButton} onClick={handleClose} variant='contained' color='primary' type='submit'>close</Button>
                            </div>
                        </div>
                    </Paper>
                    {
                        <div className='form-group'>
                            <div className='alert alert-danger' role='alert'></div>
                        </div>
                    }
                </div>
            </Box>
        </Modal>
    );
}

export default NewUserModal;
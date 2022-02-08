import * as React from 'react';
import {useState} from "react";
import {
    Paper,
    Button,
    TextField,
    RadioGroup,
    FormLabel,
    FormControl,
    FormControlLabel,
    Radio,
    DialogContent, Stack, DialogActions, Dialog
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import DispatcherService from "../../services/dispatcher.service";
import { useNavigate } from 'react-router-dom'
import MuiAlert from '@mui/material/Alert';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

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
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rfidToken, setRfidToken] = useState('')
    const [role, setRole] = useState([])

    const classes = useStyles()
    const open = props.open
    const handleOpen = props.handleOpen;
    const handleClose = props.handleClose;
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    // registration
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')

    const [setSubmitted] = useState(false)

    //changing input once already entered

    const handleSubmit = (e) => {
      e.preventDefault()
      setLoading(true)

      if (username === '' || email === '' || password === '' || rfidToken === '' || role === '' || firstname === ''|| lastname === '') {
          setIsError(true)
          setLoading(false)
          setMessage('Please filled in all fields the fields as they are all required');
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
                      handleClose()
                      reload()
                  })
                  .catch((error) => {
                      console.log('response: ', error.response.data)
                      setIsError(true)
                      setLoading(false)                  })
          }
          catch (e) {
              console.error(e);
          }
      }
    }


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Create New User"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Insert the information for your new user:
                </DialogContentText>
                <Paper sx={{
                    minWidth: 500,
                    padding: (1),}}>
                    <FormControl component='fieldset'>
                        <FormLabel component='legend'>Choose the User Type</FormLabel>
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
                        spacing={1}
                    >
                        <TextField label='First name' variant='outlined' fullWidth value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                        <TextField label='Last name' variant='outlined' fullWidth value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        <TextField label='Username' variant='outlined' fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
                        <TextField label='Email' variant='outlined' fullWidth value={email} onChange={(e) => setEmail(e.target.value)} type='Email' />
                        <TextField label='Address' variant='outlined' fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
                        {!role.includes('dispatcher') ? (
                            <TextField label='RFID Token' variant='outlined' fullWidth value={rfidToken} onChange={(e) => setRfidToken(e.target.value)} type='text' />
                        ) : (
                            <></>
                        )}
                        <TextField label='Password' variant='outlined' fullWidth value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                    </Stack>
                </Paper>
                {isError && (
                    <div className='form-group'>
                        <div className='alert alert-danger' role='alert'>
                            {message}
                        </div>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='contained' color='primary'>Close</Button>
                <Button className={classes.submitButton} variant='contained' color='success' onClick={handleSubmit} type='submit'>
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewUserModal;

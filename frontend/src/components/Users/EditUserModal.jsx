import * as React from 'react';
import Button from '@mui/material/Button';
import {useEffect, useRef, useState} from "react";
import {Dialog, DialogActions, DialogContent, Paper, Stack, TextField, FormLabel, FormControl, FormControlLabel, Radio, MenuItem} from "@mui/material";
import {makeStyles} from "@mui/styles";
import DispatcherService from "../../services/dispatcher.service";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

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
        height: '50vh',
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

const reload=()=>window.location.reload();

function EditUserModal(props) {
    const open = props.open
    const handleOpen = props.handleOpen;
    const closeHandler = props.handleClose;
    const update = props.update;
    const clickedRow = props.clickedRow;

    const userId = clickedRow.id;
    //const userPassword = clickedRow.password;
    const userEmail = clickedRow.email;
    const userAddress = clickedRow.address;
    const userFirstName = clickedRow.firstName;
    const userLastName = clickedRow.lastName;
    const userUsername = clickedRow.username;
    const userRfidToken = clickedRow.rfidToken;
    const userRole = clickedRow.roles;

    //const newIdRef = useRef();
    const newEmailRef = useRef();
    const newAddressRef = useRef();
    const newFirstnameRef = useRef();
    const newLastnameRef = useRef();
    const newUsernameRef = useRef();
    const newRfidTokenRef = useRef();

    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState(clickedRow.rolesName);
    const [rfidToken, setRfidToken] = useState(clickedRow.rfidToken);

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
        //console.log(event.target.value);
    };

    const handleClose = () => {
        closeHandler();
        setIsError(false)
    };

    let rowsSelected = props.selectedRows;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const enteredEmail = newEmailRef.current.value;
        const enteredUsername = newUsernameRef.current.value;
        const enteredFirstname = newFirstnameRef.current.value;
        const enteredLastname = newLastnameRef.current.value;
        const enteredAddress = newAddressRef.current.value;
        let bodyToSend = null;

        console.log("Entered the Change handler")
        if (enteredUsername === '' || enteredEmail === '' || userRole === '' || enteredFirstname === ''|| enteredLastname === '') {
            setIsError(true)
            setLoading(false)
            setMessage('Please fill in first name, last name, username, email, password, and role');
        } else {
            bodyToSend = {
            username: enteredUsername,
            email: enteredEmail,
            role: role,
            firstName: enteredFirstname,
            lastName: enteredLastname,
            rfidToken: rfidToken,
            address: enteredAddress
            }
         }
        console.log(bodyToSend);
        try {
            DispatcherService.postUser(userId, bodyToSend)
                .then(function (response) {
                    console.log(response);
                    setIsError(false)
                    setLoading(false)
                    handleClose();
                    reload()
                })
                .catch((error) => {
                    //console.log(error)
                    console.log(error)
                    setIsError(true)
                    setMessage(error.message)
                    setLoading(false)
                })
        }
        catch (e) {
            console.error(e)
        }
    }



    //console.log(userId)

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Edit User"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Edit your clicked user:
                </DialogContentText>
                <Paper sx={{
                    minWidth: 500,
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
                        spacing={2}
                    >
                          <TextField
                              id="outlined-select-box"
                              select
                              label="Role"
                              defaultValue={clickedRow.rolesName}
                              onChange={handleRoleChange}
                              helperText="Change the user role"
                          >
                              <MenuItem value={'customer'}>Customer</MenuItem>
                              <MenuItem value={'deliverer'}>Deliverer</MenuItem>
                              <MenuItem value={'dispatcher'}>Dispatcher</MenuItem>
                          </TextField>
                        <TextField label='New Username'
                                   variant='outlined'
                                   fullWidth
                                   helperText="Change the username"
                                   defaultValue={userUsername}
                                   inputRef={newUsernameRef}/>
                        <TextField label='New Email'
                                   variant='outlined'
                                   fullWidth
                                   helperText="Change the email address"
                                   defaultValue={userEmail}
                                   inputRef={newEmailRef}/>
                        <TextField label='New First Name'
                                   variant='outlined'
                                   fullWidth
                                   helperText="Change the first name"
                                   defaultValue={userFirstName}
                                   inputRef={newFirstnameRef}/>
                        <TextField label='New Last Name'
                                   variant='outlined'
                                   fullWidth
                                   helperText="Change the last name"
                                   defaultValue={userLastName}
                                   inputRef={newLastnameRef}/>
                        <TextField label='New Address'
                                   variant='outlined'
                                   fullWidth
                                   helperText="Change the address"
                                   defaultValue={userAddress}
                                   inputRef={newAddressRef}/>
                        {(!role.includes('dispatcher') && true && (
                            <TextField
                                label='New RFID Token'
                                variant='outlined'
                                fullWidth
                                helperText="Change the RFID token "
                                defaultValue={userRfidToken}
                                inputRef={newRfidTokenRef}/>))}
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
                <Button onClick={handleClose} variant='contained' color='primary'>Cancel</Button>
                <Button variant='contained' color='success' onClick={handleSubmit} type='submit'>
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditUserModal;

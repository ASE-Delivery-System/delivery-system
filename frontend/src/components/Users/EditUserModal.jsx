import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useEffect, useRef, useState} from "react";
import {Dialog, DialogActions, DialogContent, Paper, Stack, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import DispatcherService from "../../services/dispatcher.service";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dispatcherService from "../../services/dispatcher.service";

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

function EditUserModal(props) {
    const classes = useStyles();

    const open = props.open
    const handleOpen = props.handleOpen;
    const handleClose = props.handleClose;
    const update = props.update;
    const clickedRow = props.clickedRow;

    const userId = clickedRow.id;
    const userPassword = clickedRow.password;
    const userEmail = clickedRow.email;
    const userAddress = clickedRow.address;
    const userFirstName = clickedRow.firstName;
    const userLastName = clickedRow.lastName;
    const userUsername = clickedRow.username;
    const userRfidToken = clickedRow.rfidToken;
    const userRoles = clickedRow.roles;
    const userRolesName = clickedRow.roles;
    const userRolesId = clickedRow.rolesId;

    const newIdRef = useRef();
    const newEmailRef = useRef();
    const newAddressRef = useRef();
    const newFirstnameRef = useRef();
    const newLastnameRef = useRef();
    const newUsernameRef = useRef();
    const newRfidTokenRef = useRef();
    const newRolesRef = useRef();
    const newRolesIdRef = useRef();
    const newRolesNameRef = useRef();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = React.useState(clickedRow.email);
    const [address, setAddress] = React.useState(clickedRow.address);
    const [firstName, setFirstname] = React.useState(clickedRow.firstName);
    const [lastName, setLastname] = React.useState(clickedRow.lastName);
    const [username, setUsername] = React.useState(clickedRow.username);
    const [rfidToken, setRfidToken] = React.useState(clickedRow.rfidToken);
    // const [roles, setRoles] = React.useState(clickedRow.roles);
    const [rolesName, setRolesName] = React.useState(clickedRow.roles);
    const [rolesId, setRolesId] = React.useState(clickedRow.rolesId);
    const [roles, setRoles] = React.useState(clickedRow.roles);

    const handleRoleChange = (event) => {
        setRoles(event.target.value);
        console.log(event.target.value);
    };

    let rowsSelected = props.selectedRows;

    function handleSubmit() {

           const enteredEmail = newEmailRef.current.value;
           const enteredUsername = newUsernameRef.current.value;
           const enteredFirstname = newFirstnameRef.current.value;
           const enteredLastname = newLastnameRef.current.value;
           const enteredRfidToken = newRfidTokenRef.current.value;
           const enteredAddress = newAddressRef.current.value;

            console.log("Entered the Change handler")
                const bodyToSend = {
                    id: userId,
                    username: enteredUsername,
                    email: enteredEmail,
                    address: enteredAddress,
                    firstName: enteredFirstname,
                    lastName: enteredLastname,
                    rfidToken: enteredRfidToken,
                    roles:
                            [{
                                id: userRolesId,
                                name: userRolesName
                            }],
                };
                console.log(bodyToSend);
                DispatcherService.postUser(userId, bodyToSend)
                    .then(function (response) {
                        console.log(response);
                        update();
                    })
                    .catch((error) => {
                        console.log(error)
                    })

            handleClose();


            const handleChange = (event) => {
                 setEmail(event.target.value);
                 setAddress(event.target.value);
                 setFirstname(event.target.value);
                 setLastname(event.target.value);
                 setRfidToken(event.target.value);
                 console.log(event.target.value);
                 };
        }

    console.log(userId)

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
                        spacing={1}
                    >
                        <InputLabel id="usernameLabel">New Username</InputLabel>
                        <TextField label='New Username' variant='outlined' fullWidth defaultValue={userUsername} inputRef={newUsernameRef}/>
                        <InputLabel id="emailLabel">New Email</InputLabel>
                        <TextField label='New Email' variant='outlined' fullWidth defaultValue={userEmail} inputRef={newEmailRef}/>
                        <InputLabel id="firstnameLabel">New First Name</InputLabel>
                        <TextField label='New First Name' variant='outlined' fullWidth defaultValue={userFirstName} inputRef={newFirstnameRef}/>
                        <InputLabel id="lastnameLabel">New Last Name</InputLabel>
                        <TextField label='New Last Name' variant='outlined' fullWidth defaultValue={userLastName} inputRef={newLastnameRef}/>
                        <InputLabel id="addressLabel">New Address</InputLabel>
                        <TextField label='New Address' variant='outlined' fullWidth defaultValue={userAddress} inputRef={newAddressRef}/>
                        <InputLabel id="rfidTokenLabel">New RFID Token</InputLabel>
                        <TextField label='New RFID Token' variant='outlined' fullWidth defaultValue={userRfidToken} inputRef={newRfidTokenRef}/>
                    </Stack>
                </Paper>
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


import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useEffect, useRef, useState} from "react";
import {Dialog, DialogActions, DialogContent, Paper, Stack, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import DispatcherService from "../../services/dispatcher.service";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


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
    deliveryManagementRoot: {
        margin: 'auto',
        height: 'auto',
        minHeight: '30vh',
        paddingTop: 10,
        width: 'fit-content',
    },
    deliveryManagementPaper: {
        minWidth: 500,
        width: 'fit-content',
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

function NewDeliveryModal(props) {
    const classes = useStyles()
    const open = props.open
    const handleOpen = props.handleOpen;
    const handleClose = props.handleClose;
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')

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

      if (name === '' || address === '') {
        setError('Example error message!')
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
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Create New Box"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Insert name and address for your new box:
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
                        <TextField label='Box Name' variant='outlined' fullWidth value={name} onChange={(e) => setName(e.target.value)}/>
                        <TextField label='Box Address' variant='outlined' fullWidth value={address} onChange={(e) => setAddress(e.target.value)}/>

                    </Stack>
                </Paper>
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

export default NewDeliveryModal;
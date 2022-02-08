import * as React from 'react';
import Button from '@mui/material/Button';
import {useEffect, useRef, useState} from "react";
import {Dialog, DialogActions, DialogContent, Paper, Stack, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import DispatcherService from "../../services/dispatcher.service";
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

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault()
      setLoading(true)

      if (name === '' || address === '') {
          setIsError(true)
          setMessage('The Box Name or Box Address field is empty')
          setLoading(false)
      } else {
        const box = {
            name: name,
            address: address,
            status: "EMPTY"
        }

        try {
            DispatcherService.createNewBox(box)
                .then(() => {
                    setIsError(false)
                    setLoading(false)
                    handleClose()
                    reload()
                })
                .catch((error) => {
                    console.log(error)
                    setIsError(true)
                    //setMessage(error.message)
                    setLoading(false)
                })
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
                        <TextField
                            label='Box Name'
                            variant='outlined'
                            helperText="Please insert the Box Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                        <TextField
                            label='Box Address'
                            variant='outlined'
                            helperText="Please insert the Box Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}/>
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

export default NewDeliveryModal;
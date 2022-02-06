import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useEffect, useRef, useState} from "react";
import {Paper, TextField} from "@mui/material";
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

function NewDeliveryModal(props) {
    // for opening the snackbar
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
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h1>Create New Box</h1>
                <div className={classes.deliveryManagementRoot}>
                    <Paper className={classes.deliveryManagementPaper} component='form'>
                        <div className={classes.deliveryManagementRow}>
                            <TextField label='Box Name' variant='outlined' fullWidth inputRef={boxNameRef} value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className={classes.deliveryManagementRow}>
                            <TextField label='Box Address' variant='outlined' fullWidth inputRef={boxAddressRef} value={address} onChange={(e) => setAddress(e.target.value)}/>
                        </div>
                        <div className={classes.deliveryManagementRow}>
                            <div>
                                <Button className={classes.submitButton} variant='contained' color="success" onClick={handleSubmit} type='submit'>
                                    {loading ? 'Loading...' : 'Submit'}
                                </Button>&nbsp;&nbsp;
                                <Button className={classes.submitButton} onClick={handleClose} variant='contained' color='primary'>close</Button>
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

export default NewDeliveryModal;
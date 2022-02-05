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

const fields = [
    { field: 'id', headerName: 'Box ID', width: 200 },
    { field: 'name', headerName: 'Box Name', width: 200 },
    { field: 'address', headerName: 'Box Address', width: 200 },
    { field: 'status', headerName: 'Box Status', width: 200 },
];


function EditBoxModal(props) {
     const [error, setError] = useState('')
     const classes = useStyles();
     const title = "List of your Boxes";
     const description = "Manage your boxes";
     const open = props.open
     const handleOpen = props.handleOpen;
     const handleClose = props.handleClose;
     const [loading, setLoading] = useState(false)
     const [name, setName] = useState('')
     const [id, setId] = useState('')
     const [address, setAddress] = useState('')
     const navigate = useNavigate()

     let rowsSelected = props.selectedRows;
     let res = "";

     const boxIdRef = props.selectedRows;
     const boxNameRef = props.selectedRows.name;
     const boxAddressRef = props.selectedRows.address;
     const boxStatusRef = props.selectedRows.status;

     const [BoxData, setBoxData] = useState([])

     const handleSubmit = (e) => {
          console.log('bla bla ')

         for (const element of e) {
         DispatcherService.postBox(e)
             .then(function (e) {
                 console.log(e);
             })
             .catch((error) => {
             console.log(error.response)
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
                <h1>Edit Box</h1>
                <div className={classes.deliveryManagementRoot}>
                    <Paper className={classes.deliveryManagementPaper} component='form'>
                        <div className={classes.deliveryManagementRow}>
                            <TextField label='Box Id' variant='outlined' editable='false' fullWidth value={props.selectedRows}/>
                        </div>
                        <div className={classes.deliveryManagementRow}>
                            <TextField label='Box Name' variant='outlined' editable='true' fullWidth inputRef={boxNameRef} value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className={classes.deliveryManagementRow}>
                            <TextField label='Box Address' variant='outlined' fullWidth inputRef={boxAddressRef} value={address} onChange={(e) => setAddress(e.target.value)}/>
                        </div>
                        <div className={classes.deliveryManagementRow}>
                            <TextField label='Status' variant='outlined' fullWidth inputRef={boxStatusRef} />
                        </div>
                        <div className={classes.deliveryManagementRow}>
                            <div>
                                <Button className={classes.submitButton} variant='contained' color="success" onClick={()=> handleSubmit} type='submit'>
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

export default EditBoxModal;
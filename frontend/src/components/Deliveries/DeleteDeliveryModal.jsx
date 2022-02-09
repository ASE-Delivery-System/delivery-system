import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {makeStyles} from "@mui/styles";
import DispatcherService from "../../services/dispatcher.service";
import {useState} from "react";

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

const reload=()=>window.location.reload();

function DeleteDeliveryModal(props) {
    const classes = useStyles()
    const open = props.open
    const handleOpen = props.handleOpen;
    const closeHandler = props.handleClose;
    const update = props.update;

    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    let rowsSelected = props.selectedRows;

    const handleClose = () => {
        closeHandler();
        setIsError(false)
    };

    function DeleteHandler() {
        console.log("Entered the Delete handler")
        setLoading(true);

        if (rowsSelected.length === 0) {
            setIsError(true)
            setMessage('No rows selected')
            setLoading(false)
        }
        else {
            try {
                for (const element of rowsSelected) {
                    //console.log(element);
                    DispatcherService.deleteDelivery(element)
                        .then(function (response) {
                            setIsError(false)
                            setLoading(false)
                        })
                        .catch((error) => {
                            console.log(error)
                            //setMessage(error.message)
                            setIsError(true)
                            setLoading(false)
                        })
                }
            }
            catch (e) {
                console.error(e);
                setIsError(true)
                setMessage("Delete not possible")
                setLoading(false)
            }
            update();
            handleClose();

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
                {"Are you sure?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You are going to delete {rowsSelected.length} deliveries
                </DialogContentText>
                {isError && (
                    <div className='form-group'>
                        <div className='alert alert-danger' role='alert'>
                            {message}
                        </div>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus variant='contained' color='primary'>No</Button>
                <Button onClick={DeleteHandler} autoFocus variant='contained' color='success'>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDeliveryModal;
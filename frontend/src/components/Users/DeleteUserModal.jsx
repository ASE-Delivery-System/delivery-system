import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {useEffect, useRef, useState} from "react";
import {makeStyles} from "@mui/styles";
import DispatcherService from "../../services/dispatcher.service";

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

const reload=()=>window.location.reload();

function DeleteUserModal(props) {
    const classes = useStyles()
    const open = props.open
    const handleOpen = props.handleOpen;
    const handleClose = props.handleClose;

    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    let rowsSelected = props.selectedRows;

    //console.log(props.selectedRows.size);

    function DeleteHandler() {
        console.log("entered the handler")
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
                    DispatcherService.deleteUsers(element)
                        .then(function (response) {
                            setIsError(false)
                            setLoading(false)
                            //console.log(response);
                        })
                        .catch((error) => {
                            setIsError(true)
                            //setMessage(error.message)
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
        }
        reload();
        handleClose();
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
                    You are going to delete {rowsSelected.length} users
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

export default DeleteUserModal;
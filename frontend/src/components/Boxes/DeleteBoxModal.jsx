import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import DispatcherService from "../../services/dispatcher.service";

const reload=()=>window.location.reload();

function DeleteBoxModal(props) {
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
        console.log("Entered the Delete Handler");
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
                    DispatcherService.deleteBox(element)
                        .then(function (response) {
                            //console.log(response);
                            setIsError(false)
                            setLoading(false)
                        })
                        .catch((error) => {
                            console.log(error)
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
                    You are going to delete {rowsSelected.length} boxes
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

export default DeleteBoxModal;
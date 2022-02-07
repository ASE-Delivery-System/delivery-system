import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import DispatcherService from "../../services/dispatcher.service";

function DeleteBoxModal(props) {
    const open = props.open
    const handleOpen = props.handleOpen;
    const handleClose = props.handleClose;
    const update = props.update;

    const [loading, setLoading] = useState(false)

    let rowsSelected = props.selectedRows;
    let res = "";

    function DeleteHandler() {
        console.log("entered the handler")
        for (const element of rowsSelected) {
            console.log(element);
            DispatcherService.deleteBox(element)
                .then(function (response) {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error)
                })

        }
        update();
        handleClose();
        //update table function
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
                    You are going to delete the selected boxes
                </DialogContentText>
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
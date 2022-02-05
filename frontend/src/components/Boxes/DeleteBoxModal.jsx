import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {useEffect, useRef, useState} from "react";
import {Paper, Stack, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import dispatcherService from "../../services/dispatcher.service";
import Dispatcher from "../../screens/Dispatcher";
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

function DeleteBoxModal(props) {
    const classes = useStyles()
    const open = props.open
    const handleOpen = props.handleOpen;
    const handleClose = props.handleClose;
    const [loading, setLoading] = useState(false)

    let rowsSelected = props.selectedRows;
    let res = "";

    //console.log(props.selectedRows.size);

    /*if(props.selectedRows.size != 0) {
        rowsSelected = props.selectedRows;
        res = Array.from(rowsSelected).join(' ');
        console.log(res)
    }*/
    function DeleteHandler() {
        console.log("entered the handler")
        for (const element of rowsSelected) {
            console.log(element);
            DispatcherService.deleteBox(element)
                .then(function (response) {
                    reload()
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error)
                })

        }
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
                    You are going to delete the following boxes: {props.selectedRows}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>No</Button>
                <Button onClick={DeleteHandler} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteBoxModal;
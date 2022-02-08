import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";
import {FormControl} from "@mui/material";
import DispatcherService from "../../services/dispatcher.service";
import {useState} from "react";

const reload=()=>window.location.reload();

function ChangeStatusModal(props) {
    const open = props.open
    const handleOpen = props.handleOpen;
    const handleClose = props.handleClose;
    const update = props.update;

    const [loading, setLoading] = useState(false);

    const [newStatus, setNewStatus] = React.useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    let rowsSelected = props.selectedRows;

    const handleChange = (event) => {
        setNewStatus(event.target.value);
        //console.log(event.target.value)
    };

    function changeStatusHandler() {
        console.log("Entered the Change handler")
        setLoading(true)

        if (rowsSelected.length === 0) {
            setIsError(true)
            setMessage('No rows selected')
            setLoading(false)
        }
        else {
            try {
                for (const element of rowsSelected) {
                    const bodyToSend = {
                        status: newStatus
                    };
                    //console.log(element);
                    DispatcherService.changeStatusDelivery(element, bodyToSend)
                        .then(function (response) {
                            //console.log(response);
                            setIsError(false)
                            setLoading(false)
                        })
                        .catch((error) => {
                            console.log(error)
                            setIsError(true)
                            setLoading(false)
                        })
                }
            }
            catch (e) {
                console.error(e);
                setIsError(true)
                setMessage(e.message)
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
                {"Select the new status"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You are going to change the status of {rowsSelected.length} deliveries to:
                </DialogContentText>

                <Box noValidate
                     component="form"
                     sx={{
                         display: 'flex',
                         flexDirection: 'column',
                         m: 'auto',
                         width: 'fit-content',
                     }}>
                    <FormControl sx={{ m: 2, minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label">New Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={newStatus}
                            label="New Status"
                            onChange={handleChange}
                        >
                            <MenuItem value={'IN_DEPOT'}>In Deposit</MenuItem>
                            <MenuItem value={'OUT_FOR_DELIVERY'}>Out for Delivery</MenuItem>
                            <MenuItem value={'DELIVERED'}>Delivered</MenuItem>
                            <MenuItem value={'PICKED_UP'}>Picked Up</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {isError && (
                    <div className='form-group'>
                        <div className='alert alert-danger' role='alert'>
                            {message}
                        </div>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus variant='contained' color='primary'>Cancel</Button>
                <Button onClick={changeStatusHandler} autoFocus variant='contained' color='success'>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChangeStatusModal;
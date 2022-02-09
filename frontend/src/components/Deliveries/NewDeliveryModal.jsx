import * as React from 'react';
import Button from '@mui/material/Button';
import {useEffect, useRef, useState} from "react";
import {Dialog, DialogActions, DialogContent, Paper, Stack, TextField} from "@mui/material";
import dispatcherService from "../../services/dispatcher.service";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import MenuItem from "@mui/material/MenuItem";
import DispatcherService from "../../services/dispatcher.service";

function readBoxes(data) {
    let newRows = [];
    let name = "";
    let id = "";

    try {
        newRows = data.map( (item) => {
            id = item.id;
            name = item.name;

            return {
                value: id,
                label: name,
            }
        });
    }
    catch (e) {
        console.error(e);
    }

    return newRows;
}

function readUsers(data) {
    let newRows = [];
    let firstName = "";
    let lastName = "";
    let id = "";

    try {
        newRows = data.map( (item) => {
            id = item.id;
            firstName = item.firstName;
            lastName = item.lastName;

            return {
                value: id,
                label: firstName + ' ' + lastName,
            }
            //newRows.push(itemInfo)
        });
    }
    catch (e) {
        console.error(e);
    }

    return newRows;
}

const reload=()=>window.location.reload();

function NewDeliveryModal(props) {
    const open = props.open
    const handleOpen = props.handleOpen;
    const closeHandler = props.handleClose;
    const update = props.update;
    const isDispatcher = props.loggedIn;

    const [loading, setLoading] = useState(false)

    const [selectedBox, setSelectedBox] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedDeliverer, setSelectedDeliverer] = useState('');

    const [listBoxes, setListBoxes] = useState([])
    const [listCustomers, setListCustomers] = useState([])
    const [listDeliverers, setListDeliverers] = useState([])

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => {
        closeHandler();
        setIsError(false)
        setSelectedDeliverer('')
        setSelectedCustomer('')
        setSelectedBox('')
    };

    const handleChangeBox = (event) => {
        setSelectedBox(event.target.value);
    };

    const handleChangeCustomer = (event) => {
        setSelectedCustomer(event.target.value);
    };

    const handleChangeDeliverer = (event) => {
        setSelectedDeliverer(event.target.value);
    };

    try {
        useEffect(()=>{
            if(isDispatcher) {
                DispatcherService.getBoxes()
                    .then(function (response) {
                        setListBoxes(readBoxes(response.data));
                    })
                return () => {
                    setListBoxes([]);
                };
            }
        }, [])
    }
    catch (e) {
        console.error(e);
    }

    try {
        useEffect(()=>{
            if(isDispatcher) {
                DispatcherService.getCustomers()
                    .then(function (response) {
                        //console.log(response);
                        setListCustomers(readUsers(response.data));
                    })
                return () => {
                    setListCustomers([]);
                };
            }
        }, [])
    }
    catch (e) {
        console.error(e);
    }

    try {
        useEffect(()=>{
            if(isDispatcher) {
                DispatcherService.getDeliverers()
                    .then(function (response) {
                        setListDeliverers(readUsers(response.data));
                    })
                return () => {
                    setListDeliverers([]);
                };
            }
        }, [])
    }
    catch (e) {
        console.error(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const enteredBoxId = selectedBox;
        const enteredCustomerId = selectedCustomer;
        const enteredDelivererId = selectedDeliverer;

        if (enteredBoxId === '' || enteredCustomerId === '' || enteredDelivererId === '') {
            setIsError(true)
            setMessage('No Target Box or Customer or Deliverer selected')
            setLoading(false)
        }
        else {
            const delivery = {
                targetBoxId: enteredBoxId,
                customerId: enteredCustomerId,
                delivererId: enteredDelivererId,
                status: "IN_DEPOT"
            }

            try {
                dispatcherService.createNewDelivery(delivery)
                    .then(() => {
                        setIsError(false)
                        setLoading(false)
                        handleClose()
                        reload()
                    })
                    .catch((error) => {
                        console.log(error)
                        setIsError(true)
                        setMessage(error.message)
                        setLoading(false)
                    })
            } catch (e) {
                console.error(e.message)
            }
        }
        //resetModal()
    }



    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Create New Delivery"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Select target box, customer and deliverer for your new delivery:
                </DialogContentText>
                <Paper sx={{
                    width: 'fit-content',
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
                            id="outlined-select-box"
                            select
                            label="Select"
                            value={selectedBox}
                            onChange={handleChangeBox}
                            helperText="Please select a target box"
                        >
                            {listBoxes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-select-box"
                            select
                            label="Select"
                            value={selectedCustomer}
                            onChange={handleChangeCustomer}
                            helperText="Please select a Customer"
                        >
                            {listCustomers.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-select-box"
                            select
                            label="Select"
                            value={selectedDeliverer}
                            onChange={handleChangeDeliverer}
                            helperText="Please select a Deliverer"
                        >
                            {listDeliverers.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
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
                <Button variant='contained' color='success' onClick={handleSubmit} type='submit'>
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewDeliveryModal;
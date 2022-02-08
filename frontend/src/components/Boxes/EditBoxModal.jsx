import * as React from 'react';
import Button from '@mui/material/Button';
import {useEffect, useRef, useState} from "react";
import {Dialog, DialogActions, DialogContent, Paper, Stack, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import MenuItem from "@mui/material/MenuItem";
import dispatcherService from "../../services/dispatcher.service";

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

function EditBoxModal(props) {
    const classes = useStyles();

    const open = props.open
    const handleOpen = props.handleOpen;
    const handleClose = props.handleClose;
    const update = props.update;
    const clickedRow = props.clickedRow;

    const boxId = clickedRow.id;
    const boxAddress = clickedRow.address;
    const boxName = clickedRow.name;
    const boxCustomer = clickedRow.customer;
    const boxDeliverer = clickedRow.deliverer;
    const boxDeliveries = clickedRow.deliveries;

    const newNameRef = useRef();
    const newAddressRef = useRef();

    const [loading, setLoading] = useState(false);
    const [boxStatus, setBoxStatus] = React.useState(clickedRow.status);

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setBoxStatus(event.target.value);
        //console.log(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Entered submit")
        const enteredBoxName = newNameRef.current.value;
        const enteredBoxAddress = newAddressRef.current.value;

        let box = null;

        box = {
            id: boxId,
            name: enteredBoxName,
            status: boxStatus,
            address: enteredBoxAddress,
            customer: boxCustomer,
            deliverer: boxDeliverer,
            deliveries: boxDeliveries
        }
        //console.log(box)
        //console.log(JSON.stringify(box));

        try {
            dispatcherService.postBox(boxId,box)
                .then(function (response) {
                    //console.log(response);
                    setIsError(false)
                    setLoading(false)
                    handleClose();
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
            console.error(e)
        }
    }
    //console.log(boxId)

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Edit Box"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Edit your clicked box:
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
                            label='New Box Name'
                            variant='outlined'
                            helperText="Please enter the new box name"
                            defaultValue={boxName}
                            inputRef={newNameRef}/>
                        <TextField
                            label='New Box Address'
                            variant='outlined'
                            helperText="Please enter the new box address"
                            defaultValue={boxAddress}
                            inputRef={newAddressRef}/>
                        <TextField
                            id="outlined-select-box"
                            select
                            label="Status"
                            defaultValue={clickedRow.status}
                            onChange={handleChange}
                            helperText="Please select the new box status"
                        >
                            <MenuItem disabled value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'EMPTY'}>Empty</MenuItem>
                            <MenuItem value={'TAKEN'}>Taken</MenuItem>
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
                <Button onClick={handleClose} variant='contained' color='primary'>Cancel</Button>
                <Button variant='contained' color='success' onClick={handleSubmit} type='submit'>
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </DialogActions>

        </Dialog>
    );
}

export default EditBoxModal;

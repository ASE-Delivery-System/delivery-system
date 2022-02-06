import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useEffect, useRef, useState} from "react";
import {Dialog, DialogContent, Paper, Stack, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import DispatcherService from "../../services/dispatcher.service";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dispatcherService from "../../services/dispatcher.service";

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
    let boxStatus = clickedRow.status;
    const boxCustomer = clickedRow.customer;
    const boxDeliverer = clickedRow.deliverer;
    const boxDeliveries = clickedRow.deliveries;

    const newNameRef = useRef();
    const newAddressRef = useRef();

    const [loading, setLoading] = useState(false);
    const [newStatus, setNewStatus] = React.useState('');

    const handleChange = (event) => {
        setNewStatus(event.target.value);
        console.log(event.target.value);
        boxStatus = newStatus;
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
        console.log(box)
        console.log(JSON.stringify(box));

        try {
            dispatcherService.postBox(boxId,JSON.stringify(box));
        }
        catch (e) {
            console.error(e)
        }
        setLoading(false)
        handleClose();
        update();
    }
    console.log(boxId)

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
                            minWidth: 400,
                            width: 'fit-content',
                            padding: (2),
                        }}
                        noValidate
                        autoComplete="off"
                        spacing={1}
                    >
                        <InputLabel id="nameLabel">New Name</InputLabel>
                        <TextField label='New Box Name' variant='outlined' fullWidth defaultValue={boxName} inputRef={newNameRef}/>
                        <InputLabel id="addressLabel">New Address</InputLabel>
                        <TextField label='New Box Address' variant='outlined' fullWidth defaultValue={boxAddress} inputRef={newAddressRef}/>
                        <InputLabel id="statusLabel">New Status</InputLabel>
                        <Select
                            labelId="statusLabel"
                            id="demo-simple-select"
                            defaultValue={boxStatus}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'EMPTY'}>Empty</MenuItem>
                            <MenuItem value={'TAKEN'}>Taken</MenuItem>
                        </Select>
                    </Stack>
                        <div>
                            <Button className={classes.submitButton} variant='contained' color='primary' onClick={handleSubmit} type='submit'>
                                {loading ? 'Loading...' : 'Submit'}
                            </Button>
                        </div>
                </Paper>
            </DialogContent>


        </Dialog>
    );
}

export default EditBoxModal;

/*
<div className={classes.deliveryManagementRow}>
    <div>
        <Button className={classes.submitButton} variant='contained' color="success" onClick={()=> handleSubmit} type='submit'>
            {loading ? 'Loading...' : 'Submit'}
        </Button>&nbsp;&nbsp;
        <Button className={classes.submitButton} onClick={handleClose} variant='contained' color='primary' type='submit'>close</Button>
    </div>
</div>*/

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useEffect, useRef, useState} from "react";
import {Paper, Stack, TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
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



function DeleteDeliveryModal(props) {
    const classes = useStyles()
    const open = props.open
    const handleOpen = props.handleOpen;
    const handleClose = props.handleClose;
    const [loading, setLoading] = useState(false)


    const boxIdRef = useRef();
    const customerIdIdRef = useRef();
    const delivererIdRef = useRef();

    let rowsSelected = new Set();
    let res = "";


    const handleSubmit = (e) => {
        e.preventDefault();
        /*setLoading(true);

        const enteredBoxId = boxIdRef.current.value;
        const enteredCustomerId = customerIdIdRef.current.value;
        const enteredDelivererId = delivererIdRef.current.value;

        let delivery = null;

        delivery = {
            targetBoxId: enteredBoxId,
            customerId: enteredCustomerId,
            delivererId: enteredDelivererId,
            status: "IN_DEPOT"
        }
        console.log(delivery)
        console.log(JSON.stringify(delivery));

        try {
            dispatcherService.createNewDelivery(JSON.stringify(delivery));
            setLoading(false)
        }
        catch (e) {
            console.error(e)
        }*/
        /*fetch('https://ase-delivery-service.herokuapp.com/deliveries',
            {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify(delivery)
            })
            .then(response => response.json())
            .then(data => console.log(data));;*/


    }

    //console.log(props.selectedRows.size);

    if(props.selectedRows.size != 0) {
        console.log("SJOW");
        rowsSelected = props.selectedRows;
        res = Array.from(rowsSelected).join(' ');
        console.log(props.selectedRows)
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h3>Are you sure?</h3>
                <p>You are going to delete the following deliveries: {res}</p>
                <div className={classes.deliveryManagementRoot}>
                    <Paper className={classes.deliveryManagementPaper} component='form'>
                        <Stack spacing={2} direction="row">
                            <Button variant='contained' color='secondary' onClick={handleSubmit} type='submit'>
                                No
                            </Button>
                            <Button className={classes.submitButton} variant='contained' color='primary' onClick={handleSubmit} type='submit'>
                                Yes
                            </Button>

                        </Stack>
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

export default DeleteDeliveryModal;
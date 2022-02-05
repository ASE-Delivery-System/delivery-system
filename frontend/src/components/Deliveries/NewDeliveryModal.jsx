import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useEffect, useRef, useState} from "react";
import {Paper, TextField} from "@mui/material";
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

function NewDeliveryModal(props) {
    const classes = useStyles()
    const open = props.open
    const handleOpen = props.handleOpen;
    const handleClose = props.handleClose;
    const [loading, setLoading] = useState(false)


    const boxIdRef = useRef();
    const customerIdIdRef = useRef();
    const delivererIdRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

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
        }

    }



    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h1>Create New Delivery</h1>
                <div className={classes.deliveryManagementRoot}>
                    <Paper className={classes.deliveryManagementPaper} component='form'>
                        <div className={classes.deliveryManagementRow}>
                            <TextField label='Target Box' variant='outlined' fullWidth inputRef={boxIdRef} />
                        </div>
                        <div className={classes.deliveryManagementRow}>
                            <TextField label='Target Customer' variant='outlined' fullWidth inputRef={customerIdIdRef} />
                        </div>
                        <div className={classes.deliveryManagementRow}>
                            <TextField label='Deliverer' variant='outlined' fullWidth inputRef={delivererIdRef} />
                        </div>
                        <div className={classes.deliveryManagementRow + ' ' + classes.submitButtons}>
                            <div>
                                <Button className={classes.submitButton} variant='contained' color='primary' onClick={handleSubmit} type='submit'>
                                    {loading ? 'Loading...' : 'Submit'}
                                </Button>
                            </div>
                        </div>
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

export default NewDeliveryModal;
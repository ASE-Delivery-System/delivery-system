import * as React from 'react';
import Button from '@mui/material/Button';
import {makeStyles} from "@mui/styles";
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

function ChangeStatusModal(props) {
    const classes = useStyles()
    const open = props.open
    const handleOpen = props.handleOpen;
    const handleClose = props.handleClose;
    const update = props.update;
    //const [loading, setLoading] = useState(false)
    const [newStatus, setNewStatus] = React.useState('');

    const handleChange = (event) => {
        setNewStatus(event.target.value);
        console.log(event.target.value)
    };


    let rowsSelected = props.selectedRows;

    function changeStatusHandler() {
        console.log("Entered the Change handler")
        for (const element of rowsSelected) {
            const bodyToSend = {
                status: newStatus
            };
            console.log(element);
            DispatcherService.changeStatusDelivery(element, bodyToSend)
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
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

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
                    You are going to change the status of the selected deliveries to:
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>Cancel</Button>
                <Button onClick={changeStatusHandler} autoFocus variant='contained' color='primary'>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChangeStatusModal;
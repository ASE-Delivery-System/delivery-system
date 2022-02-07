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

function ChangeStatusBoxModal(props) {
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
            console.log(bodyToSend);

            DispatcherService.changeStatusBox(element, bodyToSend)
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
                            <MenuItem value={'EMPTY'}>Empty</MenuItem>
                            <MenuItem value={'TAKEN'}>Taken</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
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

export default ChangeStatusBoxModal;
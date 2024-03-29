import {makeStyles} from '@mui/styles';
import {Button, Paper, Stack,} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {DataGrid, GridToolbar} from "@mui/x-data-grid";

import DispatcherService from "../services/dispatcher.service";
import NewDeliveryModal from "../components/Deliveries/NewDeliveryModal";
import DeleteDeliveryModal from "../components/Deliveries/DeleteDeliveryModal";
import ChangeStatusModal from "../components/Deliveries/ChangeStatusModal";

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'center',
    },
    boxManagementRoot: {
        margin: 'auto',
        height: '60vh',
        minHeight: '50vh',
        paddingTop: 10,
    },
    boxManagementPaper: {
        width: '1000px',
        padding: theme.spacing(4),
    },

    boxManagementRow: {
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

const columns = [
    { field: 'id', headerName: 'Tracking Code', width: 210 },
    { field: 'targetBox', headerName: 'Target Box', width: 130 },
    { field: 'targetCustomer', headerName: 'Target Customer', width: 190 },
    { field: 'deliverer', headerName: 'Deliverer', width: 190 },
    { field: 'status', headerName: 'Status', width: 150 },
];

function ListDeliveries(){
    const classes = useStyles();
    const title = "List of your Deliveries";
    const description = "Manage your deliveries";
    let isDispatcher = false;

    try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if(userData!=null && userData.roles.includes('ROLE_DISPATCHER')) {
            isDispatcher = true
            console.log("Current User:")
            console.log(userData);
        }
    }
    catch (e) {
        console.error(e);
    }

    const [deliveryData, setDeliveryData] = useState([])
    const [dataChanged, setDataChanged] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [changeModalIsOpen, setChangeModalIsOpen] = useState(false);

    function readDeliveries(data) {
        let newRows = [];
        let customer = "";
        let status = "";
        let deliverer =  "";
        let box = "";
        let boxName = "";


        try {
            newRows = data.map( (item) => {
                customer = item.customer;
                deliverer =  item.deliverer;
                box = item.targetBox;
                if(box!= null) {
                    boxName = box.name
                }
                switch(item.status) {
                    case "OUT_FOR_DELIVERY":
                        status = "Out for Delivery"
                        break;
                    case "IN_DEPOT":
                        status = "In Deposit"
                        break;
                    case "DELIVERED":
                        status = "Delivered"
                        break;
                    case "PICKED_UP":
                        status = "Picked Up"
                        break;
                    default:
                        status = "undefined"
                }
                return {
                    "id": item.id,
                    "targetBox": boxName,
                    "targetCustomer": customer.firstName + " " + customer.lastName,
                    "deliverer": deliverer.firstName + " " + deliverer.lastName,
                    "status": status,
                }
                //newRows.push(itemInfo)
            });
        }
        catch (e) {
            console.error(e);
        }

        return newRows;
    }

    try {
        useEffect(()=>{
            if(isDispatcher) {
                DispatcherService.getDeliveries()
                    .then(function (response) {
                        //console.log(response);
                        setDeliveryData(readDeliveries(response.data));
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        }, [])

    }
    catch (e) {
        console.error(e);
    }

    function openCreateModalHandler() {
        setCreateModalIsOpen(true);
    }
    function closeCreateModalHandler() {
        setCreateModalIsOpen(false)
    }

    function openDeleteModalHandler() {
        setDeleteModalIsOpen(true);
    }
    function closeDeleteModalHandler() {
        setDeleteModalIsOpen(false)
    }

    function openChangeModalHandler() {
        setChangeModalIsOpen(true);
    }
    function closeChangeModalHandler() {
        setChangeModalIsOpen(false)
    }

    function dataChangedHandler() {
        setDataChanged(true);
    }

    if(dataChanged && isDispatcher){
        try {
            DispatcherService.getDeliveries()
                .then(function (response) {
                    setDeliveryData(readDeliveries(response.data));
                    setDataChanged(false);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        catch (e){
            console.error(e);
            setDataChanged(false);
        }
    }

    const handleSelectionChange = (selection) => {
        setSelectedIds(selection);
        //console.log(selection);
    };
    //console.log(selectedIds);

    return (<div className={classes.container}>
                <h1> {title} </h1>
                <h3> {description} </h3>
                    <Stack spacing={2} direction="row">
                        <Button onClick={openCreateModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Create
                        </Button>
                        <NewDeliveryModal handleOpen={openCreateModalHandler} handleClose={closeCreateModalHandler} open={createModalIsOpen} update={dataChangedHandler} loggedIn={isDispatcher}/>
                        <Button onClick={openDeleteModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Delete
                        </Button>
                        <DeleteDeliveryModal selectedRows={selectedIds} handleOpen={openDeleteModalHandler} handleClose={closeDeleteModalHandler} open={deleteModalIsOpen} update={dataChangedHandler}/>
                        <Button onClick={openChangeModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Change Status
                        </Button>
                        <ChangeStatusModal selectedRows={selectedIds} handleOpen={openChangeModalHandler} handleClose={closeChangeModalHandler} open={changeModalIsOpen} update={dataChangedHandler}/>
                    </Stack>
                <Paper className={classes.boxManagementPaper} component='form'>
                    <div className={classes.container}>
                        <div style={{ height: 950, width: '100%' }}>
                            <DataGrid
                                rows={deliveryData}
                                columns={columns}
                                editMode="row"
                                pageSize={15}
                                rowsPerPageOptions={[15]}
                                checkboxSelection
                                disableSelectionOnClick
                                onSelectionModelChange={handleSelectionChange}
                                HorizontalAlign="Center"
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                            />
                        </div>
                    </div>
                </Paper>
            </div>);
}

export default ListDeliveries

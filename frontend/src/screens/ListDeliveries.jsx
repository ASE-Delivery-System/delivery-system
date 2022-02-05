import {makeStyles} from '@mui/styles';
import {Button, Paper, Stack,} from '@mui/material';
import React, {useEffect, useState} from 'react';

import DispatcherService from "../services/dispatcher.service";
import NewDeliveryModal from "../components/Deliveries/NewDeliveryModal";
import DeleteDeliveryModal from "../components/Deliveries/DeleteDeliveryModal";
import ChangeStatusModal from "../components/Deliveries/ChangeStatusModal";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";

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
    { field: 'targetBox', headerName: 'Target Box', width: 200 },
    { field: 'targetCustomer', headerName: 'Target Customer', width: 200 },
    { field: 'deliverer', headerName: 'Deliverer', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
];


//    console.log(dispatcherId);
function ListDeliveries(){
    const classes = useStyles();
    const title = "List of your Deliveries";
    const description = "Manage your deliveries";

    const [UserData, setUserData] = useState([])
    function readDeliveries(data) {
        let newRows = [];
        let customer = "";
        let status = "";
        let deliverer =  "";
        let box = "";

        try {
            newRows = data.map( (item) => {
                customer = item.customer;
                deliverer =  item.deliverer;
                box = item.targetBox.name;

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
                    default:
                        status = "undefined"
                }
                return {
                    "id": item.id,
                    "targetBox": box,
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
            DispatcherService.getDeliveries()
                .then(function (response) {
                    console.log(response);
                    setUserData(readDeliveries(response.data));
                })
                .catch((error) => {
                    console.log(error)
                })
        }, [])
        console.log(UserData)
        //rows = readDeliveries(UserData);
    }
    catch (e) {
        console.error(e);
    }
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [changeModalIsOpen, setChangeModalIsOpen] = useState(false);

    function openCreateModalHandler() {
        // switch to the state where the modal is open
        setCreateModalIsOpen(true);
    }
    function closeCreateModalHandler() {
        setCreateModalIsOpen(false)
    }

    function openDeleteModalHandler() {
        // switch to the state where the modal is open
        setDeleteModalIsOpen(true);
    }
    function closeDeleteModalHandler() {
        setDeleteModalIsOpen(false)
    }

    function openChangeModalHandler() {
        // switch to the state where the modal is open
        setChangeModalIsOpen(true);
    }
    function closeChangeModalHandler() {
        setChangeModalIsOpen(false)
    }

    //const [rows, setRows] = useState(readDeliveries(UserData));
    const [selectedIds, setSelectedIds] = useState([]);
    const [deletedRows, setDeletedRows] = useState([]);
    const [purgeMode, setPurgeMode] = useState(true);

    const handleSelectionChange = (selection) => {
        //setSelectedRows(selection.rows);
        //console.log(selectedRows)
        setSelectedIds(selection);
        //const selectedRowData = rows.filter((row) =>
        console.log(selection);
    };
    console.log(selectedIds);

    const handlePurge = () => {
       /* setDeletedRows([
            ...deletedRows,
            ...rows.filter(
                (r) => selectedRows.filter((sr) => sr.id === r.id).length < 1
            )
        ]);
        setRows(selectedRows);
        setPurgeMode(false);*/
    };

    return (<div className={classes.container}>
                <h1> {title} </h1>
                <h3> {description} </h3>
                    <Stack spacing={2} direction="row">
                        <Button onClick={openCreateModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Create
                        </Button>
                        <NewDeliveryModal handleOpen={openCreateModalHandler} handleClose={closeCreateModalHandler} open={createModalIsOpen}/>
                        <Button onClick={openDeleteModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Delete
                        </Button>
                        <DeleteDeliveryModal selectedRows={selectedIds} handleOpen={openDeleteModalHandler} handleClose={closeDeleteModalHandler} open={deleteModalIsOpen}/>
                        <Button onClick={openChangeModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Change Status
                        </Button>
                        <ChangeStatusModal selectedRows={selectedIds} handleOpen={openChangeModalHandler} handleClose={closeChangeModalHandler} open={changeModalIsOpen}/>
                    </Stack>
                <Paper className={classes.boxManagementPaper} component='form'>
                    <div className={classes.container}>
                        <div style={{ height: 800, width: '100%' }}>
                            <DataGrid
                                rows={UserData}
                                columns={columns}
                                editMode="row"
                                pageSize={15}
                                rowsPerPageOptions={[15]}
                                checkboxSelection
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
//selectedIDs.has(row.id.toString));
import React, {useEffect, useState} from 'react'
import {Button, Paper, Stack} from "@mui/material";
import {makeStyles} from "@mui/styles";
import ChangeStatusModal from "../components/Deliveries/ChangeStatusModal";
import DelivererService from "../services/deliverer.service";
import ProjectTable from "../components/ProjectTable";

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
        paddingTop: 5,
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

let delivererId = '';

try {
    delivererId = JSON.parse(localStorage.getItem('user')).id;
}
catch (e) {
    console.log(e)
}

const columns = [
    { field: 'targetBox', headerName: 'Target Box', width: 200 },
    { field: 'targetCustomer', headerName: 'Target Customer', width: 200 },
    { field: 'deliverer', headerName: 'Deliverer', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
];

const Deliverer = () => {    const classes = useStyles();
    const title = "List of your Deliveries";
    const description = "Manage your deliveries";
    let selectedIDs = new Set();
    let rows = []

    let delivererId = '';
    let delivererData = '';

    delivererData = JSON.parse(localStorage.getItem('user'));
    delivererId = delivererData.id;

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
            DelivererService.getDeliveries(delivererId)
                .then(function (response) {
                    console.log(response);
                    setUserData(readDeliveries(response.data));
                    //setRows(getDeliveries(UserData));
                })
                .catch((error) => {
                    console.log(error)
                })

            //setUserData(res.data)
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

    //const [rows, setRows] = useState(getDeliveries(UserData));
    const [selectedRows, setSelectedRows] = useState([]);
    const [deletedRows, setDeletedRows] = useState([]);
    const [purgeMode, setPurgeMode] = useState(true);

    const handleSelectionChange = (selection) => {
        setSelectedRows(selection.rows);
        console.log(selectedRows)
    };

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
            <Button onClick={openChangeModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                Change Status
            </Button>
            <ChangeStatusModal handleOpen={openChangeModalHandler} handleClose={closeChangeModalHandler} open={changeModalIsOpen}/>
        </Stack>
        <Paper className={classes.boxManagementPaper} component='form'>
            <ProjectTable title={title} description={description} columns={columns} rows={UserData}/>
        </Paper>
    </div>);
}

export default Deliverer

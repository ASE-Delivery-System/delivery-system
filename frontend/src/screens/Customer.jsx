import React, {useEffect, useState} from 'react'
import {Button, Paper, Stack} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import CustomerService from "../services/customer.service";

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
    { field: 'box', headerName: 'Box', width: 200 },
    { field: 'trackingCode', headerName: 'Tracking Code', width: 250 },
    { field: 'status', headerName: 'Status', width: 250 },

];

let customerId = '61d63a54b4b0ec48de7ad888';

try {
    customerId = JSON.parse(localStorage.getItem('user')).id;
}
catch (e) {
    console.log(e)
}

const Customer = () => {
    const classes = useStyles();
    const title = "List of your Deliveries";
    const description = "Manage your deliveries";
    let selectedIDs = new Set();
    let rows = []

    const [UserData, setUserData] = useState([])
    function getDeliveries(data) {
        let newRows = [];
        let status = "";
        let tracking =  "";
        let box = "";


        try {
            newRows = data.map( (item) => {
                tracking =  item.id;
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
                    "box": box,
                    "trackingCode": tracking,
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
            CustomerService.getActiveDeliveries(customerId)
                .then((data) => {
                    setUserData(data.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }, [])
        console.log(UserData)
        rows = getDeliveries(UserData);
    }
    catch (e) {
        console.error(e);
    }

    function activeDeliveriesHandler() {
        // change data shown

    }

    function pastDeliveriesHandler() {
        // change data shown

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
            <Button onClick={activeDeliveriesHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                Active Deliveries
            </Button>
            <Button onClick={pastDeliveriesHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                Past Deliveries
            </Button>
        </Stack>
        <Paper className={classes.boxManagementPaper} component='form'>
            <div className={classes.container}>
                <div style={{ height: 800, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        editMode="row"
                        pageSize={15}
                        rowsPerPageOptions={[15]}
                        checkboxSelection
                        //onSelectionModelChange={handleSelectionChange}
                        /*{(ids) => {
                        selectedIDs = new Set(ids);
                        const selectedRowData = rows.filter((row) =>
                            selectedIDs.has(row.id.toString());
                    );
                        console.log(selectedIDs);
                    }}*/

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

export default Customer

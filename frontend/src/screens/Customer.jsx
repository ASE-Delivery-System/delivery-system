import React, {useEffect, useState} from 'react'
import {Button, Paper, Stack} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import CustomerService from "../services/customer.service";
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

const Customer = () => {
    let customerId = '';
    let customerData = '';
    let customerUsername = '';
    let isCustomer = false;

    const classes = useStyles();

    const title = "List of your Deliveries, ";
    const description = "Manage your deliveries";
    const [deliveriesData, setDeliveriesData] = useState([])


    try {
        customerData = JSON.parse(localStorage.getItem('user'));
        if(customerData!=null && customerData.roles.includes('ROLE_CUSTOMER')) {
            customerId = customerData.id;
            customerUsername = customerData.username;
            isCustomer = true;
            console.log("Current User")
            console.log(customerData);
        }
    }
    catch (e) {
        console.error(e);
    }

    function readDeliveries(data) {
        let newRows = [];
        let status = "";
        let tracking =  "";
        let box = "";
        let boxName = "";

        try {
            newRows = data.map( (item) => {
                tracking =  item.id;
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
                    "box": boxName,
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
            if(isCustomer) {
                CustomerService.getActiveDeliveries(customerId)
                    .then(function (response) {
                        //console.log(response);
                        setDeliveriesData(readDeliveries(response.data));
                    })
            }
            //setUserData(res.data)
        }, [])
    }
    catch (e) {
        console.error(e)
    }

    function activeDeliveriesHandler() {
        try {
            if (isCustomer) {
                CustomerService.getActiveDeliveries(customerId)
                    .then(function (response) {
                        //console.log(response);
                        setDeliveriesData(readDeliveries(response.data));
                    })
            }
        }
        catch (e) {
            console.error(e)
        }
    }

    function pastDeliveriesHandler() {
        try {
            if (isCustomer) {
                CustomerService.getPastDeliveries(customerId)
                    .then(function (response) {
                        //console.log(response);
                        setDeliveriesData(readDeliveries(response.data));
                    })
            }
        }
        catch (e) {
            console.error(e)
        }
    }

    return (<div className={classes.container}>
        <h1> {title} {customerUsername}</h1>
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
            <ProjectTable title={title} description={description} columns={columns} rows={deliveriesData}/>
        </Paper>
    </div>);
}

export default Customer

import React, {useEffect, useState} from 'react'
import ProjectTable from "../components/ProjectTable";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {Button, Paper} from "@mui/material";
import {makeStyles} from "@mui/styles";
import DispatcherService from "../services/dispatcher.service";

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
    { field: 'box', headerName: 'Box', type: 'number', width: 150 },
    { field: 'trackingCode', headerName: 'Tracking Code', width: 200 },
    { field: 'deliveryDate', headerName: 'Delivery Date', width: 200 },

];

function getDeliveries(data) {
    let newRows = [];

    let box = "";
    let trackingCode = "";
    let deliveryDate =  "";
    let status = "";

    try {
        data.map( (item) => {
            box = item.box;
            trackingCode = item.trackingCode;
            deliveryDate =  item.deliveryDate;

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

            let itemInfo = { "id": item.id,
                "box": box,
                "trackingCode": trackingCode,
                "deliveryDate": deliveryDate,
                "status": status,
            };
            newRows.push(itemInfo)});


    }
    catch (e) {
        console.error(e);
    }

    return newRows;

}



const Customer = () => {
    const classes = useStyles();
    const title = "List of your Deliveries";
    const description = "Manage your deliveries";

    const [UserData, setUserData] = useState([])

    function activeDeliveriesHandler() {

    }

    function pastDeliveriesHandler() {

    }

    try {
        useEffect(()=>{
            DispatcherService.getDeliveries()
                .then((data) => {
                    setUserData(data.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }, [])
        console.log(UserData)
    }
    catch (e) {

    }


    return (<div className={classes.container}>
        <h1> {title} </h1>
        <h3> {description} </h3>
        <ButtonToolbar>
            <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                Active Deliveries
            </Button>{' '}
            <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                Past Deliveries
            </Button>
        </ButtonToolbar>
        <Paper className={classes.boxManagementPaper} component='form'>
            <ProjectTable title={title} description={description} columns={columns} rows={getDeliveries(UserData)}/>
        </Paper>
    </div>);
}

export default Customer

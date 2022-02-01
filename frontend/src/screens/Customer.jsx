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

const rows = [
    { id: 1,box: 1, trackingCode: 'Snow', deliveryDate: 'Jon'},
    { id: 2,box: 2, trackingCode: 'Lannister', deliveryDate: 'Cersei'},
    { id: 3,box: 3, trackingCode: 'Lannister', deliveryDate: 'Jaime'},
    { id: 4,box: 4, trackingCode: 'Stark', deliveryDate: 'Arya'},
    { id: 5,box: 5, trackingCode: 'Targaryen', deliveryDate: 'Daenerys'},
    { id: 6,box: 6, trackingCode: 'Melisandre', deliveryDate: null},
    { id: 7,box: 7, trackingCode: 'Clifford', deliveryDate: 'Ferrara'},
    { id: 8,box: 8, trackingCode: 'Frances', deliveryDate: 'Rossini'},
    { id: 9,box: 9, trackingCode: 'Roxie', deliveryDate: 'Harvey'},
];

function getDeliveries(data) {
    let newRows = [];

    data.map( (item) => {
        let box = item.box;
        let trackingCode = item.trackingCode;
        let deliveryDate =  item.deliveryDate;
        let status = "";

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
            "box": box.name,
            "trackingCode": trackingCode,
            "deliveryDate": deliveryDate,
            "status": status,
        };
        newRows.push(itemInfo)});

    return newRows;
}



const Customer = () => {
    const classes = useStyles();
    const title = "List of your Deliveries";
    const description = "Manage your deliveries";

    const [loadingData, setLoadingData] = useState(true);
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
            <ProjectTable title={title} description={description} columns={columns} rows={rows}/>
        </Paper>
    </div>);
}

export default Customer

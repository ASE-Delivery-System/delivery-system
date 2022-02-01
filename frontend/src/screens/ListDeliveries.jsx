import { makeStyles } from '@mui/styles'
import {
    Paper,
    Button,
    TextField,
    RadioGroup,
    FormLabel,
    FormControl,
    FormControlLabel,
    Radio,
    ButtonGroup
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

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
    { field: 'targetBox', headerName: 'Target Box', type: 'number', width: 130 },
    { field: 'targetCustomer', headerName: 'Target Customer', width: 200 },
    { field: 'deliverer', headerName: 'Deliverer', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'orderedOn', headerName: 'Ordered On', width: 130 },
    { field: 'pickedOn', headerName: 'Picked On', width: 130 },
];

const rows = [
    { id: 1, targetBox: 1, orderedOn: 'Tuesday 18th', pickedOn: 'Today',status: 'delivered', targetCustomer: 'Snow', deliverer: 'Jon'},
    { id: 2, targetBox: 2, orderedOn: 'Tuesday 11th', pickedOn: 'Today',status: 'to be delivered', targetCustomer: 'Lannister', deliverer: 'Cersei'},
    { id: 3, targetBox: 3, orderedOn: 'Tuesday 18th', pickedOn: 'Yesterday',status: 'delivered', targetCustomer: 'Lannister', deliverer: 'Jaime'},
    { id: 4, targetBox: 4, orderedOn: 'Tuesday 18th', pickedOn: 'Today',status: 'to be delivered', targetCustomer: 'Stark', deliverer: 'Arya'},
    { id: 5, targetBox: 5, orderedOn: 'Tuesday 18th', pickedOn: 'Yesterday',status: 'to be delivered', targetCustomer: 'Targaryen', deliverer: 'Daenerys'},
    { id: 6, targetBox: 6, orderedOn: 'Tuesday 04th', pickedOn: 'Today',status: 'to be delivered', targetCustomer: 'Melisandre', deliverer: null},
    { id: 7, targetBox: 7, orderedOn: 'Tuesday 11th', pickedOn: 'Yesterday',status: 'delivered', targetCustomer: 'Clifford', deliverer: 'Ferrara'},
    { id: 8, targetBox: 8, orderedOn: 'Tuesday 18th', pickedOn: 'Yesterday',status: 'delivered', targetCustomer: 'Frances', deliverer: 'Rossini'},
    { id: 9, targetBox: 9, orderedOn: 'Tuesday 18th', pickedOn: 'Today',status: 'delivered', targetCustomer: 'Roxie', deliverer: 'Harvey'},
];

function ListDeliveries(){
    const classes = useStyles();
    const title = "List of your Deliveries";
    const description = "Manage your deliveries";

    return (<div className={classes.container}>
                <h1> {title} </h1>
                <h3> {description} </h3>
                    <ButtonToolbar>
                        <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Create
                        </Button>{' '}
                        <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Edit
                        </Button>{' '}
                        <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Delete
                        </Button>{' '}
                        <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Change Status
                        </Button>
                    </ButtonToolbar>
                <Paper className={classes.boxManagementPaper} component='form'>
                    <ProjectTable title={title} description={description} columns={columns} rows={rows}/>
                </Paper>
            </div>);
}

export default ListDeliveries
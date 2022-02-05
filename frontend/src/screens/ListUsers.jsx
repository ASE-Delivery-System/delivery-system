import {makeStyles} from '@mui/styles';
import {Button, Paper, Stack,} from '@mui/material';
import React, {useEffect, useState} from 'react';
import DispatcherService from "../services/dispatcher.service";
import DeleteUserModal from "../components/Users/DeleteUserModal";
import NewUserModal from "../components/Users/NewUserModal";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'center',
    },
    userManagementRoot: {
        margin: 'auto',
        height: '60vh',
        minHeight: '50vh',
        paddingTop: 10,
    },
    userManagementPaper: {
        width: '1000px',
        padding: theme.spacing(4),
    },

    userManagementRow: {
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
   {title: "Username", field : "username", headerName: "Username", editable: true},
   {title: "Email", field : "email", headerName: "Email", editable: true},
   {title: "First Name", field : "firstName", headerName: "First Name", editable: true},
   {title: "Last Name", field : "lastName", headerName: "Last Name", editable: true},
   {title: "Address", field : "address", width: 100, headerName: "Address", editable: true},
   {title: "RFID Token", field : "rfidToken", width: 100, headerName: "RFID Token", editable: true},
   {title: "Role", field : "roles", headerName: "Roles", editable: true},
];


//    console.log(dispatcherId);
function ListUsers(){
    const classes = useStyles();
    const title = "List of your Users";
    const description = "Manage your users";

    const [UserData, setUserData] = useState([])
    function readUsers(data) {
        let newRows = [];
        let username = "";
        let email = "";
        let firstName = "";
        let lastName = "";
        let address = "";
        let rfidToken = "";
        let roles =  "";
        let id = "";

        try {
            newRows = data.map( (item) => {
                id = item.id;
                username = item.username;
                email =  item.email;
                firstName = item.firstName
                lastName = item.lastName
                address = item.address
                rfidToken = item.rfidToken

                return {
                    "id": item.id,
                    "username": item.username,
                    "email": item.email,
                    "firstName": item.firstName,
                    "lastName": item.lastName,
                    "address": item.address,
                    "rfidToken": item.rfidToken,
                    "roles" : item.roles.map((roles) => {
                                 switch (roles.name) {
                                     case "ROLE_DELIVERER":
                                         return "Deliverer";
                                     case "ROLE_CUSTOMER":
                                         return "Customer";
                                     case "ROLE_DISPATCHER":
                                         return "Dispatcher";
                                 }
                             })
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
            DispatcherService.getUsers()
                .then(function (response) {
                    console.log(response);
                    setUserData(readUsers(response.data));
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
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [status, setStatus] = useState('')
    const [setSubmitted] = useState(false)
    const handleSelectionChange = (selection) => {
        //setSelectedRows(selection.rows);
        //console.log(selectedRows)
        setSelectedIds(selection);
        //const selectedRowData = rows.filter((row) =>
        console.log(selection);
    };
    console.log(selectedIds);

    const handleSave = (e) => {
         //changing input once already entered
           const handleName = (e) => {
             setName(e.target.value)
             setSubmitted(false)
           }

           const handleAddress = (e) => {
             setAddress(e.target.value)
             setSubmitted(false)
           }

           const handleStatus = (e) => {
             setStatus(e.target.value)
             setSubmitted(false)
           }
         console.log("entered the save")
         console.log(selectedIds);

         }

    return (<div className={classes.container}>
                <h1> {title} </h1>
                <h3> {description} </h3>
                    <Stack spacing={2} direction="row">
                        <Button onClick={openCreateModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Create
                        </Button>
                        <NewUserModal handleOpen={openCreateModalHandler} handleClose={closeCreateModalHandler} open={createModalIsOpen}/>
                        <Button onClick={openDeleteModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Delete
                        </Button>
                        <DeleteUserModal selectedRows={selectedIds} handleOpen={openDeleteModalHandler} handleClose={closeDeleteModalHandler} open={deleteModalIsOpen}/>
                        <Button onClick={openChangeModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Edit Users
                        </Button>
                    </Stack>
                <Paper className={classes.userManagementPaper} component='form'>
                    <div className={classes.container}>
                        <div style={{ height: 800, width: '100%' }}>
                            <DataGrid
                                rows={UserData}
                                columns={columns}
                                pageSize={15}
                                rowsPerPageOptions={[15]}
                                checkboxSelection
                                onSelectionModelChange={handleSelectionChange}
                                editMode="row"
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

export default ListUsers
//selectedIDs.has(row.id.toString));
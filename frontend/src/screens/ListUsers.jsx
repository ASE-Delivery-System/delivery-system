import {makeStyles} from '@mui/styles';
import {Button, Paper, Stack,} from '@mui/material';
import React, {useEffect, useState} from 'react';
import DispatcherService from "../services/dispatcher.service";
import DeleteUserModal from "../components/Users/DeleteUserModal";
import NewUserModal from "../components/Users/NewUserModal";
import EditUserModal from "../components/Users/EditUserModal";
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
   {title: "Username", field : "username", headerName: "Username",width: 125, editable: true},
   {title: "Email", field : "email", headerName: "Email", width: 200,editable: true},
   {title: "First Name", field : "firstName", headerName: "First Name", editable: true},
   {title: "Last Name", field : "lastName", headerName: "Last Name", editable: true},
   {title: "Address", field : "address", width: 250, headerName: "Address", editable: true},
   {title: "RFID Token", field : "rfidToken", width: 100, headerName: "RFID Token", editable: true},
   {title: "Role", field : "rolesName", headerName: "Role", editable: true},
];

function ListUsers(){
    const classes = useStyles();
    const title = "List of your Users";
    const description = "Manage your users";

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

    const [UserData, setUserData] = useState([])
    const [dataChanged, setDataChanged] = useState(false);

    function readUsers(data) {
        let newRows = [];
        let username = "";
        let email = "";
        let firstName = "";
        let lastName = "";
        let address = "";
        let rfidToken = "";
        let roles = [];
        let rolesName =  "";
        let rolesId =  "";
        let id = "";

        try {
            newRows = data.map( (item) => {
                id = item.id;
                username = item.username;
                email =  item.email;
                firstName = item.firstName;
                lastName = item.lastName;
                address = item.address;
                rfidToken = item.rfidToken;
                roles = item.roles;

                if (roles[0].name === "ROLE_DELIVERER") {
                    rolesName = "deliverer";
                    rfidToken = null
                } else if (roles[0].name === "ROLE_CUSTOMER") {
                    rolesName = "customer";
                } else if (roles[0].name === "ROLE_DISPATCHER") {
                    rolesName = "dispatcher";
                }

                return {
                    "id": item.id,
                    "username": item.username,
                    "email": item.email,
                    "firstName": item.firstName,
                    "lastName": item.lastName,
                    "address": item.address,
                    "rfidToken": rfidToken,
                    "roles" : roles[0].name,
                    "rolesName": rolesName,
                    "rolesId": roles[0].id
                }
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
                DispatcherService.getUsers()
                    .then(function (response) {
                        setUserData(readUsers(response.data));
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }, [])
    }
    catch (e) {
        console.error(e);
    }

    console.log(UserData)
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [changeModalIsOpen, setChangeModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

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

    function openEditModalHandler() {
        // switch to the state where the modal is open
        setEditModalIsOpen(true);
    }
    function closeEditModalHandler() {
        setEditModalIsOpen(false)
    }

    function openChangeModalHandler() {
        // switch to the state where the modal is open
        setChangeModalIsOpen(true);
    }
    function closeChangeModalHandler() {
        setChangeModalIsOpen(false)
    }


    function dataChangedHandler() {
        setDataChanged(true);
    }

    if(dataChanged && isDispatcher){
        DispatcherService.getUsers()
            .then(function (response) {
                //console.log(response);
                setUserData(readUsers(response.data));
                setDataChanged(false);
            })
            .catch((error) => {
                console.log(error)
            })
        setDataChanged(false);
    }

    const [selectedIds, setSelectedIds] = useState([]);
    const [clickedRow, setClickedRow] = useState([]);

    const [setSubmitted] = useState(false)
    const handleSelectionChange = (selection) => {
        setSelectedIds(selection);
    };

    const handleRowClick = (row) => {
        //Open an edit modal
        setEditModalIsOpen(true);
        setClickedRow(row.row);
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
                        <DeleteUserModal selectedRows={selectedIds} handleOpen={openDeleteModalHandler} handleClose={closeDeleteModalHandler} open={deleteModalIsOpen} update={dataChangedHandler}/>
                        {editModalIsOpen ? <EditUserModal clickedRow={clickedRow} handleOpen={openEditModalHandler} handleClose={closeEditModalHandler} open={editModalIsOpen} update={dataChangedHandler}/> : ''}
                    </Stack>
                <Paper className={classes.userManagementPaper} component='form'>
                    <div className={classes.container}>
                        <div style={{ height: 950, width: '100%' }}>
                            <DataGrid
                                rows={UserData}
                                columns={columns}
                                pageSize={15}
                                rowsPerPageOptions={[15]}
                                checkboxSelection
                                disableSelectionOnClick
                                onSelectionModelChange={handleSelectionChange}
                                onRowDoubleClick={handleRowClick}
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
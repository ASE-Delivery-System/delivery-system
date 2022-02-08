import {makeStyles} from '@mui/styles';
import {Button, Paper, Stack,} from '@mui/material';
import React, {useEffect, useState} from 'react';
import DispatcherService from "../services/dispatcher.service";
import EditBoxModal from "../components/Boxes/EditBoxModal";
import DeleteBoxModal from "../components/Boxes/DeleteBoxModal";
import NewBoxModal from "../components/Boxes/NewBoxModal";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import ChangeStatusBoxModal from "../components/Boxes/ChangeStatusBoxModal";

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
    { field: 'id', headerName: 'Box ID', width: 250},
    { field: 'name', headerName: 'Box Name', width: 200},
    { field: 'address', headerName: 'Box Address', width: 200},
    { field: 'status', headerName: 'Box Status', width: 200},
];

function ListBoxes(){
    const classes = useStyles();
    const title = "List of your Boxes";
    const description = "Manage your boxes";
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

    const [BoxData, setBoxData] = useState([])
    const [dataChanged, setDataChanged] = useState(false);

    function readBoxes(data) {
        let newRows = [];
        let name = "";
        let address = "";
        let status =  "";
        let id = "";

        try {
            newRows = data.map( (item) => {
                id = item.id;
                name = item.name;
                status =  item.status;
                address = item.address
                return {
                    "id": id,
                    "name": name,
                    "status": status,
                    "address": address,
                    "customer": item.customer,
                    "deliverer": item.deliverer,
                    "deliveries": item.deliveries
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
                DispatcherService.getBoxes()
                    .then(function (response) {
                        //console.log(response);
                        setBoxData(readBoxes(response.data));
                    })
                    .catch((error) => {
                        //console.log(error)
                    })
            }
        }, [])
    }
    catch (e) {
        console.error(e);
    }
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
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

    function openEditModalHandler() {
        // switch to the state where the modal is open
        setEditModalIsOpen(true);
    }
    function closeEditModalHandler() {
        setEditModalIsOpen(false)
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
            DispatcherService.getBoxes()
                .then(function (response) {
                    //console.log(response);
                    setBoxData(readBoxes(response.data));
                    setDataChanged(false);
                })
                .catch((error) => {
                    //console.log(error)
                })
        }
        catch (e) {
            console.error(e)
        }
    }

    const [selectedIds, setSelectedIds] = useState([]);
    const [clickedRow, setClickedRow] = useState([]);

    const handleSelectionChange = (selection) => {
        setSelectedIds(selection);
        //console.log(selection);
    };

    const handleRowClick = (row) => {
        //Open an edit modal
        //console.log(row);
        setEditModalIsOpen(true);
        setClickedRow(row.row);
    }
    //console.log(selectedIds);
    //console.log(editModalIsOpen);

    return (<div className={classes.container}>
                <h1> {title} </h1>
                <h3> {description} </h3>
                    <Stack spacing={2} direction="row">
                        <Button onClick={openCreateModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Create
                        </Button>
                        <NewBoxModal handleOpen={openCreateModalHandler} handleClose={closeCreateModalHandler} open={createModalIsOpen} update={dataChangedHandler}/>
                        <Button onClick={openDeleteModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Delete
                        </Button>
                        <DeleteBoxModal selectedRows={selectedIds} handleOpen={openDeleteModalHandler} handleClose={closeDeleteModalHandler} open={deleteModalIsOpen} update={dataChangedHandler}/>
                        <Button onClick={openChangeModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Change Status
                        </Button>
                        <ChangeStatusBoxModal selectedRows={selectedIds} handleOpen={openChangeModalHandler} handleClose={closeChangeModalHandler} open={changeModalIsOpen} update={dataChangedHandler}/>

                        {editModalIsOpen ? <EditBoxModal clickedRow={clickedRow} handleOpen={openEditModalHandler} handleClose={closeEditModalHandler} open={editModalIsOpen} update={dataChangedHandler}/> : ''}
                    </Stack>
                <Paper className={classes.boxManagementPaper} component='form'>
                    <div className={classes.container}>
                        <div style={{ height: 950, width: '100%' }}>
                            <DataGrid
                                rows={BoxData}
                                columns={columns}
                                pageSize={15}
                                rowsPerPageOptions={[15]}
                                checkboxSelection
                                disableSelectionOnClick
                                onSelectionModelChange={handleSelectionChange}
                                onRowClick={handleRowClick}
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

export default ListBoxes

import {makeStyles} from '@mui/styles';
import {Button, Paper, Stack,} from '@mui/material';
import React, {useEffect, useState} from 'react';
import DispatcherService from "../services/dispatcher.service";
import EditBoxModal from "../components/Boxes/EditBoxModal";
import DeleteBoxModal from "../components/Boxes/DeleteBoxModal";
import NewBoxModal from "../components/Boxes/NewBoxModal";
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
    { field: 'id', headerName: 'Box ID', width: 200, editable: 'false'  },
    { field: 'name', headerName: 'Box Name', width: 200, editable:'true'  },
    { field: 'address', headerName: 'Box Address', width: 200, editable:'true'  },
    { field: 'status', headerName: 'Box Status', width: 200, editable:'true'  },
];


//    console.log(dispatcherId);
function ListDeliveries(){
    const classes = useStyles();
    const title = "List of your Boxes";
    const description = "Manage your boxes";

    const [BoxData, setBoxData] = useState([])
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
                    "id": item.id,
                    "name": item.name,
                    "address": item.address,
                    "status": item.status,
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
            DispatcherService.getBoxes()
                .then(function (response) {
                    console.log(response);
                    setBoxData(readBoxes(response.data));
                })
                .catch((error) => {
                    console.log(error)
                })
        }, [])
        console.log(BoxData)
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
         for (const element of selectedIds) {
         DispatcherService.postBox(selectedIds)
             .then(function (selectedIds) {
                 console.log(selectedIds);
             })
             .catch((error) => {
             console.log(error.response)
             })
           }
         }

    return (<div className={classes.container}>
                <h1> {title} </h1>
                <h3> {description} </h3>
                    <Stack spacing={2} direction="row">
                        <Button onClick={openCreateModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Create
                        </Button>
                        <NewBoxModal handleOpen={openCreateModalHandler} handleClose={closeCreateModalHandler} open={createModalIsOpen}/>
                        <Button onClick={openDeleteModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Delete
                        </Button>
                        <DeleteBoxModal selectedRows={selectedIds} handleOpen={openDeleteModalHandler} handleClose={closeDeleteModalHandler} open={deleteModalIsOpen}/>
                        <Button onClick={openChangeModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Edit Boxes
                        </Button>
                        <EditBoxModal selectedRows={selectedIds} handleOpen={openChangeModalHandler} handleClose={closeChangeModalHandler} open={changeModalIsOpen}/>
                        <Button onClick={handleSave} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Save
                        </Button>
                    </Stack>
                <Paper className={classes.boxManagementPaper} component='form'>
                    <div className={classes.container}>
                        <div style={{ height: 800, width: '100%' }}>
                            <DataGrid
                                rows={BoxData}
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

export default ListDeliveries
//selectedIDs.has(row.id.toString));
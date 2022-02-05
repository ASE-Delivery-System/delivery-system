import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import {makeStyles} from "@mui/styles";

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

function DeliveriesTable(props) {
    const classes = useStyles();

    const rows = props.rows;
    const columns = props.columns;

    let selectedIDs = new Set();

    const [selectionModel, setSelectionModel] = React.useState([]);

    return (
        <div className={classes.container}>
            <div style={{ height: 950, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    pageSize={15}
                    rowsPerPageOptions={[15]}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        selectedIDs = new Set(ids);
                        /*const selectedRowData = rows.filter((row) =>
                            selectedIDs.has(row.id.toString());
                    );*/
                        console.log(selectedIDs);
                    }}

                    HorizontalAlign="Center"
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </div>
        </div>



    );
}

export default DeliveriesTable;



import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Button, TextField, RadioGroup, FormLabel, FormControl, FormControlLabel, Radio} from '@mui/material'

import {makeStyles} from "@mui/styles";

//make columns and rows customable


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

function ProjectTable(props) {
    const classes = useStyles()

    const rows = props.rows
    const columns = props.columns

    return (
        <div className={classes.container}>
                <div style={{ height: 800, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        HorizontalAlign="Center"
                    />
                </div>
        </div>


    );
}

export default ProjectTable


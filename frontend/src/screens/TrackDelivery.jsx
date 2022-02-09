import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import {makeStyles} from "@mui/styles";
import {Box, Button, Container, InputLabel, Paper, TextField} from "@mui/material";
import Card from "@mui/material/Card";
import {useRef, useState} from "react";
import CustomerService from "../services/customer.service";
import {TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'center',
        padding: 70
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

    trackingCard: {
        border: 1,
        position: 'relative',
        width: '400px',
        display: 'flex',
        height: '300px',
        paddingRight: 70,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
}))


const TrackDelivery = () => {
    const classes = useStyles()
    const title = "Track a delivery";
    const description = "Here you can track a delivery using the tracking code";

    const [inDepotStatus, setInDepotStatus] = useState('outlined')
    const [outForDStatus, setOutForDStatus] = useState('outlined')
    const [deliveredStatus, setDeliveredStatus] = useState('outlined')
    const [pickedUpStatus, setPickedUpStatus] = useState('outlined')

    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const trackingNumberRef = useRef()

    function trackHandler() {
        setMessage('')
        setIsError(false)

        setInDepotStatus('outlined')
        setOutForDStatus('outlined')
        setDeliveredStatus('outlined')
        setPickedUpStatus('outlined')

        const deliveryId =  trackingNumberRef.current.value

        if (deliveryId === '') {
            console.log('No tracking code inserted')
            setIsError(true)
            setMessage('No tracking code inserted')
        }
        else {
            try {
                let statusDelivery = ''
                CustomerService.getDeliveryById(deliveryId)
                    .then(function (response) {
                        //console.log(response);

                        statusDelivery = response.data.status
                        switch (statusDelivery) {
                            case "IN_DEPOT":
                                setInDepotStatus('filled')
                                break;
                            case "OUT_FOR_DELIVERY":
                                setInDepotStatus('filled')
                                setOutForDStatus('filled')
                                break;
                            case "DELIVERED":
                                setInDepotStatus('filled')
                                setOutForDStatus('filled')
                                setDeliveredStatus('filled')
                                break;
                            case "PICKED_UP":
                                setInDepotStatus('filled')
                                setOutForDStatus('filled')
                                setDeliveredStatus('filled')
                                setPickedUpStatus('filled')
                                break;
                            default:
                                console.log('Cannot read the status correctly' + statusDelivery)
                        }

                    })
                    .catch((error) => {
                        console.log(error)
                        setIsError(true)
                        setMessage(error.message)
                    })

            }
            catch (e) {
                console.error(e)
                setIsError(true)
                setMessage(e.message)
            }
        }
    }

    return(<div className={classes.container}>
        <h1> {title}</h1>
        <h3> {description} </h3>
        <Paper className={classes.boxManagementPaper}>
            <Box paddingBottom={1}>
                <InputLabel id="trackinCode">Tracking Code</InputLabel>
                <TextField variant='outlined' fullWidth inputRef={trackingNumberRef}/>
                {isError && (
                    <div className='form-group'>
                        <div className='alert alert-danger' role='alert'>
                            {message}
                        </div>
                    </div>
                )}
                <Box style={{ display: 'flex', justifyContent: 'flex-end', paddingTop:10 }}>
                    <Button variant="contained" onClick={trackHandler}> Track </Button>
                </Box>

            </Box>
            <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding:20}} variant='outlined'>
                <Card className={classes.trackingCard}>
                    <Timeline >
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot variant={inDepotStatus} color="grey"/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>In Deposit</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot variant={outForDStatus} color="warning" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Out for Delivery</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot variant={deliveredStatus} color="primary" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Delivered</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot variant={pickedUpStatus} color="success" />
                            </TimelineSeparator>
                            <TimelineContent>Picked Up</TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </Card>
            </Card>
        </Paper>
    </div>)
}
export default TrackDelivery
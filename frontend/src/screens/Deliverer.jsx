import React, { useEffect, useState } from 'react'
import { Button, Paper, Stack } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ChangeStatusModal from '../components/Deliveries/ChangeStatusModal'
import DelivererService from '../services/deliverer.service'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import DOubbleBubble from '../components/Loader/BubbleLoader'

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
    paddingTop: 5,
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
  { field: 'targetBox', headerName: 'Target Box', width: 200 },
  { field: 'targetCustomer', headerName: 'Target Customer', width: 200 },
  { field: 'deliverer', headerName: 'Deliverer', width: 200 },
  { field: 'status', headerName: 'Status', width: 200 },
]

const Deliverer = () => {
  const classes = useStyles()
  const title = 'List of your Deliveries, '
  const description = 'Manage your deliveries'
  let delivererId = ''
  let delivererData = ''
  let delivererUsername = ''

  let isDeliverer = false

  try {
    delivererData = JSON.parse(localStorage.getItem('user'))
    if (delivererData != null && delivererData.roles.includes('ROLE_DELIVERER')) {
      delivererId = delivererData.id
      delivererUsername = delivererData.username
      isDeliverer = true
      console.log('Current User:')
      console.log(delivererData)
    }
  } catch (e) {
    console.error(e)
  }

  const [deliveryData, setDeliveryData] = useState([])
  function readDeliveries(data) {
    let newRows = []
    let customer = ''
    let status = ''
    let deliverer = ''
    let box = ''

    try {
      newRows = data.map((item) => {
        customer = item.customer
        deliverer = item.deliverer
        box = item.targetBox.name

        switch (item.status) {
          case 'OUT_FOR_DELIVERY':
            status = 'Out for Delivery'
            break
          case 'IN_DEPOT':
            status = 'In Deposit'
            break
          case 'DELIVERED':
            status = 'Delivered'
            break
          case 'PICKED_UP':
            status = 'Picked Up'
            break
          default:
            status = 'undefined'
        }
        return {
          id: item.id,
          targetBox: box,
          targetCustomer: customer.firstName + ' ' + customer.lastName,
          deliverer: deliverer.firstName + ' ' + deliverer.lastName,
          status: status,
        }
        //newRows.push(itemInfo)
      })
    } catch (e) {
      console.error(e)
    }

    return newRows
  }

  try {
    useEffect(() => {
      if (isDeliverer) {
        DelivererService.getDeliveries(delivererId)
          .then(function (response) {
            //console.log(response);
            setDeliveryData(readDeliveries(response.data))
            //setRows(getDeliveries(UserData));
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }, [])
    //console.log(deliveryData)
    //rows = readDeliveries(UserData);
  } catch (e) {
    console.error(e)
  }

  const [changeModalIsOpen, setChangeModalIsOpen] = useState(false)
  const [dataChanged, setDataChanged] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])

  function openChangeModalHandler() {
    // switch to the state where the modal is open
    setChangeModalIsOpen(true)
  }
  function closeChangeModalHandler() {
    setChangeModalIsOpen(false)
  }

  function dataChangedHandler() {
    setDataChanged(true)
  }

  if (dataChanged && isDeliverer) {
    try {
      DelivererService.getDeliveries(delivererId).then(function (response) {
        //console.log(response);
        if (delivererId === '') {
          setDeliveryData(readDeliveries(response.data))
        }
        setDataChanged(false)
      })
    } catch (e) {
      console.error(e)
      setDataChanged(false)
    }
  }

  const handleSelectionChange = (selection) => {
    setSelectedIds(selection)
    //console.log(selection);
  }
  //console.log(selectedIds);

  return (
    <div className={classes.container}>
      <h1>
        {' '}
        {title} {delivererUsername}
      </h1>
      <h3> {description} </h3>
      <Stack spacing={2} direction='row'>
        <Button onClick={openChangeModalHandler} color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
          Change Status
        </Button>
        <ChangeStatusModal selectedRows={selectedIds} handleOpen={openChangeModalHandler} handleClose={closeChangeModalHandler} open={changeModalIsOpen} update={dataChangedHandler} />
      </Stack>
      <Paper className={classes.boxManagementPaper} component='form'>
        <div className={classes.container}>
          <div style={{ height: 950, width: '100%' }}>
            {deliveryData.length === 0 ? (
              <DOubbleBubble />
            ) : (
              <DataGrid
                rows={deliveryData}
                columns={columns}
                editMode='row'
                pageSize={15}
                rowsPerPageOptions={[15]}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={handleSelectionChange}
                HorizontalAlign='Center'
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            )}
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default Deliverer

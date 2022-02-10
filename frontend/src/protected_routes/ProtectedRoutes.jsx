import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const DispatcherRoute = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth)

  let isDispatcher = false
  let isDeliverer = false
  let isCustomer = false
  try {
    isDispatcher = currentUser.roles.includes('ROLE_DISPATCHER') && true
    isDeliverer = currentUser.roles.includes('ROLE_DELIVERER') && true
    isCustomer = currentUser.roles.includes('ROLE_CUSTOMER') && true
  } catch (error) {
    console.error(error)
  }

  return currentUser && isDispatcher ? <Outlet element={props.element} exact={props.exact} path={props.path} /> : <Navigate to='/signin' />
}

export const DelivererRoute = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth)

  let isDispatcher = false
  let isDeliverer = false
  let isCustomer = false
  try {
    isDispatcher = currentUser.roles.includes('ROLE_DISPATCHER') && true
    isDeliverer = currentUser.roles.includes('ROLE_DELIVERER') && true
    isCustomer = currentUser.roles.includes('ROLE_CUSTOMER') && true
  } catch (error) {
    console.error(error)
  }

  return currentUser && isDeliverer ? <Outlet element={props.element} exact={props.exact} path={props.path} /> : <Navigate to='/signin' />
}

export const CustomerRoute = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth)

  let isDispatcher = false
  let isDeliverer = false
  let isCustomer = false
  try {
    isDispatcher = currentUser.roles.includes('ROLE_DISPATCHER') && true
    isDeliverer = currentUser.roles.includes('ROLE_DELIVERER') && true
    isCustomer = currentUser.roles.includes('ROLE_CUSTOMER') && true
  } catch (error) {
    console.error(error)
  }

  return currentUser && isCustomer ? <Outlet element={props.element} exact={props.exact} path={props.path} /> : <Navigate to='/signin' />
}

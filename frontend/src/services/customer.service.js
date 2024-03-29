import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://ase-delivery-service.herokuapp.com/user/auth/' //'http://localhost:8084/api/test/'
const API_GET_PAST_DELIVERIES = 'https://ase-delivery-service.herokuapp.com/deliveries/customer/past/'
const API_GET_ACTIVE_DELIVERIES = 'https://ase-delivery-service.herokuapp.com/deliveries/customer/active/'
const API_URL_DELIVERIES = 'https://ase-delivery-service.herokuapp.com/deliveries/'

const getCustomerView = () => {
  return axios.get(API_URL + 'customer', { headers: authHeader() })
}

//To be finished
const getPastDeliveries = async (customerID) => {
  return await axios.get(API_GET_PAST_DELIVERIES + customerID,  { headers: authHeader() })
}

//To be finished
const getActiveDeliveries = async (id) => {
  return await axios.get(API_GET_ACTIVE_DELIVERIES + id,  { headers: authHeader() })
}

const getDeliveryById = async (id) => {
  return await axios.get(API_URL_DELIVERIES + id,  { headers: authHeader() })
}


const CustomerService = {
  getCustomerView,
  getPastDeliveries,
  getActiveDeliveries,
  getDeliveryById,
}

export default CustomerService

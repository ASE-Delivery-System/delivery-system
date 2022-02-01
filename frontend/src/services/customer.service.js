import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://ase-delivery-service.herokuapp.com/user/auth/' //'http://localhost:8084/api/test/'
const API_GET_PAST_DELIVERIES = API_URL + '/deliveries/customer/past'
const API_GET_ACTIVE_DELIVERIES = API_URL + '/deliveries/customer/active'

const getCustomerView = () => {
  return axios.get(API_URL + 'customer', { headers: authHeader() })
}

//To be finished
const getPastDeliveries = async () => {
  return await axios.get(API_GET_PAST_DELIVERIES,  { headers: authHeader() })
}

//To be finished
const getActiveDeliveries = async () => {
  return await axios.get(API_GET_ACTIVE_DELIVERIES,  { headers: authHeader() })
}

const CustomerService = {
  getCustomerView,
  getPastDeliveries,
  getActiveDeliveries,
}

export default CustomerService

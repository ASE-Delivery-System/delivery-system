import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://ase-delivery-service.herokuapp.com/user/auth/' //'http://localhost:8084/api/test/'

const getCustomerView = () => {
  return axios.get(API_URL + 'customer', { headers: authHeader() })
}

const CustomerService = {
  getCustomerView,
}

export default CustomerService

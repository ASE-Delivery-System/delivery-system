import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/test/'

const getPublicContent = () => {
  return axios.get(API_URL + 'all')
}

const getCustomerView = () => {
  return axios.get(API_URL + 'customer', { headers: authHeader() })
}

const getDelivererView = () => {
  return axios.get(API_URL + 'deliverer', { headers: authHeader() })
}

const getDispatcherView = () => {
  return axios.get(API_URL + 'dispatcher', { headers: authHeader() })
}

const userService = {
  getPublicContent,
  getCustomerView,
  getDelivererView,
  getDispatcherView,
}

export default userService

import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://ase-delivery-service.herokuapp.com/user/auth/' // 'http://localhost:8083/user/auth/'
const API_URL_GET_USER = 'https://ase-delivery-service.herokuapp.com/users'
const API_URL_GET_DELIVERIES = 'https://ase-delivery-service.herokuapp.com/deliveries'

const getDispatcherView = () => {
  return axios.get(API_URL + 'dispatcher', { headers: authHeader() })
}

const registerNewUser = async (user) => {
  return await axios.post(API_URL + 'register', user,  { headers: authHeader() })
}

const postUser = async (user) => {
  return await axios.post(API_URL, user,  { headers: authHeader() })
}

const getUsers = async () => {
  return await axios.get(API_URL_GET_USER,  { headers: authHeader() })
}

const deleteUsers = async (user) => {
  return await axios.delete(API_URL_GET_USER, user, { headers: authHeader() })
}

const getDeliveries = async () => {
  return await axios.get(API_URL_GET_DELIVERIES,  { headers: authHeader() })
}

const DispatcherService = {
  getDispatcherView,
  registerNewUser,
  postUser,
  getUsers,
  deleteUsers,
  getDeliveries,
}

export default DispatcherService

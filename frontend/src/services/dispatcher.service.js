import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://ase-delivery-service.herokuapp.com/user/auth/' // 'http://localhost:8083/user/auth/'
const API_URL_GET_USER = 'https://ase-delivery-service.herokuapp.com/users'
const API_URL_DELIVERIES = 'https://ase-delivery-service.herokuapp.com/deliveries'
const API_URL_GET_BOXES = 'https://ase-delivery-service.herokuapp.com/boxes'


const getDispatcherView = () => {
  return axios.get(API_URL + 'dispatcher', { headers: authHeader() })
}

const getDeliverers = async () => {
    return await axios.get(API_URL_GET_USER + "/deliverers",  { headers: authHeader() })
}

const getCustomers = async () => {
    return await axios.get(API_URL_GET_USER + "/customers",  { headers: authHeader() })
}

//User Requests
const registerNewUser = async (user) => {
  return await axios.post(API_URL + 'register', user,  { headers: authHeader() })
}

const postUser = async (id, body) => {
  return await axios.post(API_URL_GET_USER + "/" + id, body,  {headers: authHeader()})
}

const getUsers = async () => {
  return await axios.get(API_URL_GET_USER,  { headers: authHeader() })
}

const deleteUsers = async (id) => {
    return await axios.delete(API_URL_GET_USER + "/" + id, { headers: authHeader() })
}

//Box Requests
const getBoxes = async () => {
  return await axios.get(API_URL_GET_BOXES, { headers: authHeader() })
}

const getBoxById = async (id) => {
  return await axios.get(API_URL_GET_BOXES + "/" + id,{ headers: authHeader() })
}

const createNewBox = async (box) => {
  return await axios.post(API_URL_GET_BOXES, box, { headers: authHeader() })
}

const postBox = async (id, body) => {
  return await axios.post(API_URL_GET_BOXES + "/" + id, body,{ headers: authHeader()})
}

const deleteBox = async (id) => {
  return await axios.delete(API_URL_GET_BOXES + "/" + id, { headers: authHeader() })
}

const changeStatusBox = async (id, body) => {
    return await axios.post(API_URL_GET_BOXES + "/status/" + id, body,{ headers: authHeader()})
}

//Deliveries Requests
const getDeliveries = async () => {
  return await axios.get(API_URL_DELIVERIES,  { headers: authHeader() })
}

const createNewDelivery = async (delivery) => {
  return await axios.post(API_URL_DELIVERIES, delivery ,{ headers: authHeader() })
}

const changeStatusDelivery = async (id, body) => {
  return await axios.post(API_URL_DELIVERIES + "/status/" + id, body,{ headers: authHeader() })
}

const deleteDelivery = async (id) => {
  return await axios.delete(API_URL_DELIVERIES + "/" + id,{ headers: authHeader() })
}

const DispatcherService = {
    getDispatcherView,
    registerNewUser,
    postUser,
    getUsers,
    deleteUsers,
    getDeliveries,
    createNewDelivery,
    changeStatusDelivery,
    deleteDelivery,
    getBoxes,
    createNewBox,
    deleteBox,
    getBoxById,
    postBox,
    changeStatusBox,
    getDeliverers,
    getCustomers
}

export default DispatcherService

import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://ase-delivery-service.herokuapp.com/user/auth/' // 'http://localhost:8083/user/auth/'
const API_URL_GET_USER = 'https://ase-delivery-service.herokuapp.com/users'
const API_URL_DELIVERIES = 'https://ase-delivery-service.herokuapp.com/deliveries'
const API_URL_GET_BOXES = 'https://ase-delivery-service.herokuapp.com/boxes'


const getDispatcherView = () => {
  return axios.get(API_URL + 'dispatcher', { headers: authHeader() })
}

const registerNewUser = async (user) => {
  return await axios.post(API_URL + 'register', user,  { headers: authHeader() })
}

const postUser = async (user) => {
  return await axios.post(API_URL_GET_USER, user,  { headers: authHeader() })
}

const getUsers = async () => {
  return await axios.get(API_URL_GET_USER,  { headers: authHeader() })
}

const getBoxes = async () => {
  return await axios.get(API_URL_GET_BOXES, { headers: authHeader() })
}

const getBoxById = async (id) => {
  return await axios.get(API_URL_GET_BOXES + "/" + id,{ headers: authHeader() })
}

const createNewBox = async (box) => {
  return await axios.post(API_URL_GET_BOXES, box, { headers: authHeader() })
}

const postBox = async (id) => {
  return await axios.post(API_URL_GET_BOXES + "/" + id, { headers: authHeader() })
}

const deleteBox = async (id) => {
  return await axios.delete(API_URL_GET_BOXES + "/" + id, { headers: authHeader() })
}

const deleteUsers = async (id) => {
  return await axios.delete(API_URL_GET_USER + "/" + id, { headers: authHeader() })
}


// Manage deliveries apis
const getDeliveries = async () => {
  return await axios.get(API_URL_DELIVERIES,  { headers: authHeader() })
}

const headers = {
  'Content-Type': 'application/json',
  //authHeader()
}

const createNewDelivery = async (delivery) => {
  return await axios.post(API_URL_DELIVERIES, delivery ,{ headers: headers })
}

const changeStatusDelivery = async (id, body) => {
  return await axios.post(API_URL_DELIVERIES + "/" + id, body,{ headers: headers })
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
    postBox
}

export default DispatcherService

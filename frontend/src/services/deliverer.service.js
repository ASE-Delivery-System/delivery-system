import axios from 'axios'
import authHeader from './auth-header'

const API_URL =  'https://ase-delivery-service.herokuapp.com/user/auth/' // 'http://localhost:8083/user/auth/'
const API_GET_DELIVERIES = 'https://ase-delivery-service.herokuapp.com/deliveries/deliverer/'

const getDelivererView = () => {
  return axios.get(API_URL + 'register', { headers: authHeader() })
}

//To be finished
const getDeliveries = async (delivererId) => {
  return await axios.get(API_GET_DELIVERIES + delivererId,  { headers: authHeader() })
}

const DelivererService = {
  getDelivererView,
  getDeliveries,
}

export default DelivererService

import axios from 'axios'
import authHeader from './auth-header'

const API_URL =  'https://ase-delivery-service.herokuapp.com/user/auth/' // 'http://localhost:8083/user/auth/'

const getDelivererView = () => {
  return axios.get(API_URL + 'register', { headers: authHeader() })
}

const DelivererService = {
  getDelivererView
}

export default DelivererService

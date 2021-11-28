import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8084/api/test/'

const getDelivererView = () => {
  return axios.get(API_URL + 'deliverer', { headers: authHeader() })
}

const DelivererService = {
  getDelivererView,
}

export default DelivererService

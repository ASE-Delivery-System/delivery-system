import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8084/api/test/'

const getDispatcherView = () => {
  return axios.get(API_URL + 'dispatcher', { headers: authHeader() })
}

const DispatcherService = {
  getDispatcherView,
}

export default DispatcherService

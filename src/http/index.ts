import axios from 'axios'

export const API_URL = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_DEV_API_URL
  : process.env.REACT_APP_PRO_API_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
})

$api.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config.isRetry) {
      error.config.isRetry = true;
      try {
        const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
        localStorage.setItem('accessToen', response.data.accessToken)
        return $api.request(originalRequest)
      } catch (err) {
        console.log('Не авторизован')
      }
    }

    throw error
  },
)

export default $api
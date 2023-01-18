import axios, { AxiosRequestConfig } from "axios"
import { USER_TOKEN } from "resources/constants"


const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  }
})

function requestInterceptor(config: AxiosRequestConfig) {
  const token = localStorage.getItem(USER_TOKEN)
  if (token && config.headers) {
    config.headers['Authorization'] = token
  }
  return config
}

apiClient.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error))

export default apiClient
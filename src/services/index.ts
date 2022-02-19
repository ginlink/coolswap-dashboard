import { UNKNOWN_ERROR_STR } from '@/constants/misc'
import axios, { AxiosInstance } from 'axios'
import { BASE_URL } from './config'

import { parseParam } from './util'

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
})

instance.interceptors.request.use((config) => {
  // add token

  return config
})

instance.interceptors.response.use(
  (res: any) => {
    return res.data?.data as any
  },
  (err) => {
    const response = err.response

    const errCode = response?.status
    const errMsg = response?.data?.msg

    switch (errCode) {
      case 400:
        console.log('Bad request')
        break
      case 401:
      case 403:
        console.log('Request error, permission problem')
        break
      case 404:
        console.log('Request error, resource not found')
        break
      case 405:
        console.log('Requested method not allowed')
        break
      case 408:
        console.log('The request timeout')
        break
      case 500:
        console.log('Server side error')
        break
      case 501:
        console.log('Network not implemented')
        break
      case 502:
        console.log('Network error')
        break
      case 503:
        console.log('Service unavailable')
        break
      case 504:
        console.log('Network timeout')
        break
      default:
        console.log(UNKNOWN_ERROR_STR, errCode, err)
    }

    throw Error(errMsg || UNKNOWN_ERROR_STR)
  }
)

export default {
  get: (url: string, params: Record<string, any> = {}): Promise<any> => {
    return instance.get(url + parseParam(params))
  },
  post: (url: string, data?: { [key: string]: any }): Promise<any> => {
    return instance.post(url, data)
  },
  put: (url: string, data?: { [key: string]: any }): Promise<any> => {
    return instance.put(url, data)
  },
  delete: (url: string, data?: { [key: string]: any }): Promise<any> => {
    return instance.delete(url, {
      data,
    })
  },
  patch: (url: string, params: any): Promise<any> => {
    return instance.patch(url, params)
  },
}

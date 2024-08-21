import { api } from '@/services/axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export const useAxios = {
  get,
  post,
  put,
  delete: remove
}

interface BaseResponse<T> {
  data?: T
  error?: any
  status: number
  ok: boolean
}

async function base<T>(request: Promise<AxiosResponse<any, any>>): Promise<BaseResponse<T>> {
  try {
    const { data, status } = await request

    return { data, status, ok: true }
  } catch (err: any) {
    let error = err.response?.data || err.message || 'Something went wrong'
    let status = err.response?.status || 400

    return { error, status, ok: false }
  }
}

async function get<T = any>(url: string, config?: AxiosRequestConfig<any>) {
  return base<T>(api.get(url, config))
}

async function post<T = any>(url: string, data: object, config?: AxiosRequestConfig<any>) {
  return base<T>(api.post(url, data, config))
}

async function put<T = any>(url: string, data: object, config?: AxiosRequestConfig<any>) {
  return base<T>(api.put(url, data, config))
}

async function remove<T = any>(url: string, config?: AxiosRequestConfig<any>) {
  return base<T>(api.delete(url, config))
}

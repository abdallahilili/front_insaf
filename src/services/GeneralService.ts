import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getToken, removeToken } from '../utils/localStorage'
  
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

class GeneralService {
  protected api: AxiosInstance

  constructor(baseURL: string = API_BASE_URL) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 15000,
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor — attach JWT token
    this.api.interceptors.request.use(
      (config) => {
        const token = getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor — handle 401 auto-logout
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          removeToken()
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  async save<T>(endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.post<T>(endpoint, data, config)
    return response.data
  }

  async update<T>(endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.put<T>(endpoint, data, config)
    return response.data
  }

  async patch<T>(endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.patch<T>(endpoint, data, config)
    return response.data
  }

  async getAll<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.api.get<T>(endpoint, { params })
    return response.data
  }

  async getById<T>(endpoint: string, id: string): Promise<T> {
    const response = await this.api.get<T>(`${endpoint}/${id}`)
    return response.data
  }

  async delete<T>(endpoint: string, id: string): Promise<T> {
    const response = await this.api.delete<T>(`${endpoint}/${id}`)
    return response.data
  }
}

export default GeneralService

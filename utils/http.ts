import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

const commonConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 10_000,
  maxRedirects: 0,
  // Do not send cookies by default to avoid cross-site credential leakage
  withCredentials: false,
  validateStatus: (status) => status >= 200 && status < 400,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

function assertRelativeUrl(url: string) {
  if (/^https?:\/\//i.test(url)) {
    throw new Error('Absolute URLs are not allowed in http client')
  }
}

export async function post<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig) {
  assertRelativeUrl(url)
  return axios.post<T>(url, data, { ...commonConfig, ...(config || {}) })
}

export async function get<T = unknown>(url: string, config?: AxiosRequestConfig) {
  assertRelativeUrl(url)
  return axios.get<T>(url, { ...commonConfig, ...(config || {}) })
}


import type { AxiosResponse } from 'axios'
import { API_SIGN_IN } from '@/api/data/api'
import { apiClient } from '@/plugins/api-client'

interface IAuthResponse {
  access_token: string
}

export interface IRequestData {
  login: string
  password: string
}

/**
 * For example...
 */
export function authUser(authUserData: IRequestData): Promise<AxiosResponse<IAuthResponse>> {
  return apiClient.post(API_SIGN_IN, { ...authUserData })
}

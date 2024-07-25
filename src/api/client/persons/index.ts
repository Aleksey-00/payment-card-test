import type { AxiosResponse } from 'axios'
import { API_GET_PERSONS } from '@/api/data/api'
import { apiClient } from '@/plugins/api-client'

export interface IPersonContent {
  id: number
  name: string
  origName: string | null
  origSurname: string | null
  picId: number
  surname: string
  title: string
  type: string
  url: string
  content: []
}

interface IPersonResponse {
  data: {
    content: IPersonContent[]
  }
}

export function persons(): Promise<AxiosResponse<IPersonResponse>> {
  return apiClient.get(API_GET_PERSONS)
}

import type { AxiosResponse } from 'axios'
import { API_GET_PERSON_BY_ID } from '@/api/data/api'
import { apiClient } from '@/plugins/api-client'

interface IPersonResponse {
  data: {
    body: string
  }
}

export function getPersonById(personId: number): Promise<AxiosResponse<IPersonResponse>> {
  return apiClient.get(API_GET_PERSON_BY_ID(personId))
}

import type { AxiosResponse } from 'axios'
import { API_GET_PERSONS_PICTURE } from '@/api/data/api'
import { apiClient } from '@/plugins/api-client'

interface IPictureResponse {}

export function getPictureForPersonById(
  pictureId: number
): Promise<AxiosResponse<IPictureResponse>> {
  return apiClient.get(API_GET_PERSONS_PICTURE(pictureId), {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
}

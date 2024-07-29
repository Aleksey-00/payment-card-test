export const API_GET_PERSONS = 'api/v1/boxes/vesti2'
export const API_GET_PERSONS_PICTURE = (picId: number): string =>
  `api/v1/pictures/${picId}/bq/redirect`
export const API_GET_PERSON_BY_ID = (personId: number): string => `api/v1/persons/${personId}
`

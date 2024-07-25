import { ref, type Ref } from 'vue'
import { getPersonById } from '@/api/client/personById'

export function useGetPersonById() {
  const isLoadPerson: Ref<boolean> = ref(false)
  const isLoadPersonError: Ref<boolean> = ref(false)
  const personDataBody: Ref<string | null> = ref(null)

  async function fetchPersonById(id: number) {
    try {
      isLoadPerson.value = true
      isLoadPersonError.value = false
      const result = await getPersonById(id)
      if (result.status === 200) {
        isLoadPersonError.value = false
        isLoadPerson.value = false
        personDataBody.value = result.data.data.body
      }
    } catch (e) {
      isLoadPerson.value = false
      isLoadPersonError.value = true
      personDataBody.value = null
      console.error(e)
    }
  }

  return {
    isLoadPerson,
    isLoadPersonError,
    personDataBody,
    fetchPersonById
  }
}

import type { Ref } from 'vue'
import { ref } from 'vue'
import { type IPersonContent, persons } from '@/api/client/persons'

export function useGetPersons() {
  const isLoadPersons: Ref<boolean> = ref(false)
  const isErrorPersons: Ref<boolean> = ref(false)
  const personsData: Ref<IPersonContent[]> = ref([])

  function mappedPersonsData(mappedPersonsList: IPersonContent[]): void {
    personsData.value = mappedPersonsList.filter((item) => item.title === 'Персоны')
  }

  async function fetchPersons(): Promise<void> {
    try {
      isLoadPersons.value = true
      isErrorPersons.value = false
      const result = await persons()
      if (result.status === 200) {
        isLoadPersons.value = false
        isErrorPersons.value = false
        mappedPersonsData(result.data.data.content)
      }
    } catch (e) {
      isLoadPersons.value = false
      isErrorPersons.value = true
      personsData.value = []
      console.error(e)
    }
  }

  return {
    isLoadPersons,
    isErrorPersons,
    personsData,
    fetchPersons
  }
}

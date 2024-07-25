import { type Ref, ref } from 'vue'
import { getPictureForPersonById } from '@/api/client/persons-picture'

export function useGetPictureForPersons() {
  const isLoadPicture: Ref<boolean> = ref(false)
  const isLoadPictureError: Ref<boolean> = ref(false)
  const picture: Ref<string> = ref('')

  async function loadPicture(pictureId: number) {
    try {
      isLoadPicture.value = true
      const result = await getPictureForPersonById(pictureId)
      if (result.status === 200) {
        isLoadPicture.value = false
        isLoadPicture.value = false
        picture.value = result.data.toString()
      }
    } catch (e) {
      console.error(e)
      isLoadPictureError.value = true
      isLoadPicture.value = false
    }
  }

  return {
    isLoadPicture,
    isLoadPictureError,
    picture,
    loadPicture
  }
}

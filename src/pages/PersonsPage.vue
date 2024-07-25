<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper'
import type { SwiperComponent } from 'swiper/angular'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'
import { onMounted, ref, type Ref } from 'vue'
import { useGetPersons } from '@/composition/useGetPersons'
import type { IPersonContent } from '@/api/client/persons'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import CustomModal from '@/components/CustomModal.vue'
import { useGetPersonById } from '@/composition/useGetPersonById'

const { personsData, fetchPersons, isLoadPersons } = useGetPersons()
const { personDataBody, fetchPersonById, isLoadPersonError } = useGetPersonById()
const localPersonsData: Ref<IPersonContent[] | null> = ref(null)

onMounted(async () => {
  await fetchPersons()
  localPersonsData.value = personsData.value[0].content
})

const swiper: Ref<SwiperInstance | null> = ref(null)
const currPerson: Ref<IPersonContent | null> = ref(null)
const SWIPER_OPTIONS: Partial<InstanceType<typeof SwiperComponent>> = ref({
  modules: [Navigation, Pagination],
  slidesPerView: 8,
  spaceBetween: 8,
  loop: true,
  watchSlidesProgress: true,
  allowTouchMove: false,
  centeredSlides: false,
  slideToClickedSlide: false,
  freeMode: true,
  breakpoints: {},
  pagination: {
    el: '',
    clickable: false
  }
})
const gotoNext = () => {
  swiper.value.slideNext()
}
const showModalPersonInfo: Ref<boolean> = ref(false)
const getPerson = async (person: IPersonContent) => {
  currPerson.value = person
  await fetchPersonById(person.id)
  if (!isLoadPersonError.value) showModalPersonInfo.value = true
}
</script>

<template>
  <div class="persons-page">
    <div class="persons-page__wrapper">
      <div class="persons-page__loader" v-if="isLoadPersons">Fetching Persons Data...</div>
      <Swiper class="persons-page__list" v-bind="SWIPER_OPTIONS" @swiper="(el) => (swiper = el)">
        <SwiperSlide
          class="persons__item"
          v-for="person in localPersonsData"
          :key="person.id"
          @click="getPerson(person)"
          style="cursor: pointer"
        >
          <img
            :src="`https://api.smotrim.ru/api/v1/pictures/${person.picId}/bq/redirect`"
            :alt="person.name"
            class="persons__item__img"
          />
          <div class="persons__item__info">
            <div class="persons__item__name">
              {{ person.name }}
            </div>
            <div class="persons__item__surname">
              {{ person.surname }}
            </div>
          </div>
        </SwiperSlide>
        <ArrowIcon class="persons__item__icon" @click="gotoNext" />
      </Swiper>
    </div>
    <CustomModal :show-modal="showModalPersonInfo" @close-modal="showModalPersonInfo = false">
      <div class="person-info">
        <div class="person-info__wrapper">
          <div class="person-info__main">
            <img
              class="person-info__image"
              :src="`https://api.smotrim.ru/api/v1/pictures/${currPerson?.picId}/bq/redirect`"
              :alt="currPerson?.name"
            />
            <div class="person-info__name__surname">
              <div class="person-info__name">{{ currPerson?.name }}</div>
              <div class="person-info__name">{{ currPerson?.surname }}</div>
            </div>
          </div>
          <div class="person-info__text" v-html="personDataBody" />
        </div>
      </div>
    </CustomModal>
  </div>
</template>

<style scoped lang="css">
.person-info__main {
  display: flex;
  align-items: center;
  gap: 32px;
  color: var(--black-color);
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 40px;
}
.person-info__text > p {
  color: var(--black-color);
  font-size: 16px;
  font-weight: 400;
}
.persons-page {
  width: 100%;
}
.persons-page__wrapper {
  max-width: 1406px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}
.persons__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.persons__item__img {
  width: 156px;
  height: 156px;
  border-radius: 50%;
}
.persons__item__icon {
  position: absolute;
  right: -24px;
  height: 68px;
  width: 68px;
  top: 41%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 100;
}
.person-info__image {
  width: 200px;
  height: 200px;
  border-radius: 8px;
}
</style>

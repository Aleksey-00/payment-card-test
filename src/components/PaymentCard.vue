<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue'
import { ref, type Ref } from 'vue'
import type { IPaymentData, IPaymentErrors } from '@/types'
import CustomButton from '@/components/CustomButton.vue'

const paymentData: Ref<IPaymentData> = ref({
  name: '',
  surname: '',
  expireDate: '',
  cardNumber: '',
  cvv: ''
})
const errors: Ref<IPaymentErrors> = ref({
  name: '',
  surname: '',
  expireDate: '',
  cardNumber: '',
  cvv: ''
})
const validPaymentData = (): boolean => {
  if (!paymentData.value.name) errors.value.name = 'Поле обязательно для заполнения.'
  else errors.value.name = ''
  if (!paymentData.value.surname) errors.value.surname = 'Поле обязательно для заполнения.'
  else errors.value.surname = ''
  if (!paymentData.value.expireDate) errors.value.expireDate = 'Поле обязательно для заполнения.'
  else errors.value.expireDate = ''
  if (!paymentData.value.cardNumber) errors.value.cardNumber = 'Поле обязательно для заполнения.'
  else errors.value.cardNumber = ''
  if (!paymentData.value.cvv) errors.value.cvv = 'Поле обязательно для заполнения.'
  else errors.value.cvv = ''
  return !!(
    paymentData.value.name &&
    paymentData.value.surname &&
    paymentData.value.expireDate &&
    paymentData.value.cardNumber &&
    paymentData.value.cvv
  )
}
const sendPaymentData = (): void => {
  validPaymentData()
}
</script>

<template>
  <div class="payment-card__wrapper">
    <form class="payment-card" @submit.prevent="sendPaymentData">
      <div class="payment-card__title">CREDIT CARD</div>
      <div class="payment-card__inputs">
        <CustomInput
          label="Имя"
          placeholder="Введите имя владельца"
          type="text"
          v-model="paymentData.name"
          :error-message="errors.name"
        />
        <CustomInput
          label="Фамилия"
          placeholder="Введите фамилию владельца"
          type="text"
          v-model="paymentData.surname"
          :error-message="errors.surname"
        />
        <CustomInput
          label="Дата действия карты"
          placeholder="Срок действия карты"
          type="date"
          v-model="paymentData.expireDate"
          :error-message="errors.expireDate"
        />
        <CustomInput
          label="Номер карты"
          placeholder="Введите номер карты"
          type="text"
          :max-length="16"
          :regexp="/\D+/gim"
          v-model="paymentData.cardNumber"
          :error-message="errors.cardNumber"
        />
        <CustomInput
          label="CVV"
          placeholder="CVV"
          type="text"
          :max-length="3"
          :regexp="/\D+/gim"
          v-model="paymentData.cvv"
          :error-message="errors.cvv"
          :style-object="{
            width: '67%'
          }"
        />
      </div>
      <div class="payment-card__action">
        <CustomButton
          type="submit"
          :style-object="{
            'margin-top': '8px',
            'max-width': '470px'
          }"
          >Отправить данные</CustomButton
        >
      </div>
    </form>
    <RouterLink to="/persons">Персоны</RouterLink>
  </div>
</template>

<style scoped lang="css">
.payment-card {
  -webkit-box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  max-width: 650px;
  width: 100%;
  display: flex;
  justify-content: center;
  background: var(--light-blue);
  padding: 16px;
  border-radius: 15px;
  flex-direction: column;
  gap: 8px;
}
.payment-card__wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
}
.payment-card__action {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.payment-card__title {
  color: var(--white-color);
  width: 100%;
  text-align: right;
}
.payment-card__inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
</style>

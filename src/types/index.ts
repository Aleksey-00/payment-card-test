export interface IPaymentData {
  name: string
  surname: string
  expireDate: Date | string
  cardNumber: string
  cvv: string
}

export interface IPaymentErrors {
  name: string
  surname: string
  expireDate: string
  cardNumber: string
  cvv: string
}

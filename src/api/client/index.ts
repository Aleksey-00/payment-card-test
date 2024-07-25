import axios from 'axios'

export default function init() {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 30000
  })

  // client.interceptors.request.use((config) => {
  //   const lToken = localStorage.getItem('token')
  //   if (lToken) {
  //     const newToken = lToken.replace(/"/g, '')
  //     Object.assign(config.headers, {
  //       Authorization: `Bearer ${newToken}`
  //     })
  //   }
  //   return config
  // })

  return {
    client
  }
}

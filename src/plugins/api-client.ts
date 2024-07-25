import type { App } from 'vue'
import init from '@/api/client'

const injectionKey = Symbol('apiClient')

export const { client: apiClient } = init()

export default {
  install: (app: App) => {
    app.config.globalProperties.$apiClient = apiClient
    app.provide(injectionKey.toString(), apiClient)
  }
}

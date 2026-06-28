import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { messages } from './locales.js'

const saved = localStorage.getItem('cv-lang')
const browser = (navigator.language || 'es').slice(0, 2)
const fallback = ['es', 'en', 'pt'].includes(browser) ? browser : 'es'

const i18n = createI18n({
  legacy: false,
  locale: saved || fallback,
  fallbackLocale: 'es',
  messages,
})

createApp(App).use(i18n).mount('#app')

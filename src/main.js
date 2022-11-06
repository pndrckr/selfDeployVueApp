import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import './assets/main.css'
import en from './locales/en.json'
import es from './locales/es.json'

const messages = {
    en: en,
    es: es
  }

const i18n = createI18n({
    locale: 'es', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
   
})

const app = createApp(App)

app.use(router)

app.use(i18n)
app.mount('#app')

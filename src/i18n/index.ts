import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import en from './locales/en.json'
import ru from './locales/ru.json'

// Récupérer la langue sauvegardée ou utiliser le français par défaut
const savedLocale = localStorage.getItem('app-locale') || 'fr'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'fr',
  messages: {
    fr,
    en,
    ru
  },
  globalInjection: true
})

export default i18n


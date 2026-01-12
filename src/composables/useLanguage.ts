import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue'

const availableLocales = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]

export function useLanguage() {
  const { locale } = useI18n()
  const currentLocale = ref(locale.value)

  const changeLocale = (newLocale: string) => {
    locale.value = newLocale
    currentLocale.value = newLocale
    localStorage.setItem('app-locale', newLocale)

    // Mettre à jour l'attribut lang du document HTML
    document.documentElement.lang = newLocale
  }

  // Synchroniser avec le localStorage au chargement
  const savedLocale = localStorage.getItem('app-locale')
  if (savedLocale && availableLocales.find((l) => l.code === savedLocale)) {
    changeLocale(savedLocale)
  }

  // Observer les changements de locale
  watch(
    () => locale.value,
    (newLocale) => {
      currentLocale.value = newLocale
      document.documentElement.lang = newLocale
    },
  )

  return {
    currentLocale,
    availableLocales,
    changeLocale,
  }
}

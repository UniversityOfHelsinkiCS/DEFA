const STORAGE_KEY = 'DEFA-lang'

export const saveLanguage = lang => {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
    return lang
  } catch (e) {
    return null
  }
}

export const getLanguage = () => {
  const language = localStorage.getItem(STORAGE_KEY)
  if (!language) {
    return saveLanguage('eng')
  }
  return language
}

class LanguageServiceClass {

  static localStorageLangKey = "vpl.lang"

  getCurrentLanguage() {
    const lang = localStorage.getItem(LanguageServiceClass.localStorageLangKey)
    return lang || 'ES'
  }

  setCurrentLanguage(lang) {
    localStorage.setItem(LanguageServiceClass.localStorageLangKey, lang)
    return lang
  }

}


export const LanguageService = new LanguageServiceClass()
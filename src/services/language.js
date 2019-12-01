class LanguageServiceClass {

  static localStorageLangKey = "vpl.lang"

  static getCurrentLanguage() {
    localStorage.getItem(LanguageServiceClass.localStorageLangKey)
  }

  static setCurrentLanguage(lang) {
    localStorage.setItem(LanguageServiceClass.localStorageLangKey, lang)
    return lang
  }

}


export const LanguageService = new LanguageServiceClass()
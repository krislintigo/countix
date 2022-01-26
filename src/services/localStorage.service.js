export default class LocalStorageService {
  static getNumber(name) {
    return +localStorage.getItem(name) ?? 0
  }

  static getArray(name) {
    return JSON.parse(localStorage.getItem(name)) ?? []
  }

  static setItem(name, value) {
    localStorage.setItem(name, value)
  }

  static setObject(name, value) {
    localStorage.setItem(name, JSON.stringify(value))
  }
}

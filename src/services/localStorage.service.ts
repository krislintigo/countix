export default class LocalStorageService {
  static getNumber(name: string) {
    return +(localStorage.getItem(name) ?? 0);
  }

  static getArray(name: string) {
    return JSON.parse(localStorage.getItem(name) || '[]');
  }

  static setItem(name: string, value: string | number) {
    localStorage.setItem(name, value.toString());
  }

  static setObject(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
  }
}

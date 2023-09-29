import { LocalStorageName } from 'models'

export namespace LocalStorageNamespace {
  export function getAuthToken() {
    return localStorage.getItem(LocalStorageName.internet_shop_token) as string
  }
  export function setAuthToken(value: string) {
    return localStorage.setItem(LocalStorageName.internet_shop_token, value)
  }
  export function removeAuthToken() {
    return localStorage.removeItem(LocalStorageName.internet_shop_token)
  }
}

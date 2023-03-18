import { navigateTo } from './routes/navigation'

export const USER_TOKEN_STORAGE_KEY = 'userToken'

export function setToken(token: string) {
  localStorage.setItem(USER_TOKEN_STORAGE_KEY, token)
}

export function getToken() {
  return localStorage.getItem(USER_TOKEN_STORAGE_KEY)
}

export function clearToken() {
  localStorage.removeItem(USER_TOKEN_STORAGE_KEY)
}

export function toLogin() {
  location.href = '/login'
}

export function logout() {
  localStorage.removeItem(USER_TOKEN_STORAGE_KEY)
  clearToken()
  navigateTo?.('login')
}

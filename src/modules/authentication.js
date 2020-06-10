import axios from 'axios'
import { MessageBox } from 'element-ui'
import storage from './storage'
import { getAPIBaseURL, getLoginURL } from './utils'

export async function signIn(data, url='') {
  const response = await axios.post(
    getLoginURL() + url, data, { baseURL: getAPIBaseURL() }
  )

  if (response.data.status === 0) {
    const token = response.data.data.token
    storage.set('session', { token })
    return response.data.data
  } else {
    await MessageBox.alert(response.data.msg, '错误提示')
    return false
  }
}

export function getSession() {
  return storage.get('session')
}

export function getConfigPath() {
  return storage.get('configPath')
}

export function clearSession() {
  return storage.remove('session')
}

export function updateSession(data) {
  storage.set('session', Object.assign({}, getSession(), data))
}

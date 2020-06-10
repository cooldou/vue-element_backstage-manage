import axios from 'axios'
import { MessageBox } from 'element-ui'
import { getSession, clearSession } from './authentication'
import { getAPIBaseURL } from './utils'

function createInstance() {
  const instance = axios.create({
    baseURL: getAPIBaseURL()
  })

  instance.interceptors.request.use(request => {
    request.headers['Authorization'] = getSession().token
    return request
  })

  instance.interceptors.response.use(async (response) => {
    return await transformResponseData(response)
  }, async (error) => {
    await handleResponseError(error)
    return false
  })

  return instance
}

async function transformResponseData(response) {
  if (response.data.status === 0) {
    return response.data.data || response.data
  } else {
    await MessageBox.alert(response.data.msg, '错误提示')
    return response.data
  }
}

let unauthorizedHandlerRunning = false

async function runUnauthorizedHandler() {
  if (unauthorizedHandlerRunning || !getSession()) return

  unauthorizedHandlerRunning = true

  await MessageBox.alert('登录状态已过期，请重新登录', '错误提示')
  clearSession()

  window.app.$router.replace({
    name: 'signin',
    query: {
      redirectTo: window.app.$route.fullPath
    }
  }, () => unauthorizedHandlerRunning = false)
}

async function handleResponseError(error) {
  if (error.response && error.response.status === 401) {
    await runUnauthorizedHandler()
  } else if (error.response.data && error.response.data.msg) {
    await MessageBox.alert(error.response.data.msg, '错误提示')
  } else {
    await MessageBox.alert(
      `服务器遇到了一些问题，请稍后再试。${error.response ? '错误码：' + error.response.status : ''}`,
      '错误提示'
    )
  }
}

export default createInstance()

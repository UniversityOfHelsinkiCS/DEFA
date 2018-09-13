import axios from 'axios'
import { API_BASE_PATH } from '../constants'

const getAxios = () => axios.create({ baseURL: API_BASE_PATH })

const callApi = async (url, method = 'get', data) => {
  const options = { headers: {} }
  console.log(url)
  switch (method) {
    case 'get':
      return getAxios().get(url, options)
    case 'post':
      return getAxios().post(url, data, options)
    case 'put':
      return getAxios().put(url, data, options)
    case 'delete':
      return getAxios().delete(url, options)
    default:
      return Promise.reject(new Error('Invalid http method'))
  }
}

export default (route, prefix, data, method = 'get', query) => (
  {
    type: `${prefix}_ATTEMPT`,
    requestSettings: {
      route,
      method,
      data,
      prefix,
      query,
    },
  }
)

export const handleRequest = store => next => async (action) => {
  next(action)
  const { requestSettings } = action
  if (requestSettings) {
    const {
      route, method, data, prefix, query,
    } = requestSettings
    try {
      const res = await callApi(route, method, data, store.getState().user)
      store.dispatch({ type: `${prefix}_SUCCESS`, response: res.data, query })
    } catch (err) {
      store.dispatch({ type: `${prefix}_FAILURE`, response: err, query })
    }
  }
}

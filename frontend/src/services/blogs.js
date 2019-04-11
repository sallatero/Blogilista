import axios from 'axios'
import { nextTick } from 'q';
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  console.log('setToken kutsuttu')
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async (id, newVersion) => {
  try {
    const config = {
      headers: { Authorization: token},
    }
    const response = await axios.put(`${baseUrl}/${id}`, newVersion, config)
    return response
  }catch (error) {
    console.log('error: ', error)
    if (error.response) {
      return {errorTitle: error.response.data.error, statusCode: error.response.status}
    }
  }
}

//data: title, author, url, likes, token
const create = async newObj => {
  try {
    console.log('create kutsuttu. newobj: ', newObj)
    const config = {
      headers: { Authorization: token},
    }
    const response = await axios.post(baseUrl, newObj, config)
    console.log('blogService response: ', response) //user ei ole {}
    return response.data
  }catch (error) {
    if (error.response) {
      return {errorTitle: error.response.data.error, statusCode: error.response.status}
    }
  }
}

export default { setToken, getAll, create, update }

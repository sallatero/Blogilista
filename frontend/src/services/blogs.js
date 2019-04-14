import axios from 'axios'
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
      headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${id}`, newVersion, config)
    return response
  }catch (error) {
    console.log('error: ', error)
    if (error.response) {
      return { errorTitle: error.response.data.error, statusCode: error.response.status }
    }
  }
}

const remove = async (id) => {
  try {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    console.log('delete response: ', response)
    return response
  }catch (error) {
    console.log('error: ', error)
    if (error.response) {
      return { errorTitle: error.response.data.error, statusCode: error.response.status }
    }
  }
}

//data: title, author, url, likes, token
const create = async newObj => {
  try {
    console.log('create kutsuttu. newobj: ', newObj)
    const config = {
      headers: { Authorization: token },
    }
    //response.data on haluamamme blogiolio, jolla user-kentässä user-olio
    const response = await axios.post(baseUrl, newObj, config)
    console.log('blogService response: ', response)
    return response.data
  }catch (error) {
    if (error.response) {
      return { errorTitle: error.response.data.error, statusCode: error.response.status }
    }
  }
}

export default { setToken, getAll, create, update, remove }

import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (error) {
    return { errorTitle: 'Väärä käyttäjätunnus tai salasana', statusCode: 401 }
  }
}

export default { login }
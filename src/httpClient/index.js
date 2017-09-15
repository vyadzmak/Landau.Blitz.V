import axios from 'axios'

const http = axios.create({
  baseURL: `http://jsonplaceholder.typicode.com/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})

export default http

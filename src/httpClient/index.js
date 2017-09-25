import axios from 'axios'

const http = axios.create({
  baseURL: `http://localhost/BlitzApi/api`
  // headers: {
  //   Authorization: 'Bearer {token}'
  // }
})

export default http

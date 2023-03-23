import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5001/'
axios.defaults.withCredentials = false

const buildFormData = (object) => {
  const formData = new FormData()
  Object.keys(object).every((key) => {
    if (object[key]?.toLocaleString().includes('FileList')) {
      for (let i = 0; i < object[key].length; i++) formData.append(`${key}[]`, object[key][i])
      return true
    }

    formData.append(key, object[key])
    return true
  })
  return formData
}

const responseBody = (response) => response.data

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body, options = { formData: false }) =>
    axios.post(url, options.formData ? buildFormData(body) : body).then(responseBody),
  put: (url, body, options = { formData: false }) =>
    axios.put(url, options.formData ? buildFormData(body) : body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
}

const Birthdays = {
  getBirthdays: (guildId) => requests.get(`/birthday/list/${guildId}`),
  deleteBirthday: (guildId, userId) => requests.delete(`/birthday/${guildId}?user_id=${userId}`),
  updateBirthday: (guildId, body) => requests.put(`/birthday/${guildId}`, body),
}

const Answers = {
  getAnswers: (guildId) => requests.get(`/answer/list/${guildId}`),
  updateAnswers: (guildId, body) => requests.put(`/answer/${guildId}`, body),
}

const agent = {
  Answers,
  Birthdays,
}

export default agent

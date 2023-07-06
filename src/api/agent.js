import axios from 'axios'
import { readCookie } from '~/utils/global-functions'

axios.defaults.baseURL = 'http://localhost:5001/'
axios.defaults.withCredentials = false

const defaultHeaders = { headers: { Authorization: `Bearer ${readCookie('accessToken')}` } }

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
  get: (url, options) => axios.get(url, options).then(responseBody),
  post: (url, body, options = { formData: false }) =>
    axios.post(url, options.formData ? buildFormData(body) : body, options).then(responseBody),
  put: (url, body, options = { formData: false }) =>
    axios.put(url, options.formData ? buildFormData(body) : body, options).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
}

const Birthdays = {
  getBirthdays: (guildId) => requests.get(`/birthday/list/${guildId}`, defaultHeaders),
  deleteBirthday: (guildId, userId) =>
    requests.delete(`/birthday/${guildId}?user_id=${userId}`, defaultHeaders),
  updateBirthday: (guildId, body) => requests.put(`/birthday/${guildId}`, body, defaultHeaders),
}

const Answers = {
  getAnswers: (guildId) => requests.get(`/answer/list/${guildId}`, defaultHeaders),
  updateAnswers: (guildId, body) => requests.put(`/answer/${guildId}`, body, defaultHeaders),
}

const Holidays = {
  updateHolidays: (guildId, body) => requests.put(`/holiday/${guildId}`, body, defaultHeaders),
  getHolidays: (guildId, dates) =>
    requests.get(
      `/holiday/list/${guildId}?startDate=${dates.startDate}&endDate=${dates.endDate}`,
      defaultHeaders,
    ),
  getHoliday: (guildId, date) => requests.get(`/holiday/${guildId}?date=${date}`, defaultHeaders),
}

const Draws = {
  getDrawConfigs: (guildId) => requests.get(`/draw-config/${guildId}`, defaultHeaders),
  updateDrawConfigs: (guildId, body) =>
    requests.put(`/draw-config/${guildId}`, body, defaultHeaders),
}

const User = {
  sendDiscordCode: (body) => requests.post('/discord-login', body),
  getCurrentUser: () => requests.get('/user', defaultHeaders),
}

const Guild = {
  getGuildChannels: (guildId) => requests.get(`/guild-channels/${guildId}`, defaultHeaders),
}

const GuildSettings = {
  updateSettings: (guildId, body) =>
    requests.put(`/guild-settings/${guildId}`, body, defaultHeaders),
}

const agent = {
  Answers,
  Birthdays,
  Draws,
  Holidays,
  User,
  Guild,
  GuildSettings,
}

export default agent

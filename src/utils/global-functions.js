const getExpireDate = (days) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)

  return `expires=${date.toUTCString()}`
}

export const writeCookie = (key, value, options = { days: 30, sameSite: 'Strict' }) => {
  document.cookie = `${key}=${value};${getExpireDate(options.days)};SameSite=${
    options.sameSite
  };path=/`
}

export const readCookie = (key) =>
  document.cookie
    .split('; ')
    .find((row) => row.startsWith(key))
    ?.split('=')[1]

export const deleteCookie = (name) => {
  document.cookie = `${name}=;Max-Age=0;SameSite=Strict;path=/`
}

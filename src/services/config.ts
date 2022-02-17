export const isDev = process.env.NODE_ENV === 'development'

const BASE_URL_DEV = 'http://localhost:3050/api'
const BASE_URL_PRO = 'https://gincool.com/coolswap/api'

export const BASE_URL = isDev ? BASE_URL_DEV : BASE_URL_PRO

import { boot } from "quasar/wrappers"
import axios from "axios"
import { Api } from "../helpers/api"
import { Loading, QSpinnerFacebook } from "quasar"

const api = axios.create({
  baseURL: Api.Base.URL,
  withCredentials: true,
})

// Add a request interceptor
let ekraniKilitle = false
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    ekraniKilitle = config.data?.ekraniKilitle
    if (ekraniKilitle) {
      Loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: "#b61738",
        spinnerSize: 140,
        backgroundColor: "purple",
        message: "Some important process is in progress. Hang on...",
        messageColor: "black",
      })
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (ekraniKilitle) {
      Loading.hide()
      ekraniKilitle = false
    }

    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }

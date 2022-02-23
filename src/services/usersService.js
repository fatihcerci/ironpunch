import { ref } from "vue"
import { SUPABASE_CLIENT } from "../config/config"
import { api } from "boot/axios"
import { store } from "boot/store"
import menuController from "../controllers/menuController"
//import { Cookies } from 'quasar'
import { Loading, QSpinnerFacebook} from "quasar"
import { Messages } from "src/helpers/messages"

const initialState = {
  id: "",
  code: "",
  password: "",
  user_code: "",
  nmae: "",
}
const usersList = ref()
const sessionInfo = ref()
const displayError = ref()
const displayMessages = ref()
const responseMessages = ref()
const user = ref({ ...initialState })
const {resetMenu} = menuController()
/**
 * THIS CONNECTS TO SUPABASE...
 */
const usersService = () => {
  const uuidv4 = async () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
      }
    )
  }

  /**
   * reset the product data
   */
  const resetUser = async () => {
    Object.assign(user.value, initialState)
  }

  /**
   * edit the product data
   */
  const editUser = async (selectedUser) => {
    Object.assign(user.value, selectedUser)
  }

  /**
   * save data
   */
  const saveUser = async (formData) => {
    try {
      formData.value.id = await uuidv4()
      await SUPABASE_CLIENT.from("users").insert([{ ...formData.value }])
      return { success: true }
    } catch (e) {
      //console.log(e)
      return { success: false, error: e }
    }
  }

  const removeUser = async (userId) => {
    await SUPABASE_CLIENT.from("users").delete().eq("id", userId)
  }

  /**
   *
   */
  const loadUsers = async () => {
    let { data, error } = await SUPABASE_CLIENT.from("users")
      .select("*")
      .order("name", { descending: true })
    usersList.value = data
    displayError.value = error
  }

  const login = async (userCode, password, captcha) => {
    Loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'red',
      spinnerSize: 150,
      backgroundColor: 'black',
      message: Messages.progress,
      messageColor: 'white',
      boxClass: 'font-19'
    })

    clearAllStorage()

    var appUrl = null
    if(userCode == "INTERNET_USER") {
      appUrl = `/dispatch?cmd=login&jp={'userid':${userCode}}`
    } else {
      appUrl = `/dispatch?cmd=login&jp={'userid':${userCode},'password':${password}, 'captcha':${captcha}}`

      if(!userCode) {
        displayError.value = 1
        displayMessages.value = [{text: "Kullanıcı Kodu boş olamaz"}]
      } else if(!password) {
        displayError.value = 1
        displayMessages.value = [{text: "Şifre boş olamaz"}]
      } else if(!captcha) {
        displayError.value = 1
        displayMessages.value = [{text: "Resimdeki Metin boş olamaz"}]
      } 
    }
    
    const url = appUrl
    const response = await api.post(url, { clearCacheEntry: true })
    Loading.hide()
    const { data, error, messages } = response.data
    if(!error && data.extra && data.extra.sessionInfo && JSON.parse(data.extra.sessionInfo).userName != "INTERNET" && JSON.parse(data.extra.sessionInfo).titleId != "0qjs633x591ihl") {
      let ihaleFirmaMessage = []
      ihaleFirmaMessage[0] = {type:1, text:"İhale Firma olmayan kullanıcılar sisteme giriş yapamaz"}
      displayError.value = true
      displayMessages.value = ihaleFirmaMessage
    } else {
      sessionInfo.value = data
      displayError.value = error
      displayMessages.value = messages
    }
    
    console.log(data)
      
    resetMenu()
    
  }

  const resetPassword = async (userCode, captcha) => {
    Loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'red',
      spinnerSize: 150,
      backgroundColor: 'black',
      message: Messages.progress,
      messageColor: 'white',
      boxClass: 'font-19'
    })

    if(!userCode) {
      displayError.value = 1
      displayMessages.value = [{text: "Kullanıcı Kodu boş olamaz"}]
    } else if(!captcha) {
      displayError.value = 1
      displayMessages.value = [{text: "Resimdeki Metin boş olamaz"}]
    } else {
      var appUrl = `/public?cmd=forgetPassword&jp={'username':${userCode},'captcha':${captcha}}`
    
      const url = appUrl
      const response = await api.post(url, { clearCacheEntry: true })
      const { data, error, messages } = response
      responseMessages.value = data
      displayError.value = error
      displayMessages.value = messages
    }
      
    Loading.hide()
  }

  const logout = async () => {
    Loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'red',
      spinnerSize: 150,
      backgroundColor: 'black',
      message: Messages.progress,
      messageColor: 'white',
      boxClass: 'font-19'
    })
    const url = `/dispatch?cmd=logout&jp={}`
    await api.post(url, { clearCacheEntry: true })
    Loading.hide()
    clearAllStorage()
    return { data: null }
  }

  const clearAllStorage = () => {
    localStorage.clear()
    store.clear()
  }

  return {
    // PROPERTIES
    displayError,
    displayMessages,
    responseMessages,
    sessionInfo,
    usersList,
    user,
    // FUNCTIONS
    saveUser,
    loadUsers,
    removeUser,
    editUser,
    resetUser,
    login,
    logout,
    resetPassword,
    hasUser: () => {
      const session = localStorage.getItem("sessionInfo") != null ? JSON.parse(localStorage.getItem("sessionInfo")) : null
      return session !== null && session.userName != "INTERNET" && session.userSurname !== "USER"
    },
    hasSession: () => {
      return localStorage.getItem("sessionInfo") !== null
    },
    clearAllStorage,
  }
}
export default usersService

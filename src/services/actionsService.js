import { ref } from "vue"
import { SUPABASE_CLIENT } from "../config/config"

const initialState = {
  id: "",
  a: "",
  b: "",
  c: "",
}
const actionsList = ref()
const displayError = ref()
const action = ref({ ...initialState })

/**
 * THIS CONNECTS TO SUPABASE...
 */
const actionsService = () => {
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
   * save data
   */
  const saveAction = async (formData) => {
    try {
      formData.value.id = await uuidv4()
      await SUPABASE_CLIENT.from("actions").insert([{ ...formData.value }])
      return { success: true }
    } catch (e) {

      return { success: false, error: e }
    }
  }

  const removeAction = async (actionId) => {
    await SUPABASE_CLIENT.from("actions").delete().eq("id", actionId)
  }

  /**
   *
   */
  const loadActions = async () => {
    let { data, error } = await SUPABASE_CLIENT.from("actions").select("*")
    actionsList.value = data
    displayError.value = error
  }

  return {
    // PROPERTIES
    displayError,
    actionsList,
    action,
    // FUNCTIONS
    saveAction,
    loadActions,
    removeAction,
  }
}
export default actionsService

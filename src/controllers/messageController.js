import { ref } from "vue"

let messageList = ref()

let unreadMessageCount = ref(0)

const messageController = () => {


  return {
    // PROPERTIES
    messageList,
    unreadMessageCount
  }
}
export default messageController

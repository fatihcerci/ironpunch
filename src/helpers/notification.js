import { Notify } from "quasar"

const notification = () => {
  const warn = (message, pos) => {
    Notify.create({
      message: message,
      color: "warning",
      textColor: "dark",
      icon: "warning",
      position: !pos ? "bottom" : pos,
	  timeout: 500
    })
  }

  const info = (message, pos) => {
    Notify.create({
      message: message,
      textColor: "dark",
      color: "info",
      position: !pos ? "bottom" : pos,
	  timeout: 500
    })
  }

  const error = (message, pos) => {
    Notify.create({
      color: "negative",
      position: !pos ? "top" : pos,
      textColor: "dark",
      message: message,
      icon: "report_problem",
	  timeout: 500
    })
  }

  const success = (message, pos) => {
    Notify.create({
      message: message,
      textColor: "white",
      color: "orange-5",
      position: !pos ? "bottom" : pos,
	  timeout: 500
    })
  }
  return {
    warn,
    info,
    error,
    success,
  }
}
export default notification

import queue from "queue"
import moment from "moment"
import { Format } from "./format"
import { Api } from "./api"
import apiService from "../services/apiService"
/**
 * Zamanli isler icin kuyruk yapisi olusturur
 * @returns
 */

const task = () => {
  const { displayError, displayMessages, dataList, fetch } = apiService()
  let q = queue({ results: [] })

  q.on("success", function (result, job) {
    console.log("The task result is:", result)
  })

  const scheduleTask = (...args) => {
    q.push(function (cb) {
      const intervalId = setInterval(() => {
        const today = moment()
        const formattedAppointmentDate = moment(
          args[0],
          Format.Date.REGULAR_WITH_TIME_MIN
        )
        if (today.isAfter(formattedAppointmentDate)) {
          cb(null, true) //degeri cb ile geri dondur
          const bodyData = { oid: args[1], onay: 1, copyAll: false }
          fetch(Api.Common.GENERIC_CREATE_OR_UPDATE_URL, bodyData)
          clearInterval(intervalId)
        }
      }, Format.Time.ONE_SECOND)
    })

    q.start(function (err) {
      if (err) throw err
      console.log("all done:", q.results)
    })
  }

  return {
    scheduleTask,
  }
}

export default task

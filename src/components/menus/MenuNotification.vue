<template>
  <q-btn dense flat round size="md" icon="notifications">
    <q-badge color="primary" floating transparent>
      {{ totalNotifications }}
    </q-badge>
    <q-menu>
      <div class="row">
        <q-list>
          <q-item v-for="item in menuNotificationList" :key="item.oid">
            <q-item-section>
              <q-item-label>{{ item.text }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                color="primary"
                size="sm"
                flat
                round
                icon="task_alt"

              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent, computed } from "vue"
import apiService from "../../services/apiService"
import menuController from "../../controllers/menuController"
import notify from "../../helpers/notification"
import { Format } from "../../helpers/format"
import { Api } from "../../helpers/api"

export default defineComponent({
  name: "MenuNotification",
  setup() {
    const sessionInfo = JSON.parse(localStorage.getItem("sessionInfo"))
    const { displayError, displayMessages, dataList, fetch } = apiService()
    const { menuNotificationList } = menuController()
    const totalNotifications = computed(() => {
      return menuNotificationList.value ? menuNotificationList.value.length : 0
    })

    const fetchUnconfirmedAppointments = async () => {
      try {
        const bodyData = {
          onay: 1,
          kullaniciOid: sessionInfo.userId,
        }
        await fetch(Api.Appointment.LIST_APPOINTMENT_UNCONFIRMED_URL, bodyData)
        if (dataList.value) {
          menuNotificationList.value = dataList.value.map((appointment) => ({
            oid: appointment.oid,
            text: appointment.dosyaNo + "/" + appointment.magdurNo,
            oidHsrDosyaEksper: appointment.oidHsrDosyaEksper,
          }))
        }
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        notify().error(e.message)
      }
    }

    //setInterval(fetchUnconfirmedAppointments, Format.Time.FIVE_MINUTES)

    return {
      menuNotificationList,
      totalNotifications,
    }
  },
})
</script>

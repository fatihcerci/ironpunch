<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pb-none">
      <form-appointment />
    </q-card-section>

    <table-appointments />
  </q-card>
</template>

<script>
import { defineComponent } from "vue"
import FormAppointment from "../forms/FormAppointment.vue"
import TableAppointments from "../tables/TableAppointments.vue"

export default defineComponent({
  name: "CardAppointmentInfo",
  components: {
    FormAppointment,
    TableAppointments,
  },
  setup() {},
})
</script>

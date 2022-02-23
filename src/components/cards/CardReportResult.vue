<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pb-none">
      <form-report-result />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue"
import FormReportResult from "../forms/FormReportResult.vue"

export default defineComponent({
  name: "CardReportResult",
  components: {
    FormReportResult,
  },
  setup() {},
})
</script>

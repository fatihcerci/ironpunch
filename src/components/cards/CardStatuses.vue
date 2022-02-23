<template>
  <q-card class="bg-transparent no-shadow no-border q-pl-md q-pr-md q-pb-md">
    <q-card-section class="q-pa-none">
      <div class="row q-col-gutter-md">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <card-report-statuses />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <card-file-statuses />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineAsyncComponent } from "vue"

export default {
  name: "CardStatuses",
  components: {
    CardReportStatuses: defineAsyncComponent(() =>
      import("src/components/cards/CardReportStatuses.vue")
    ),
    CardFileStatuses: defineAsyncComponent(() =>
      import("src/components/cards/CardFileStatuses.vue")
    ),
  },
}
</script>

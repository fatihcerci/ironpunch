<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pb-none">
      <form-add-claim />
    </q-card-section>
    <table-add-claim />
  </q-card>
</template>

<script>
import { defineComponent } from "vue"
import FormAddClaim from "../forms/FormAddClaim.vue"
import TableAddClaim from "../tables/TableAddClaim.vue"

export default defineComponent({
  name: "CardAddClaim",
  components: {
    FormAddClaim,
    TableAddClaim,
  },
  setup() {},
})
</script>

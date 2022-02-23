<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-md">
      <form-complex  />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineAsyncComponent, defineComponent } from "vue"

export default defineComponent({
  name: "CardComplex",
  components: {
    FormComplex: defineAsyncComponent(() =>
      import("src/components/forms/FormComplex.vue")
    ),
  },
  setup() {
  },
})
</script>

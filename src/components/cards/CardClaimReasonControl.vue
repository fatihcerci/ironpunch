<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-md">
      <form-control :kontrolList="formClaimReasonControlList"/>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineAsyncComponent, defineComponent, ref, onMounted } from "vue"
import formController from "../../controllers/formController"

export default defineComponent({
  name: "CardClaimReasonControl",
  components: {
    FormControl: defineAsyncComponent(() =>
      import("src/components/forms/FormControl.vue")
    ),
  },
  setup() {
    const formClaimReasonControlList = ref()
    const { formList } = formController()

    onMounted(() => {
      if (formList.value)
        formClaimReasonControlList.value = formList.value.filter(
          (item) => item.kontrolTipi === 2
        )
    })

    return {
      formClaimReasonControlList,
      formList,
    }
  },
})
</script>

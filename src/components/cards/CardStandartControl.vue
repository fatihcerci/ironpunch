<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-md">
      <form-control :kontrolList="formStandartControlList" />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineAsyncComponent, defineComponent, ref, onMounted } from "vue"
import formController from "../../controllers/formController"

export default defineComponent({
  name: "CardStandartControl",
  components: {
    FormControl: defineAsyncComponent(() =>
      import("src/components/forms/FormControl.vue")
    ),
  },
  setup() {
    const formStandartControlList = ref()
    const { formList } = formController()

    onMounted( () => {
      if (formList.value)
        formStandartControlList.value = formList.value.filter(
          (item) => item.kontrolTipi === 1
        )
    })

    return {
      formStandartControlList,
      formList,
    }
  },
})
</script>

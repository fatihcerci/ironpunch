<template>
  <q-dialog v-model="openDialog" persistent>
    <q-card style="width: 700px; max-width: 80vw">
      <q-bar class="bg-primary text-white">
        <q-icon name="info" />
        <div>Önceki Hasar Dosyalar</div>

        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Kapat</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <table-previous-claims />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, defineAsyncComponent } from "vue"

export default defineComponent({
  name: "DialogPreviousClaims",
  components: {
    TablePreviousClaims: defineAsyncComponent(() =>
      import("src/components/tables/TablePreviousClaims.vue")
    ),
  },
  props: ["open"],
  emits: [
    'update:open'
  ],

  setup(props, { emit }) {

    const hide = () => {
      emit("update:open",false)
    }

    return {
      hide,
    }
  },

  computed: {
    openDialog: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit("update:open", val)
      },
    },
  },
})
</script>

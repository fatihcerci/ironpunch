<template>
  <div class="row q-pb-md q-col-gutter-md">
    <div
      class="col-lg-6 col-md-6 col-sm-12 col-xs-12"
      v-for="item in kontrolList"
      :key="item.oid"
    >
      <q-checkbox
        left-label
        :label="item.adi"
        v-model="item.modelCheckBox"
        v-if="item.uiFormTip.tip === 2 && !item.uiFormDegerListesi"
        dark
      />

      <q-list
        class="bg-card no-border q-pa-none"
        v-if="item.uiFormDegerListesi"
      >
        <q-expansion-item
          class="q-pa-none"
          switch-toggle-side
          group="accordion-group-checkbox"
          :label="item.adi"
          header-class="text-white"
          expand-icon-class="text-white"
        >
          <div class="row q-pb-md q-col-gutter-md">
            <div
              class="col-lg-3 col-md-3 col-sm-12 col-xs-12"
              v-for="itemFormDeger in item.uiFormDegerListesi"
              :key="itemFormDeger.oid"
            >
              <q-checkbox
                left-label
                :label="itemFormDeger.adi"
                v-model="itemFormDeger.modelCheckBox"
                v-if="item.uiFormTip.tip === 2"
                dark
              />
            </div>
          </div>
        </q-expansion-item>
      </q-list>
      <q-input
        autogrow
        v-model="item.modelText"
        :label="item.adi"
        counter
        maxlength="512"
        :rules="[
          (val) =>
            val === '' ||
            val.length <= 512 ||
            'Lütfen azami 512 karakter kullanın',
        ]"
        label-color="grey-3"
        color="white"
        v-if="item.uiFormTip.tip === 18 && !item.uiFormDegerListesi"
        dark
        dense
      />
    </div>
  </div>
  <div class="row q-pb-md q-col-gutter-md">
    <div class="col-lg-12 col-md-12 col-sm-6 col-xs-6 text-center">
      <q-btn
        unelevated
        size="md"
        color="primary"
        class="text-white text-capitalize"
        label="Kaydet"
        @click="save"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import formController from "../../controllers/formController"

export default defineComponent({
  name: "FormControl",

  props: {
    kontrolList: {
      type: [Array, Object],
    },
  },

  setup(props) {
    const { saveFormControl, stateControl } = formController()

    const save = async () => {
      await saveFormControl(props.kontrolList)
    }

    return {
      save,
      stateControl,
    }
  },
})
</script>

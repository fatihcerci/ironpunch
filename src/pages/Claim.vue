<template>
  <div class="q-pa-none">
    <q-stepper
      v-model="step"
      ref="stepper"
      active-color="white text-h6"
      done-color="grey-6"
      animated
      dark
      class="no-border"
    >
      <q-step
        :name="1"
        :title="selectedClaim ? selectedClaim.dosyaNo+'/'+selectedClaim.magdurNo : ''"
        icon="details"
        :done="step > 1"
      >
        <list-claim-info />
      </q-step>

      <q-step
        :name="2"
        title="Eksper Raporu"
        caption=""
        icon="rate_review"
        :done="step > 2"
      >
        <list-expert-report />
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            v-if="step !== 2"
            @click="$refs.stepper.next()"
            color="primary"
            label="İleri"
            no-caps
          />
          <q-btn
            color="primary"
            no-caps
            v-if="step > 1"
            @click="$refs.stepper.previous()"
            label="Geri"
          />

        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import claimController from "../controllers/claimController"
import formController from "../controllers/formController"
import apiService from "../services/apiService"
import notify from "../helpers/notification"
import { Api } from "../helpers/api"

export default {
  name: "Claim",
  components: {
    ListClaimInfo: defineAsyncComponent(() =>
      import("src/components/lists/ListClaimInfo.vue")
    ),
    ListExpertReport: defineAsyncComponent(() =>
      import("src/components/lists/ListExpertReport.vue")
    ),
  },

  setup() {
    const { dataList, displayError, displayMessages, fetch } = apiService()
    const router = useRouter()
    const { claimDetail, selectedClaim } = claimController()
    const { formList, stateControl, fetchControl } = formController()

    const getListUiForm = async () => {
      try {
        await fetch(Api.Common.LIST_UI_FORM_URL)
        if (dataList.value) {
          formList.value = dataList.value.map((form) => ({
            ...form,
            modelCheckBox: false,
            modelText: "",
            uiFormDegerListesi: form.uiFormDegerListesi
              ? [
                  ...form.uiFormDegerListesi.map((uiFormDeger) => ({
                    ...uiFormDeger,
                    modelCheckBox: false,
                  })),
                ]
              : null,
          }))
        }
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        notify().error('forwardToExpertReport:: ' + e.message)
      }
    }

    onMounted(async () => {
      await getListUiForm()
      stateControl.data = []
      await fetchControl()
    })

    
    return {
      selectedClaim,
      step: ref(1),
      formList,
      getListUiForm,
    }
  },
}
</script>

<style></style>

<template>
  <div class="q-pa-none">
    <q-list class="bg-card no-border">
      <q-expansion-item
        default-opened
        group="accordion-group"
        icon="brightness_1"
        label="Standart Kontroller"
        header-class="text-white text-h6"
        expand-icon-class="text-white"
      >
        <card-standart-control />
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="accordion-group"
        icon="brightness_1"
        label="Hasar Nedenine Bağlı Kontroller"
        header-class="text-white text-h6"
        expand-icon-class="text-white"
      >
        <card-claim-reason-control />
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="accordion-group"
        icon="playlist_add_circle"
        label="Hasar Ekleme"
        header-class="text-white text-h6"
        expand-icon-class="text-white"
      >
        <card-add-claim />
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="accordion-group"
        icon="image"
        label="Hasar Evrakları"
        header-class="text-white text-h6"
        expand-icon-class="text-white"
      >
        <card-claim-image />
      </q-expansion-item>
      <q-expansion-item
        group="accordion-group"
        icon="settings_suggest"
        label="Kompleks İşlemler"
        header-class="text-white text-h6"
        expand-icon-class="text-white"
      >
        <card-complex />
      </q-expansion-item>
      <q-expansion-item
        group="accordion-group"
        icon="text_fields"
        label="Sonuç / Kanaat"
        header-class="text-white text-h6"
        expand-icon-class="text-white"
      >
        <card-report-result />
      </q-expansion-item>
    </q-list>
    <div class="q-pt-md">
      <q-btn-group spread>
        <q-btn
          outline
          label="Rapor Ön İzleme"
          class="text-capitalize"
          @click="saveExpertReportInfo()"
        />
        <q-btn
          outline
          label="Ön Rapor Kapat"
          class="text-capitalize"
          @click="saveExpertReport('1')"
        />
        <q-btn outline label="Rapor Kapat"
          class="text-capitalize"
          :disable="selectedClaim.eksperDosyaDurumKodu !== '3'"
          @click="saveExpertReport('2')"/>
      </q-btn-group>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, onMounted } from "vue"
import expertReportController from "../../controllers/expertReportController"
import claimController from "../../controllers/claimController"

export default {
  name: "ListExpertReport",
  components: {
    CardStandartControl: defineAsyncComponent(() =>
      import("src/components/cards/CardStandartControl.vue")
    ),
    CardClaimReasonControl: defineAsyncComponent(() =>
      import("src/components/cards/CardClaimReasonControl.vue")
    ),
    CardAddClaim: defineAsyncComponent(() =>
      import("src/components/cards/CardAddClaim.vue")
    ),
    CardClaimImage: defineAsyncComponent(() =>
      import("src/components/cards/CardClaimImage.vue")
    ),
    CardComplex: defineAsyncComponent(() =>
      import("src/components/cards/CardComplex.vue")
    ),
    CardReportResult: defineAsyncComponent(() =>
      import("src/components/cards/CardReportResult.vue")
    ),
  },

  setup() {
    const {
      initExpertReportInfo,
      saveExpertReportInfo,
      fetchExpertReportInfo,
      saveExpertReport,
    } = expertReportController()

    const { selectedClaim } = claimController()

    onMounted(async () => {
      await initExpertReportInfo()
      await fetchExpertReportInfo()
    })

    return {
      initExpertReportInfo,
      saveExpertReportInfo,
      fetchExpertReportInfo,
      saveExpertReport,
      selectedClaim,
    }
  },
}
</script>

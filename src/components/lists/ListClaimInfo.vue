<template>
  <div class="q-pa-none">
    <q-list class="bg-card no-border">
      <q-expansion-item
        group="accordion-group"
        icon="portrait"
        label="Sigortalı ve Poliçe Bilgileri"
        default-opened
        header-class="text-white text-h6"
        expand-icon-class="text-white"
      >
        <card-insured-and-policy-info />
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="accordion-group"
        icon="support_agent"
        label="Acente Bilgileri"
        header-class="text-white text-h6"
        expand-icon-class="text-white"
      >
        <card-agent-info />
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="accordion-group"
        icon="library_books"
        label="Hasar Bilgileri"
        header-class="text-white text-h6"
        expand-icon-class="text-white"
      >
        <card-claim-info />
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="accordion-group"
        icon="event_note"
        label="Randevu Bilgileri"
        header-class="text-white text-h6"
        expand-icon-class="text-white"
      >
        <card-appointment-info />
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="accordion-group"
        icon="change_circle"
        label="Eksper Dosya Durumu"
        header-class="text-white text-h6"
        expand-icon-class="text-white"
      >
        <card-change-expert-status />
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue"

export default {
  name: "ListClaimInfo",
  components: {
    CardInsuredAndPolicyInfo: defineAsyncComponent(() =>
      import("src/components/cards/CardInsuredAndPolicyInfo.vue")
    ),
    CardAgentInfo: defineAsyncComponent(() =>
      import("src/components/cards/CardAgentInfo.vue")
    ),
    CardClaimInfo: defineAsyncComponent(() =>
      import("src/components/cards/CardClaimInfo.vue")
    ),
    CardAppointmentInfo: defineAsyncComponent(() =>
      import("src/components/cards/CardAppointmentInfo.vue")
    ),
    CardChangeExpertStatus: defineAsyncComponent(() =>
      import("src/components/cards/CardChangeExpertStatus.vue")
    ),
  },
}
</script>

<style></style>

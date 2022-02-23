<template>
  <q-list class="bg-card no-border">
    <q-expansion-item
      label="İhale Bilgileri"
      default-opened
      header-class="text-white text-h6 bg-grey-9"
      expand-icon=" "
    >
      <card-tender-info />
    </q-expansion-item>


    <q-expansion-item
      label="Araç Bilgileri"
      default-opened
      header-class="text-white text-h6 bg-grey-9"
      expand-icon=" "
    >
      <card-vehicle-info />
    </q-expansion-item>

    <div class="row q-pb-md q-col-gutter-md">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-expansion-item
          label="Donanım Bilgileri"
          default-opened
          header-class="text-white text-h6 bg-grey-9"
          expand-icon=" "
        >
          <card-vehicle-hardware-info />
        </q-expansion-item>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-expansion-item
          label="İlave Donanım Bilgileri"
          default-opened
          header-class="text-white text-h6 bg-grey-9"
          expand-icon=" "
        >
          <card-vehicle-additional-hardware-info />
        </q-expansion-item>
      </div>
    </div>

    <q-expansion-item
      label="Notlar"
      default-opened
      header-class="text-white text-h6 bg-grey-9"
      expand-icon=" "
    >
      <card-notes />
    </q-expansion-item>

    <q-expansion-item
      label="Servis Bilgileri"
      default-opened
      header-class="text-white text-h6 bg-grey-9"
      expand-icon=" "
    >
      <card-service-info />
      <br>
      <br>
    </q-expansion-item>

    
  </q-list>

  <dialog-give-offer />

  

  
</template>

<script>
import { defineAsyncComponent, toRefs, reactive } from "vue"

export default {
  name: "ListTenderInfo",
  components: {
    CardTenderInfo: defineAsyncComponent(() =>
      import("src/components/cards/CardTenderInfo.vue")
    ),
    CardVehicleInfo: defineAsyncComponent(() =>
      import("src/components/cards/CardVehicleInfo.vue")
    ),
    CardVehicleHardwareInfo: defineAsyncComponent(() =>
      import("src/components/cards/CardVehicleHardwareInfo.vue")
    ),
    CardVehicleAdditionalHardwareInfo: defineAsyncComponent(() =>
      import("src/components/cards/CardVehicleAdditionalHardwareInfo.vue")
    ),
    CardNotes: defineAsyncComponent(() =>
      import("src/components/cards/CardNotes.vue")
    ),
    CardServiceInfo: defineAsyncComponent(() =>
      import("src/components/cards/CardServiceInfo.vue")
    ),
    DialogGiveOffer: defineAsyncComponent(() =>
      import("src/components/dialogs/DialogGiveOffer.vue")
    ),
  },

  setup() {
    
  }
}
</script>

<style></style>

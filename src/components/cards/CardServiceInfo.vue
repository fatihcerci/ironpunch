<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-md">
        
      <div class="row q-pb-md q-col-gutter-md">
        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="unvan"
            label="Ünvan"
            readonly
            autogrow
            dark
          />
        </div>
        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
          <q-input  
            v-model="iletisim" 
            label="İletişim" 
            readonly 
            autogrow
            dark />
        </div>
        <div class="col-lg-6 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="adres"
            label="Adres"
            autogrow
            readonly
            dark
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { toRefs, reactive, defineComponent, defineAsyncComponent } from "vue"
import claimController from "../../controllers/claimController"

export default defineComponent({
  name: "CardVehicleInfo",
  components: {
    
  },
  setup() {
    const { claimDetail } = claimController()
    const state = reactive({
      unvan : claimDetail.value.servisBilgileri.unvan,
      iletisim : claimDetail.value.servisBilgileri.iletisim,
      adres : claimDetail.value.servisBilgileri.adres
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>
<style lang="scss" scoped>
/*.q-field__control-container::v-deep .q-field__label {
    font-size:30px;
  }*/
</style>

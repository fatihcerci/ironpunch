<template>
  <q-card dark class="bg-transparent">
    <q-card-section>
      TÜM ÇEKİM İŞLEMLERİ İÇİN ARACIN SERVİSTEN YA DA OTOPARKTAN TESLİM ALINMASINDA OLUŞAN OTOPARK/EKSPERTİZ VE BENZERİ MASRAFLAR ALICIYA AİT OLUP, 
      GÜNCEL MASRAFLARIN ÖĞRENİLMESİ İÇİN ARACIN BULUNDUĞU YER İLE İRTİBATA GEÇİLMESİ (SERVİS/OTOPARK vs.) ALICI SORUMLULUĞUNDADIR. 
      ARAÇ GÖRÜLMEYE GİDİLMEDEN ÖNCE BELİRTİLEN ADRESİN ARANARAK ARACIN BELİRTİLEN ADRESTE OLUP OLMADIĞINA İLİŞKİN TEYİT ALINMASI ÖNEMLE RİCA OLUNUR.
    </q-card-section>
  </q-card>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-md">
        
      <div class="row q-pb-md q-col-gutter-md">
        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="aracNo"
            label="Araç No"
            readonly
            dark
          />
        </div>
        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
          <q-input  
            v-model="odenecekToplamOtoparkUcreti" 
            label="Ödenecek Toplam Otopark Ücreti (₺)" 
            readonly 
            dark />
        </div>
        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="agirHasarliCalintiArac"
            label="Ağır Hasarlı / Çalıntı Araç"
            readonly
            dark
          />
        </div>
        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="hurdaCekmeBelgeli"
            label="Hurda / Çekme Belgeli"
            readonly
            dark
          />
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-input
            v-model="garajBilgisi"
            label="Garaj Bilgisi"
            readonly
            autogrow
            dark
          />
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-input
            v-model="sigortaSirketiNotu"
            label="Sigorta Şirketi Notu"
            readonly
            autogrow
            dark
          />
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-input
            v-model="aracinBorcDurumu"
            label="Aracın Borç Durumu"
            readonly
            autogrow
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
      aracNo : claimDetail.value.notlar.aracNo ? claimDetail.value.notlar.aracNo : " ",
      odenecekToplamOtoparkUcreti : claimDetail.value.notlar.odenecekToplamOtoparkUcreti ? claimDetail.value.notlar.odenecekToplamOtoparkUcreti : " ",
      agirHasarliCalintiArac : claimDetail.value.notlar.agirHasarliCalintiArac ? claimDetail.value.notlar.agirHasarliCalintiArac : " ",
      hurdaCekmeBelgeli : claimDetail.value.notlar.hurdaCekmeBelgeli ? claimDetail.value.notlar.hurdaCekmeBelgeli : " ",
      garajBilgisi : claimDetail.value.notlar.garajBilgisi ? claimDetail.value.notlar.garajBilgisi : " ",
      sigortaSirketiNotu : claimDetail.value.notlar.sigortaSirketiNotu ? claimDetail.value.notlar.sigortaSirketiNotu : " ",
      aracinBorcDurumu : claimDetail.value.notlar.aracinBorcDurumu ? claimDetail.value.notlar.aracinBorcDurumu : " "
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

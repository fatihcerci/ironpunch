<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-md">
      <div class="row q-pb-md q-col-gutter-md">
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-input
            v-model="ihaleNo"
            label="İhale No"
            readonly
            dark
          />
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-input  
            v-model="ihaleBaslangicTarihi" 
            label="İhale Başlangıç Tarihi" 
            readonly 
            dark />
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-input
            v-model="ihaleBitisTarihi"
            label="İhale Bitiş Tarihi"
            readonly
            dark
          />
        </div>
        <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12">
          <q-input
            v-model="ihaleninBitmesineKalanSure"
            label="İhalenin Bitmesine Kalan Süre"
            readonly
            dark
          />
        </div>
        <div class="col-lg-1 col-md-3 col-sm-12 col-xs-12">
          <q-input
            v-model="brans"
            label="Branş"
            readonly
            dark
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { toRefs, reactive, defineComponent, onMounted} from "vue"
import claimController from "../../controllers/claimController"
import { Format } from "../../helpers/format"
import { useRouter } from "vue-router"

export default defineComponent({
  name: "CardTenderInfo",
  components: {
    
  },
  setup() {
    const { claimDetail } = claimController()
    const router = useRouter()
    const state = reactive({
      onizleme : claimDetail.value.ihaleBilgileri.onizleme,
      ihaleNo: claimDetail.value.ihaleBilgileri.ihaleNo,
      ihaleBaslangicTarihi: claimDetail.value.ihaleBilgileri.ihaleBaslangicTarihiStr,
      ihaleBitisTarihi : claimDetail.value.ihaleBilgileri.ihaleBitisTarihiStr,
      brans : claimDetail.value.ihaleBilgileri.brans,
      ihaleninBitmesineKalanSure : claimDetail.value.ihaleBilgileri.ihaleninBitmesineKalanSure
    })

    const updateTimer = () => {
      if (claimDetail.value) {
        const intervalId = setInterval(() => {
          var _second = 1000
          var _minute = _second * 60
          var _hour = _minute * 60
          var _day = _hour * 24

          var end = new Date(claimDetail.value.ihaleBilgileri.ihaleBitisTarihi)
          var now = new Date()
          var distance = end - now
          if (distance <= 0) {
              state.ihaleninBitmesineKalanSure = "SÜRESİ GEÇTİ"
              clearInterval(intervalId)
          } else if(distance > 0) {
            var days = Math.floor(distance / _day)
            var hours = Math.floor((distance % _day) / _hour)
            var minutes = Math.floor((distance % _hour) / _minute)
            var seconds = Math.floor((distance % _minute) / _second)
            
            var kalanTitle = ""
            if(days > 0) {
                kalanTitle = kalanTitle + days + " GÜN "
            }
            if(hours > 0) {
                kalanTitle = kalanTitle + hours + " SAAT "
            }
            if(minutes > 0) {
                kalanTitle = kalanTitle + minutes + " DAKİKA "
            }
            if(seconds > 0) {
                kalanTitle = kalanTitle + seconds + " SANİYE"
            }
            state.ihaleninBitmesineKalanSure = kalanTitle
          }
        }, Format.Time.ONE_SECOND)
      }

    }

    onMounted(async () => {
      updateTimer()
    })

    return {
      ...toRefs(state),
      updateTimer
    }
  },
})
</script>
<style lang="scss" scoped>
/*.q-field__control-container::v-deep .q-field__label {
    font-size:30px;
  }*/
</style>

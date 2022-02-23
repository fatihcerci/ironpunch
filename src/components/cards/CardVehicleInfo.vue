<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-md">
      <div class="row q-pb-md q-col-gutter-md" >
        <div class="col-lg-4 col-md-2 col-sm-12 col-xs-12 module">
          <!--<img
            :src="onizlemeOrj"
            class=""
            style="width:100%; height:100%;"
          />
          -->
          <q-carousel
            style="width:100%; border-radius:10px"
            swipeable
            animated
            v-model="slide"
            v-model:fullscreen="fullscreen"
            :autoplay="autoplay == true ? 2000 : autoplay"
            ref="carousel"
            infinite
            thumbnails
          >
          
          <!--
            <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
            <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />

            -->
            

            <q-carousel-slide
                v-for="(item, index) in fotograflar"
                :name="++index"
                :key="item.name"
                :img-src="item.src"
              />

              

            <template v-slot:control>
              <q-carousel-control
                position="top-right"
                :offset="[10, 10]"
                class="text-white rounded-borders"
                style="background: rgba(0, 0, 0, 0.4); padding: 4px 8px;"
              >
                <q-toggle dense dark color="red" v-model="autoplay" label="Otomatik Oynat" />
              </q-carousel-control>

              <q-carousel-control
                position="bottom-right"
                :offset="[10, 25]"
                class="q-gutter-xs"
              >
                <q-btn
                  push round dense color="red" text-color="white" icon="arrow_left"
                  @click="$refs.carousel.previous()"
                />
                <q-btn
                  push round dense color="red" text-color="white" icon="arrow_right"
                  @click="$refs.carousel.next()"
                />

                <q-btn
                  push round dense color="red" text-color="white"
                  :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="fullscreen = !fullscreen"
                />
              </q-carousel-control>
            </template>
          </q-carousel>
        </div>
        <div class="col-lg-8 col-md-2 col-sm-12 col-xs-12" >
          <div class="row q-pb-md q-col-gutter-md" style="padding:0.5rem">
            <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
              <q-input
                v-model="marka"
                label="Marka"
                readonly
                autogrow
                dark
              />
            </div>
            <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
              <q-input  
                v-model="model" 
                label="Model" 
                readonly 
                autogrow
                dark />
            </div>
            <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
              <q-input
                v-model="yil"
                label="Yıl"
                readonly
                autogrow
                dark
              />
            </div>
          
            <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
              <q-input
                v-model="renk"
                label="Renk"
                readonly
                autogrow
                dark
              />
            </div>
          </div>
          <div class="row q-pb-md q-col-gutter-md" style="padding:0.5rem">
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <q-input
                v-model="digerRenk"
                label="Diğer Renk"
                readonly
                autogrow
                dark
              />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <q-input
                v-model="greyMarket"
                label="Grey Market"
                readonly
                autogrow
                dark
              />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <q-input
                v-model="calintiBuluntu"
                label="Çalıntı / Buluntu"
                readonly
                autogrow
                dark
              />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <q-input
                v-model="kilometre"
                label="Kilometre"
                readonly
                autogrow
                dark
              />
            </div>
          </div>
          <div class="row q-pb-md q-col-gutter-md" style="padding:0.5rem">
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <q-input
                v-model="vitesTipi"
                label="Vites Tipi"
                readonly
                autogrow
                dark
              />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <q-input
                v-model="yakitTipi"
                label="Yakıt Tipi"
                readonly
                autogrow
                dark
              />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <q-input
                v-model="lpgDurumu"
                label="LPG Durumu"
                readonly
                autogrow
                dark
              />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <q-input
                v-model="aksesuarlar"
                label="Aksesuarlar"
                readonly
                autogrow
                dark
              />
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { toRefs, reactive, defineComponent, defineAsyncComponent, ref } from "vue"
import claimController from "../../controllers/claimController"

export default defineComponent({
  name: "CardVehicleInfo",
  components: {
    
  },
  setup() {
    const { claimDetail } = claimController()
    const state = reactive({
      onizlemeOrj : claimDetail.value.ihaleBilgileri.onizlemeOrj,
      fotograflar : claimDetail.value.fotograflar,
      marka: claimDetail.value.aracBilgileri.marka,
      model: claimDetail.value.aracBilgileri.model,
      yil : claimDetail.value.aracBilgileri.yil,
      renk : claimDetail.value.aracBilgileri.renk,
      digerRenk : claimDetail.value.aracBilgileri.digerRenk,
      greyMarket : claimDetail.value.aracBilgileri.greyMarket,
      calintiBuluntu : claimDetail.value.aracBilgileri.calintiBuluntu,
      kilometre : claimDetail.value.aracBilgileri.kilometre,
      vitesTipi : claimDetail.value.aracBilgileri.vitesTipi,
      yakitTipi : claimDetail.value.aracBilgileri.yakitTipi,
      lpgDurumu : claimDetail.value.aracBilgileri.lpgDurumu,
      aksesuarlar : claimDetail.value.aracBilgileri.aksesuarlar
    })

    return {
      ...toRefs(state),
      slide: ref(1),
      autoplay: ref(true),
      fullscreen: ref(false)
    }
  },
})
</script>
<style lang="scss" scoped>
/*.q-field__control-container::v-deep .q-field__label {
    font-size:30px;
  }*/

</style>

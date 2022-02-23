<template>
  <div class="q-pa-md">
    <q-carousel
      style="min-height: 750px"
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
          :offset="[18, 18]"
          class="text-white rounded-borders"
          style="background: rgba(0, 0, 0, .3); padding: 4px 8px;"
        >
          <q-toggle dense dark color="orange" v-model="autoplay" label="Otomatik Oynat" />
        </q-carousel-control>

        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
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
</template>

<script>
import { toRefs, reactive, defineComponent, defineAsyncComponent, ref} from "vue"
import claimController from "../../controllers/claimController"

export default defineComponent({
  name: "CardVehicleImages",
  components: {
    
  },
  setup() {
    const { claimDetail } = claimController()
    const state = reactive({
      fotograflar : claimDetail.value.fotograflar
    })

    return {
      ...toRefs(state),
      slide: ref(1),
      autoplay: ref(false),
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

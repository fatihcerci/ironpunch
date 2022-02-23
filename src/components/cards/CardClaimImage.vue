<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-md">
      <q-carousel
        swipeable
        animated
        v-model="slide"
        v-model:fullscreen="fullscreen"
        ref="carousel"
        navigation
        navigation-position="top"
        infinite
        padding
        dark
      >
        <q-carousel-slide
          v-for="item in loadedFileList"
          :class="rotate"
          :name="item.oid"
          :key="item.oid"
          class="column no-wrap"
        >
          <div
            class="
              row
              fit
              justify-center
              items-center
              q-gutter-xs q-col-gutter
              no-wrap
            "
          >
            <q-img
              class="
                rounded-borders
                col-lg-8 col-md-8 col-sm-12 col-xs-12
                full-height
              "
              :src="BASE_IMAGE_URL + '/' + item.evrakLink"
            />
          </div>
        </q-carousel-slide>

        <template v-slot:control>
          <q-carousel-control
            position="bottom-right"
            :offset="[9, 18]"
            class="q-gutter-xs"
          >
            <q-btn
              push
              round
              dense
              color="white"
              text-color="primary"
              :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="fullscreen = !fullscreen"
            />
            <q-btn
              :disable="disable"
              push
              round
              dense
              color="primary"
              icon="undo"
              @click="rotateLeft()"
            />
            <q-btn
              push
              round
              dense
              color="primary"
              icon="redo"
              @click="rotateRight()"
            />
            <q-btn
              push
              round
              dense
              color="primary"
              icon="arrow_left"
              @click="$refs.carousel.previous()"
            />
            <q-btn
              push
              round
              dense
              color="primary"
              icon="arrow_right"
              @click="$refs.carousel.next()"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </q-card-section>
    <q-separator />
  </q-card>
  <q-card class="bg-transparent no-shadow no-border flex justify-center" v-if="isRaporEkrani">
    <q-card-section class="q-pa-md">
      <q-select
        :options="evrakDizi"
        v-model="evrak"
        label="Evraklar"
        dark
        color="white"
        dense
        borderless
        emit-value
        map-options
        options-dense
      />

      <q-uploader
        auto-expand
        :url="
          BASE_IMAGE_URL +
          '/dispatch?cmd=executeEvrakYukleFromExternal&jsonBody=true'
        "
        :factory="uploadFile"
        @uploaded="onUploaded"
        @failed="onFailed"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref, computed, onMounted, toRefs } from "vue"
import apiService from "../../services/apiService"
import claimController from "../../controllers/claimController"
import fileController from "../../controllers/fileController"
import { Api } from "../../helpers/api"
import notify from "../../helpers/notification"

export default defineComponent({
  name: "CardClaimImage",
  props: {
    isRaporEkrani: {
      type: Boolean,
      default: true,
  	},
  },
  setup() {
    const { dataList, displayError, displayMessages, fetch } = apiService()
    const {
      slide,
      resetFiles,
      initFileController,
      loadedFileList,
      stateFiles,
    } = fileController()
    const { selectedClaim } = claimController()
    const degree = ref(0)
    const showImage = ref(false)
    const BASE_IMAGE_URL = ref(Api.Base.URL)

    onMounted(async () => {
      await initFileController()
    })

    const disable = computed(() => {
      return degree.value === 0
    })

    const rotate = computed(() => {
      return degree.value === 0 ? "zoom" : "zoom rotate-" + degree.value
    })

    const rotateRight = () => {
      degree.value = degree.value === 0 ? 0 : degree.value
      degree.value = degree.value + 90
    }

    const rotateLeft = () => {
      degree.value = degree.value - 90
    }

    const zoom = (e) => {
      let zoomer = e.currentTarget
      let offsetX = 0
      let offsetY = 0
      e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.pageX)
      e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.pageX)
      let x = (offsetX / zoomer.offsetWidth) * 100
      let y = (offsetY / zoomer.offsetHeight) * 100
      zoomer.style.backgroundPosition = x + "% " + y + "%"
    }

    const uploadFile = async (files) => {
      const fileData = await toBase64(files[0])
      return new Promise(async (resolve, reject) => {
        try {
          const bodyData = {
            claimOid: selectedClaim.value.oid,
            fileName: files[0].name,
            fileData: fileData,
            documentCode: stateFiles.evrak ? stateFiles.evrak : '50',
          }
          await fetch(Api.Claim.UPLOAD_FILE_URL, bodyData)
          if (displayError.value) throw new Error(displayMessages.value[0].text)
          resolve(true)
        } catch (e) {
          reject(false)
          notify().error(e.message)
        }
      })
    }

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result.split(",")[1])
        reader.onerror = (error) => reject(error)
      })

    const onUploaded = async () => {
      resetFiles()
      await initFileController()
      notify().success("Dosya başarıyla yüklendi")
    }

    const onFailed = () => {
      notify().warn("Dosya yüklenirken hata oluştu")
    }

    return {
      slide,
      BASE_IMAGE_URL,
      fullscreen: ref(false),
      degree,
      showImage,
      disable,
      rotate,
      rotateRight,
      rotateLeft,
      zoom,
      ...toRefs(stateFiles),
      loadedFileList,
      uploadFile,
      onUploaded,
      onFailed,
      toBase64,
    }
  },
})
</script>

<style scoped lang="scss">
/*.zoom {
  & img:hover {
    opacity: 0;
  }
  img {
    transition: opacity 0.5s;
    display: block;
    width: 100%;
  }
  background-position: 50% 50%;
  position: relative;
  overflow: hidden;
  cursor: zoom-in;
}*/
</style>

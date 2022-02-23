<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-none">
      <div class="row q-col-gutter-md">
        <div
          v-for="(item, index) in cardData"
          :key="index"
          class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
        >
          <q-item
            :style="`background-color: ${item.color1}`"
            class="q-pa-none card-widget"
          >
            <q-item-section class="q-pa-md q-ml-none text-white">
              <q-item-label class="text-white text-h3 text-weight-bolder">{{
                item.numberOfRecords
              }}</q-item-label>
              <q-item-label :class="item.lblClass" style="white-space: pre">{{
                item.title
              }}</q-item-label>
            </q-item-section>
            <q-item-section
              v-if="icon_position === 'right'"
              side
              class="q-mr-md"
            >
              <!--<q-icon :name="item.icon" color="primary" size="44px"></q-icon>-->
              <q-btn
                :color="item.iconColor"
                size="lg"
                round
                :icon="item.icon"
                :class="item.btnClass"
                @click="fetchExpertClaimData"
              />
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
// eslint-disable-next-line no-unused-vars

import { computed } from "vue"
import apiService from "../../services/apiService"
const initCardData = [
  {
    title: `Yeni İhbarlar`,
    icon: " local_fire_department",
    numberOfRecords: "0",
    color1: "#272727",
    btnClass: "q-ml-md text-orange-10",
    lblClass: "font-18 text-orange-3 text-weight-bolder",
    iconColor: "orange-1",
  },
]
/*
    title: `Konut Açık
Olan Dosyalar`,
    icon: "folder_open",
    value: "24",
    color1: "#272727",
    btnClass: "q-ml-md text-teal-10",
    lblClass: "font-16 text-teal-3",
    iconColor: "teal-1",
  },
  {
    title: `Ekspertizi Yapılmamış
Dosyalar`,
    icon: "error_outline",
    value: "0",
    color1: "#272727",
    btnClass: "q-ml-md text-blue-10",
    lblClass: "font-16 text-blue-3",
    iconColor: "blue-1",
  },
  {
    title: `Neden Açık Notu Girilmesi
Gereken Dosyalar`,
    icon: "question_answer",
    value: "0",
    color1: "#272727",
    btnClass: "q-ml-md text-purple-10",
    lblClass: "font-16 text-purple-3",
    iconColor: "purple-1",
  },*/

export default {
  name: "CardActions",
  props: {
    icon_position: {
      required: false,
      default: "left",
    },
  },

  setup() {
    const { claimList, fetchExpertClaimData } = apiService()
    const cardData = computed(() => {
      if (claimList.value) {
        initCardData[0].numberOfRecords =
          claimList.value.otoDisiDisEksperDosyaDurumSonucView.randevuBekleyenDosyalarinSayisi
      }
      return initCardData
    })

    return {
      cardData,
      claimList,
      fetchExpertClaimData,
    }
  },
}
</script>

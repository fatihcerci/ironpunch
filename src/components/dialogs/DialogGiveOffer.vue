<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn glossy color="primary" icon="add" label="TEKLİF VER" @click="giveOfferDialog()" />
  </q-page-sticky>

  <q-page-sticky position="bottom-left" :offset="[18, 18]">
    <q-btn glossy color="primary" icon="keyboard_arrow_left" label="GERİ DÖN" @click="goHome()" />
  </q-page-sticky>

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Uyarı</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="row items-center">
        <div class="font-16">İlgili ihaleye teklif verebilmeniz için giriş yapmanız gerekmektedir.</div> 
      </q-card-section>
      <q-card-section class="row items-center">
        <div class="font-16">Kullanıcı hesabınız bulunmuyorsa Yeni Başvuru sayfasından kullanıcı başvurusu yapabilirsiniz.</div> 
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Giriş Yap" color="primary" @click="goLoginPage()" />
        <q-btn label="Yeni Başvuru" color="primary" @click="goAppealPage()"  />
      </q-card-actions>
    </q-card>
  </q-dialog>


  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 20vw">

      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Teklif Ver</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="">
        <q-input dense outlined readonly v-model="sonTeklif"  label="Son Teklif Tutarı" stack-label reverse-fill-mask mask="###.###.###.###.### ₺">
          <template v-slot:append>
            <q-icon class="cursor-pointer" @click="getLatestOfferPrice" name="autorenew">
            </q-icon>
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input 
          outlined 
          autofocus 
          clearable
          reverse-fill-mask
          v-model="teklifTutari" 
          label="Teklif Tutarı (₺)" stack-label
          mask="###.###.###.###.### ₺"
          :rules="[(val) => !!val || 'Lütfen teklif tutarını giriniz']" > 
          </q-input>
      </q-card-section>

      <q-card-actions class="q-pt-none justify-center" align="center">
        <q-btn 
          style="width: 100%"
          color="primary" 
          label="Teklif Ver" 
          @click="giveOffer()" />
      </q-card-actions>


      <table-offers />

    </q-card>
  </q-dialog>


</template>
<script>
import { defineComponent, defineAsyncComponent, toRefs, reactive } from "vue"
import { useRouter } from "vue-router"
import { Api } from "../../helpers/api"
import usersService from "../../services/usersService"
import claimController from "../../controllers/claimController"
import apiService from "../../services/apiService"
import notify from "../../helpers/notification"

export default defineComponent({
  name: "DialogGiveOffer",
  components: {
    TableOffers: defineAsyncComponent(() =>
      import("src/components/tables/TableOffers.vue")
    )
  },
  setup() {
    const router = useRouter()
    const hasUser = usersService().hasUser()
    const { dataList, displayError, displayMessages, fetch } = apiService()
    const { claimDetail, offerList } = claimController()

    const state = reactive({
      confirm : false,
      prompt : false,
      teklifTutari : null,
      ihaleNo : claimDetail.value.ihaleBilgileri.ihaleNo,
      oidPertIhale : claimDetail.value.ihaleBilgileri.ihaleNo,
      sonTeklif : claimDetail.value.ihaleBilgileri.ihaleSonTeklifTutari
    })

    const giveOfferDialog = async () => {
      if(!hasUser) {
        state.confirm = true
      } else {
        await getLatestOfferPrice()
        state.prompt = true
      }
    }

    const giveOffer = async () => {
      if(state.teklifTutari) {
        try {
          const bodyData = {
            ihaleNo: state.ihaleNo,
            teklifTutari : state.teklifTutari.split(" ")[0].replaceAll(".", ""),
            serviceUrl : Api.Base.ServiceURL
          }
          await fetch(Api.Tender.EXECUTE_GIVE_OFFER, bodyData)
          if (displayError.value) throw new Error(displayMessages.value[0].text)

          notify().success("Teklifiniz gönderilmiştir")
          getLatestOfferPrice()
        } catch (e) {
          notify().error(e.message)
        }

      } 
    }

    const goLoginPage = () => {
      router.push(`/auth`)
      //router.replace("/auth")
    }

    const goHome = () => {
      router.push(`/`)
      //router.replace("/")
    }

    const goAppealPage = () => {
      window.open(
        Api.Base.AppealURL,
        '_blank'
      )
    }

    const getLatestOfferPrice = async () => {
      try {
        const bodyData = {
          ihaleNo: state.ihaleNo,
          serviceUrl : Api.Base.ServiceURL
        }
        await fetch(Api.Tender.GET_TENDER_GIVE_OFFER_VIEW, bodyData)
        if (displayError.value) throw new Error(displayMessages.value[0].text)

        state.sonTeklif = dataList.value.sonTeklifTutari
        offerList.value = dataList.value.teklifListesi
      } catch (e) {
        notify().error(e.message)
      }
    }

    return {
      ...toRefs(state),
      hasUser,
      goLoginPage,
      goHome,
      goAppealPage,
      giveOfferDialog,
      giveOffer,
      getLatestOfferPrice,
    }
  }
})
</script>

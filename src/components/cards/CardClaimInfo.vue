<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-md">
      <div class="row q-pb-md q-col-gutter-md">
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-input v-model="dosyaNo" label="Dosya Numarası" disable dark />
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-input v-model="magdurNo" label="Mağdur Numarası" disable dark />
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-input v-model="ihbarNo" label="İhbar Numarası" disable dark />
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-input
            v-model="dosyaYoneticisi"
            label="Dosya Yöneticisi"
            disable
            dark
          />
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-input
            v-model="ihbarTarihi"
            mask="####-##-## ##:##"
            label="İhbar Tarihi"
            disable
            dark
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="ihbarTarihiProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="ihbarTarihi"
                    mask="YYYY-MM-DD HH:MM"
                    @input="() => $refs.ihbarTarihiProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-input
            v-model="hasarTarihi"
            mask="####-##-## ##:##"
            label="Hasar Tarihi"
            disable
            dark
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="hasarTarihiProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="hasarTarihi"
                    mask="YYYY-MM-DD HH:MM"
                    @input="() => $refs.hasarTarihiProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-input v-model="hasarNedeni" label="Hasar Nedeni" disable dark />
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-input
            v-model="altHasarNedeni"
            label="Alt Hasar Nedeni"
            disable
            dark
          />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-input
            v-model="tahminiHasarTutari"
            label="Tahmini Hasar Tutarı"
            disable
            dark
            input-class="text-right"
            :suffix="dovizCinsiPkodu"
          />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-input
            v-model="irtibataGecilecekAdSoyad"
            label="İrtibata Geçilecek Ad Soyad"
            disable
            dark
          />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-input
            v-model="irtibataGecilecekGsm"
            label="İrtibata Geçilecek Cep Telefonu"
            disable
            dark
          />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-input v-model="katastrof" label="Katastrof" disable dark />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-input
            v-model="ekspertizAdresi"
            label="Ekspertiz Adresi"
            disable
            dark
          />
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-left">
          <q-list
            class="bg-card no-border q-pa-none"
          >
            <q-expansion-item
              class="q-pa-none"
              group="accordion-group-previous-claims"
              label="Önceki Dosyalar"
              header-class="text-white"
              expand-icon-class="text-white"
            >
              <table-previous-claims />
            </q-expansion-item>
          </q-list>

        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { toRefs, reactive, defineComponent, defineAsyncComponent } from "vue"
import claimController from "../../controllers/claimController"
export default defineComponent({
  name: "CardClaimInfo",
  components: {
    TablePreviousClaims: defineAsyncComponent(() =>
      import("src/components/tables/TablePreviousClaims.vue")
    ),
  },
  setup() {
    const { claimDetail } = claimController()

    const state = reactive({
      ihbarTarihi: claimDetail.value.hasarView.ihbarTarihi,
      hasarTarihi: claimDetail.value.hasarView.hasarTarihi,
      dosyaNo: claimDetail.value.hasarView.dosyaNo,
      magdurNo: claimDetail.value.hasarView.magdurNo,
      ihbarNo: claimDetail.value.hasarView.ihbarNo,
      dosyaYoneticisi: claimDetail.value.hasarView.dosyaYoneticisi,
      tahminiHasarTutari: claimDetail.value.hasarView.tahminiHasarTutari,
      dovizCinsiPkodu: claimDetail.value.hasarView.dovizCinsiPkodu,
      hasarNedeni: claimDetail.value.hasarView.hasarNedeni,
      altHasarNedeni: claimDetail.value.hasarView.altHasarNedeni,
      ekspertizAdresi: claimDetail.value.hasarView.ekspertizAdresi,
      irtibataGecilecekAdSoyad:
        claimDetail.value.hasarView.irtibataGecilecekAdSoyad,
      irtibataGecilecekGsm: claimDetail.value.hasarView.irtibataGecilecekGsm,
      katastrof: claimDetail.value.hasarView.katastrof,
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>

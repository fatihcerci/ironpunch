<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-md">
      <div class="row q-pb-md q-col-gutter-md">
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-input v-model="sigortali" label="Sigortalı" disable dark />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-input
            v-model="sigortaliCepTelefon"
            label="Cep Telefonu"
            disable
            dark
          />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-input
            v-model="sigortaEttiren"
            label="Sigorta Ettiren"
            disable
            dark
          />
        </div>
        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="policeNo"
            label="Poliçe Numarası"
            disable
            dark
          />
        </div>
        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="tecditNo"
            label="Tecdit Numarası"
            disable
            dark
          />
        </div>
        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="zeyilNo"
            label="Zeyil Numarası"
            disable
            dark
          />
        </div>
        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="baslangicTarihi"
            mask="####-##-## ##:##"
            label="Poliçe Başlangıç Tarihi"
            disable
            dark
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="baslangicTarihiProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="baslangicTarihi"
                    mask="YYYY-MM-DD HH:MM"
                    @input="() => $refs.baslangicTarihiProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="bitisTarihi"
            mask="####-##-## ##:##"
            label="Poliçe Bitiş Tarihi"
            disable
            dark
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="bitisTarihiProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="bitisTarihi"
                    mask="YYYY-MM-DD HH:MM"
                    @input="() => $refs.bitisTarihiProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="onayTarihi"
            mask="####-##-## ##:##"
            label="Poliçe Onay Tarihi"
            disable
            dark
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="onayTarihiProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="onayTarihi"
                    mask="YYYY-MM-DD HH:MM"
                    @input="() => $refs.onayTarihiProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="tahsilatDurumu"
            label="Poliçe Tahsilat Durumu"
            disable
            dark
          />
        </div>
        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
          <q-input
            v-model="faaliyetAlani"
            label="Faaliyet Alanı"
            disable
            dark
          />
        </div>
      </div>
      <q-list
        class="bg-card no-border q-pa-none"
      >
        <q-expansion-item
          class="q-pa-none"
          switch-toggle-side
          group="accordion-group-checkbox"
          label="Hasar Evrakları"
          header-class="text-white"
          expand-icon-class="text-white"
        >
          <card-claim-image :isRaporEkrani="false"/>
        </q-expansion-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { toRefs, reactive, defineComponent, defineAsyncComponent } from "vue"
import claimController from "../../controllers/claimController"

export default defineComponent({
  name: "CardInsuredAndPolicyInfo",
  components: {
    CardClaimImage: defineAsyncComponent(() =>
      import("src/components/cards/CardClaimImage.vue")
    ),
  },
  setup() {
    const { claimDetail } = claimController()
    const state = reactive({
      sigortali: claimDetail.value.policeView.sigortali,
      sigortaliCepTelefon: claimDetail.value.policeView.sigortaliCepTelefon,
      policeNo: claimDetail.value.policeView.policeNo,
      tecditNo: claimDetail.value.policeView.tecditNo,
      zeyilNo: claimDetail.value.policeView.zeyilNo,
      baslangicTarihi: claimDetail.value.policeView.baslangicTarihi,
      bitisTarihi: claimDetail.value.policeView.bitisTarihi,
      onayTarihi: claimDetail.value.policeView.onayTarihi,
      tahsilatDurumu: claimDetail.value.hasarView.tahsilatDurumu,
      sigortaEttiren: claimDetail.value.policeView.sigortaEttiren,
      faaliyetAlani: '---',
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

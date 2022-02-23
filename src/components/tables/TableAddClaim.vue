<template>
  <div class="row q-col-gutter-sm q-pa-md">
    <div class="col-12">
      <q-card class="bg-secondary">
        <q-table
          card-class="bg-secondary text-white"
          :hide-header="mode === 'grid'"
          :grid="mode === 'grid'"
          :filter="filterAsset"
          :rows="assetDataSource ? assetDataSource : []"
          :columns="columnsAsset"
          :pagination-label="getPaginationLabel"
          row-key="oid"
          rows-per-page-label="Satır Sayısı"
          no-data-label="Kayıt bulunamadı"
          no-results-label="Eşleşen kayıt bulunamadı"
          title="Kıymetler"
          title-class="text-bold"
          table-class="text-white"
          color="primary"
          table-header-class="text-white"
        >
          <template v-slot:top-right="">
            <q-input
              standout
              dense
              debounce="300"
              v-model="filterAsset"
              placeholder="Hızlı Ara"
            >
              <template v-slot:append>
                <q-icon name="search" color="grey-3" />
              </template>
            </q-input>
          </template>
          <template v-slot:bottom-row="">
            <tr class="q-tr">
              <td class="q-td q-table--col-auto-width">
                <p>
                  Dip Toplam : {{bottomTotal}} TL
                </p>

              </td>
            </tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  size="sm"
                  color="primary"
                  round
                  dense
                  @click="props.expand = !props.expand"
                  :icon="props.expand ? 'remove' : 'add'"
                ></q-btn>
              </q-td>
              <q-td auto-width>
                <q-btn
                  icon="delete"
                  color="red-3"
                  size="sm"
                  class="q-ml-sm"
                  flat
                  dense
                  @click="deleteAsset(props.row)"
                />
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <div class="row q-pa-md q-col-gutter-md">
                <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12">
                  <q-input
                    v-model="props.row.eksikSigorta"
                    label="Eksik Sigorta"
                    label-color="grey-3"
                    color="white"
                    suffix="TL"
                    mask="###.###.###.###,##"
                    :rules="[
                      (val) =>
                        val === '' ||
                        val.length <= 18 ||
                        'Lütfen azami 14 karakter kullanın',
                    ]"
                    reverse-fill-mask
                    dark
                  />
                </div>
                <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12">
                  <q-input
                    v-model="props.row.sovtaj"
                    label="Sovtaj"
                    label-color="grey-3"
                    color="white"
                    suffix="TL"
                    mask="###.###.###.###,##"
                    :rules="[
                      (val) =>
                        val === '' ||
                        val.length <= 18 ||
                        'Lütfen azami 14 karakter kullanın',
                    ]"
                    reverse-fill-mask
                    dark
                  />
                </div>
                <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12">
                  <q-input
                    v-model="props.row.muafiyet"
                    label="Muafiyet"
                    label-color="grey-3"
                    color="white"
                    suffix="TL"
                    mask="###.###.###.###,##"
                    :rules="[
                      (val) =>
                        val === '' ||
                        val.length <= 18 ||
                        'Lütfen azami 14 karakter kullanın',
                    ]"
                    reverse-fill-mask
                    dark
                  />
                </div>
                <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12">
                  <q-input
                    disable
                    v-model="props.row.toplam"
                    label="Toplam"
                    label-color="grey-3"
                    color="white"
                    suffix="TL"
                    mask="###.###.###.###,##"
                    :rules="[
                      (val) =>
                        val === '' ||
                        val.length <= 18 ||
                        'Lütfen azami 14 karakter kullanın',
                    ]"
                    reverse-fill-mask
                    dark
                  />
                </div>
                <div
                  class="col-lg-2 col-md-2 col-sm-12 col-xs-12 flex items-end"
                >
                  <div class="full-width row q-pa-md">
                    <q-btn
                      unelevated
                      size="md"
                      color="primary"
                      class="text-white text-capitalize q-mx-sm"
                      label="Hesapla"
                      @click="calculateTotal(props.row)"
                    />
                    <q-btn
                      :disable="isDisableSaveAsset"
                      unelevated
                      size="md"
                      color="primary"
                      class="text-white text-capitalize q-mx-sm"
                      label="Kaydet"
                      @click="saveAsset(props.row, false, true)"
                    />
                  </div>
                </div>
              </div>
              <q-table
                card-class="bg-secondary text-white"
                :hide-header="mode === 'grid'"
                :grid="mode === 'grid'"
                :filter="filterAssetDetail"
                :rows="
                  props.row.kiymetDetayListesi
                    ? props.row.kiymetDetayListesi
                    : []
                "
                :columns="columns"
                :pagination-label="getPaginationLabel"
                row-key="oid"
                rows-per-page-label="Satır Sayısı"
                no-data-label="Kayıt bulunamadı"
                no-results-label="Eşleşen kayıt bulunamadı"
                title="Kıymet Detaylar"
                title-class="text-bold"
                table-class="text-white"
                color="primary"
                table-header-class="text-white"
              >
                <template v-slot:top-right="">
                  <q-input
                    standout
                    dense
                    debounce="300"
                    v-model="filterAssetDetail"
                    placeholder="Hızlı Ara"
                  >
                    <template v-slot:append>
                      <q-icon name="search" color="grey-3" />
                    </template>
                  </q-input>
                </template>
                <template v-slot:body-cell-action="props">
                  <q-td :props="props">
                    <q-btn
                      icon="edit"
                      color="green-3"
                      size="sm"
                      flat
                      dense
                      @click="editAssetDetail(props.row)"
                    />
                    <q-btn
                      icon="delete"
                      color="red-3"
                      size="sm"
                      class="q-ml-sm"
                      flat
                      dense
                      @click="deleteAssetDetail(props.row, true)"
                    />
                  </q-td>
                </template>
              </q-table>
            </q-tr>
          </template>
        </q-table>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, toRefs, computed } from "vue"
import apiService from "../../services/apiService"
import claimController from "../../controllers/claimController"
import formController from "../../controllers/formController"
import notify from "../../helpers/notification"
import cache from "../../helpers/cache"
import utility from "../../helpers/utility"
import { Format } from "../../helpers/format"
import { types } from "../../helpers/cache"
import { Api } from "../../helpers/api"



export default {
  setup() {
    const columnsAsset = ref([
      {
        name: "",
        label: "",
        field: "",
        align: "left",
        style: "display:none;",
      },
      {
        name: "action",
        label: "",
        field: "action",
        sortable: false,
        align: "center",
        style: "display:none;",
      },
      {
        name: "kiymetTipi",
        label: "Kıymet",
        field: "kiymetTipi",
        format: (val) => {
          const data = stateAddClaim.kiymetTipiDizi.find(
            (item) => item.value === val
          )
          return data ? data.label : ""
        },
        sortable: true,
        align: "left",
      },
    ])
    const columns = ref([
      {
        name: "action",
        label: "",
        field: "action",
        sortable: false,
        align: "center",
        style: "width: 100px",
      },
      {
        name: "hasarKiymetler",
        label: "Hasar Kıymetler",
        field: "hasarKiymetler",
        sortable: true,
        align: "left",
      },
      {
        name: "oidAlacakli",
        label: "Alacakli",
        field: "oidAlacakli",
        sortable: true,
        format: (val) => {
          const data = stateAddClaim.oidAlacakliDizi.find(
            (item) => item.value === val
          )
          return data ? data.label : ""
        },
        align: "left",
      },
      {
        name: "olcuBirim",
        label: "Birim",
        field: "olcuBirim",
        format: (val) => cache().formatter(types.UNIT_OF_MEASURE, val),
        sortable: true,
        align: "left",
      },
      {
        name: "sigortaliTalepMiktari",
        label: "Sigortalı Talep Miktarı",
        field: "sigortaliTalepMiktari",
        align: "right",
      },
      {
        name: "eksperTespitMiktari",
        label: "Eksper Tespit Miktarı",
        field: "eksperTespitMiktari",
        align: "right",
      },
      {
        name: "sigortaliTalepBirim",
        label: "Sigortalı Talep Birim",
        field: "sigortaliTalepBirim",
        align: "right",
      },
      {
        name: "eksperTespitBirim",
        label: "Eksper Tespit Birim",
        field: "eksperTespitBirim",
        align: "right",
      },
      {
        name: "iskonto",
        label: "İskonto",
        field: "iskonto",
        format: (val) => (val ? `% ${val}` : "% 0"),
        align: "right",
      },
      {
        name: "eskiYeniFarkTenzili",
        label: "Eski Yeni Fark Tenzili",
        field: "eskiYeniFarkTenzili",
        format: (val) => (val ? `% ${val}` : "% 0"),
        align: "right",
      },
      {
        name: "teknolojiKiymetKazanmaTenzili",
        label: "Teknoloji Kıymet Kazanma Tenzili",
        field: "teknolojiKiymetKazanmaTenzili",
        format: (val) => (val ? `% ${val}` : "% 0"),
        align: "right",
      },
      {
        name: "teklifAlinanYer",
        label: "Teklif Alınan Yer",
        field: "teklifAlinanYer",
        align: "left",
      },
      {
        name: "teminatDisiHasar",
        label: "Teminat Dışı Hasar",
        field: "teminatDisiHasar",
        align: "left",
      },
    ])

    const { dataList, displayError, displayMessages, fetch } = apiService()
    const { selectedClaim } = claimController()
    const {
      isDisableSaveAsset,
      assetDataSource,
      assetDetailDataSource,
      resetFormAddClaim,
      stateAddClaim,
      bottomTotal,
      saveAsset,
      fetchAssetData,
      assetCalculateTotal
    } = formController()
    const { storage } = cache()
    let filterAsset = ref("")
    let filterAssetDetail = ref("")
    let mode = ref("list")

    const getPaginationLabel = (
      firstRowIndex,
      endRowIndex,
      totalRowsNumber
    ) => {
      return firstRowIndex + " - " + endRowIndex + " / " + totalRowsNumber
    }

    const editAssetDetail = async (row) => {
      resetFormAddClaim(row)
    }

    const deleteAssetDetail = async (row, once) => {
      try {
        const bodyData = {
          className: Api.Packages.CLAIM_ASSET_DETAIL,
          oid: row.oid,
        }
        await fetch(Api.Common.GENERIC_DELETE_URL, bodyData)
        if (once) resetFormAddClaim()
        if (once) await fetchAssetData()
        utility().sleep(100)
        const asset = assetDataSource.value
          .find(item => item.oid == row.oidHsrDosyaOtoDisiDisEksperKiymet)
        await saveAsset(asset, false, false)
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        notify().error(e.message)
      }
    }

    const deleteAsset = async (row) => {
      try {
        const bodyData = {
          className: Api.Packages.CLAIM_ASSET,
          oid: row.oid,
        }
        for (const assetDetail of row.kiymetDetayListesi) {
          await deleteAssetDetail(assetDetail, false)
        }
        utility().sleep(100)
        await fetch(Api.Common.GENERIC_DELETE_URL, bodyData)
        utility().sleep(100)
        await fetchAssetData()
        resetFormAddClaim()
        notify().success(`Kayıt başarılı bir şekilde silindi`)
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        notify().error(e.message)
      }
    }

    const calculateTotal = (row) => {
      if (!assetDataSource.value) row.toplam = 0
      const asset = assetDataSource.value.find((item) => (item.oid = row.oid))
      if (asset) {
        if (
          Format.Money.toNumber(row.eksikSigorta) >
            Format.Money.toNumber(row.toplam) ||
          Format.Money.toNumber(row.sovtay) >
            Format.Money.toNumber(row.toplam) ||
          Format.Money.toNumber(row.muafiyet) >
            Format.Money.toNumber(row.toplam)
        ) {
          notify().warn(`Hesaplanacak değerler toplamdan fazla olamaz`)
          return
        }
        row.toplam = assetCalculateTotal(asset)
        isDisableSaveAsset.value = false
      } else {
        row.toplam = 0
      }
    }



    onMounted(() => {
      fetchAssetData()
    })

    return {
      getPaginationLabel,
      columns,
      columnsAsset,
      dataList,
      selectedClaim,
      assetDataSource,
      assetDetailDataSource,
      bottomTotal,
      storage,
      ...toRefs(stateAddClaim),
      displayError,
      displayMessages,
      filterAsset,
      filterAssetDetail,
      mode,
      isDisableSaveAsset,
      fetchAssetData,
      saveAsset,
      deleteAsset,
      editAssetDetail,
      deleteAssetDetail,
      resetFormAddClaim,
      calculateTotal,
      assetCalculateTotal,
      fetch,
    }
  },
}
</script>

<style lang="scss" scoped>
.q-table__bottom-item {
  color: white;
}
:deep(.q-table__control .q-field__control-container .q-field__native) {
  color: white;
}
:deep(.q-select__dropdown-icon) {
  color: white;
}
</style>

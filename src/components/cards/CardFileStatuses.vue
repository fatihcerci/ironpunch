<template>
  <q-card class="bg-secondary no-shadow no-border">
    <q-card-section class="q-pa-none">
      <apexchart
        type="pie"
        height="230"
        :options="chartOptions"
        :series="seriesData"
        @dataPointSelection="fileStatusesPieChartClicked"
      ></apexchart>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, reactive, ref, watch} from "vue"
import apiService from "../../services/apiService"
import chartController from "../../controllers/chartController"
import { FileStatuses } from "../../helpers/statuses"
import { Fonts } from "../../helpers/fonts"

export default defineComponent({
  name: "FileStatusesPieChart",
  setup() {
    const { claimList, claimDataSource } = apiService()
    const { isRefreshedFileStatusesChart } = chartController()
    //const expertData = inject("expertData")
    const seriesData = ref([0,0,0,0,0])
    const chartOptions = reactive({
      colors : ['#00F5D4', '#00BBF9', '#FEE440', '#F15BB5', '#9B5DE5', '#E67557', '#D01B59'],
      chart: {
        type: "pie",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: Fonts.BALOO_CHETTAN_2,
        },
      },
      /*theme: {
        palette: "palette6", // upto palette10
      },*/
      stroke: {
        show: false,
        width: 0,
      },
      title: {
        text: "Dosya Durumları",
        align: "left",
        style: {
          color: "#FFF",
          fontSize: "20px",
          fontWeight: "bold",
          fontFamily: Fonts.BALOO_CHETTAN_2,
        },
      },
      labels: FileStatuses.map(item => item.name),
      legend: {
        labels: {
          colors: "#FFF",
        },
        fontFamily: Fonts.BALOO_CHETTAN_2,
      },
    })

    watch(claimList, () => {
      if (claimList.value && !isRefreshedFileStatusesChart.value) {
        const randevuBekleyen =
          claimList.value.otoDisiDisEksperDosyaDurumSonucView
            .randevuBekleyenDosyalarinSayisi
        const ekspertizBekleyen =
          claimList.value.otoDisiDisEksperDosyaDurumSonucView
            .ekspertizBekleyenDosyalarinSayisi
        const raporYazimiBekleyen =
          claimList.value.otoDisiDisEksperDosyaDurumSonucView
            .raporYazimiBekleyenDosyalarinSayisi
        const eksiklikBekleyen =
          claimList.value.otoDisiDisEksperDosyaDurumSonucView
            .eksiklikBekleyenDosyalarinSayisi
        const bilgiBekleyen =
          claimList.value.otoDisiDisEksperDosyaDurumSonucView
            .bilgiBekleyenDosyalarinSayisi
        const belgeBekleyen =
          claimList.value.otoDisiDisEksperDosyaDurumSonucView
            .belgeBekleyenDosyalarinSayisi
        seriesData.value = [randevuBekleyen, ekspertizBekleyen,
          raporYazimiBekleyen, eksiklikBekleyen, bilgiBekleyen, belgeBekleyen]
      } else {
        seriesData.value = [0,0,0,0,0,0]
      }
    })

    const fileStatusesPieChartClicked = (event, chartContext, config) => {
      //find yerine, filter da kullanilabilir
      //value undefined hicbir sekilde alinmayacagi icin herhangi bir kontrol sarti eklenmedi
      const value = FileStatuses.find(item => item.index == config.dataPointIndex).value
      claimDataSource.value = claimList.value
        .otoDisiDisEksperViewList.filter(item => item.eksperDosyaDurumKodu === value)
    }

    return {
      seriesData,
      chartOptions,
      claimList,
      claimDataSource,
      fileStatusesPieChartClicked,
    }
  },
})
</script>

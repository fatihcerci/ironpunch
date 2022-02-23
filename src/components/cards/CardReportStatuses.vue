<template>
  <q-card class="bg-secondary no-shadow no-border">
    <q-card-section class="q-pa-none">
      <apexchart
        type="pie"
        height="230"
        :options="chartOptions"
        :series="seriesData"
        @dataPointSelection="reportStatusesPieChartClicked"
      ></apexchart>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, reactive, ref, watch} from "vue"
import apiService from "../../services/apiService"
import chartController from "../../controllers/chartController"
import { ReportStatuses } from "../../helpers/statuses"
import { Fonts } from "../../helpers/fonts"

export default defineComponent({
  name: "ReportStatusesPieChart",

  setup() {
    const { claimDataSource, claimList } = apiService()
    const { isRefreshedReportStatusesChart } = chartController()
    const seriesData = ref([0,0,0])
    const chartOptions = reactive(
      {
        colors : ['#FFA401', '#6336C7', '#197477'],
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

        stroke: {
          show: false,
          width: 0,
        },
        title: {
          text: "Rapor Durumları",
          align: "left",
          style: {
            color: "#FFF",
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: Fonts.BALOO_CHETTAN_2,
          },
        },
        labels: ReportStatuses.map(item => item.name),
        legend: {
          labels: {
            colors: "#FFF",
          },
          fontFamily: Fonts.BALOO_CHETTAN_2,
        },
      }
    )

    watch(claimList, () => {
      if (claimList.value && !isRefreshedReportStatusesChart.value) {
        const onRaporGonderilmemis = claimList.value.
          otoDisiDisEksperRaporDurumSonucView.onRaporGonderilmemisDosyalarinSayisi
        const kesinRaporGonderilmemis = claimList.value.
          otoDisiDisEksperRaporDurumSonucView.kesinRaporGonderilmemisDosyalarinSayisi
        const yenidenAcilmis = claimList.value.
          otoDisiDisEksperRaporDurumSonucView.yenidenAcilmisDosyalarinSayisi
        seriesData.value = [onRaporGonderilmemis, kesinRaporGonderilmemis, yenidenAcilmis]
      } else {
        seriesData.value = [0,0,0]
      }
    })

    const reportStatusesPieChartClicked = (event, chartContext, config) => {
      //find yerine, filter da kullanilabilir
      //value undefined hicbir sekilde alinmayacagi icin herhangi bir kontrol sarti eklenmedi

      const value = ReportStatuses.find(item => item.index == config.dataPointIndex).value
      claimDataSource.value = claimList.value
        .otoDisiDisEksperViewList.filter(item => item.ekspertizRaporDurumKodu === value)
    }

    return {
      chartOptions,
      seriesData,
      claimList,
      claimDataSource,
      reportStatusesPieChartClicked
    }
  },
})
</script>

import { store } from "boot/store"
import { ref } from "vue"
import utility from "../helpers/utility"

const storage = ref()

export const types = {
  ASSET_TYPE: "KIYMET_TIPI",
  UNIT_OF_MEASURE: "OLCU_BIRIM",
  FILES: "EVRAKLAR",
  REASON_FOR_CLOSING_REPORT: "RAPOR_KAPATMA_NEDENI",
  COMPLEX_TYPE: "OTO_DISI_KOMPLEKS_TUR",
}

export const CacheTypes = {
  status: [
    { rf: types.ASSET_TYPE },
    { rf: types.UNIT_OF_MEASURE },
    { rf: types.FILES },
    { rf: types.REASON_FOR_CLOSING_REPORT },
    { rf: types.COMPLEX_TYPE },
  ],
}

const cache = () => {
  const formatter = (parameterName, value) => {
    if (storage.value) {
      const data = storage.value.find(
        (item) => item.refDataInfo.name === parameterName
      )
      if (data) {
        const result = data.values.find((item) => item.value === value)
        return result ? result.text : ""
      } else {
        return ""
      }
    } else {
      return value
    }
  }

  /**
   * Gets combo cache data by parameter name.
   * @param {string} parameterName immutable constant type
   * @return {Array}
   *
   */
  const getComboCacheData = async (parameterName) => {
    const data = await getCacheParameter(parameterName)
    if (data) {
      const result = data.values.map((item) => {
        return {
          value: item.value,
          label: utility().capitalize(item.text, true),
        }
      })
      return result
    } else {
      return []
    }
  }

  /**
   * Gets cache data by parameter name.
   * @param {string} parameterName immutable constant type
   * @return {Array}
   *
   */
  const getCacheParameter = async (parameterName) => {
    const parameters = await store.getItem("parameters")
    storage.value = [...parameters]
    const result = parameters
      ? parameters.find((item) => item.refDataInfo.name === parameterName)
      : []
    return result
  }

  const setCacheParameter = async () => {
    const parameters = await store.getItem("parameters")
    storage.value = [...parameters]
  }

  return {
    formatter,
    getComboCacheData,
    getCacheParameter,
    setCacheParameter,
    storage,
  }
}
export default cache

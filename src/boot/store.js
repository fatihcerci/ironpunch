import { boot } from "quasar/wrappers"
import localforage from "localforage"

const store = localforage.createInstance({
  name: "smp",
  storeName: "smp-local-db",
})

export default boot(({ app }) => {
  app.config.globalProperties.$store = store
})

export { store }

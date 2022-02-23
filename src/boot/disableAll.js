import { boot } from "quasar/wrappers"

export default boot(async ({ app }) => {
  const disableAll = (el, binding, vnode) => {
    if (!el) return
    const tags = ["q-select", "q-btn", "q-uploader", "q-input"]
    tags.forEach((tagName) => {
      if (HTMLCollection.prototype.isPrototypeOf(el)) {
        for (let i = 0; i < el.length; i++) {
          disableAll(el[i], binding, vnode)
        }
      } else {
        const nodes = el.getElementsByClassName(tagName)
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].disabled = true
          if (binding.value) {
            if (tagName === "q-uploader") {
              nodes[i].classList.add("disabled")
              nodes[i].classList.add("q-uploader--disable")
            } else {
              nodes[i].classList.add("q-field--disabled")
            }
          } else {
            if (tagName === "q-uploader") {
              nodes[i].classList.remove("q-uploader--disable")
              nodes[i].classList.remove("disabled")
            } else {
              nodes[i].classList.remove("q-field--disabled")
            }
          }
          nodes[i].tabIndex = -1
          if (nodes[i].children.length > 0) {
            disableAll(nodes[i].children, binding, null)
          }
        }
      }
    })
  }

  app.directive("disable-all", {
    beforeMount(el, binding, vnode) {
      disableAll(el, binding, vnode)
    },
  })
})

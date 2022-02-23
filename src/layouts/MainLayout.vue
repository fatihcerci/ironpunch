<template>
  <q-layout view="lHh Lpr lFf" class="bg-sompo-dark">

    <q-page-container>
      <router-view />
    </q-page-container>

    <!--
    <q-footer>
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title class="row justify-center items-center">
          <div class="font-11">LENORA Bilişim Teknolojileri © 2022 Tüm Hakları Saklıdır</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
    -->

  </q-layout>
</template>

<script>
import { onMounted, reactive } from "vue"

export default {
  name: "MainLayout",
  components: {
  },
  setup() {
    onMounted(async () => {

    })
    return {

    }
  },
}
</script>

<style lang="css">
.search-input {
  width: 50%;
}
.search-menu {
  max-width: 100% !important;
  margin: 0px 16px 16px 16px !important;
}
.display-none{
  display: none;
}

</style>

<template>
  <q-card class="bg-transparent no-shadow no-border q-pb-md">
    <q-card-section class="q-pa-none">
      <div class="row flex-center">
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12">
          <profile-1 />
        </div>
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12">
          <profile-1 />
        </div>
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12">
          <profile-1 />
        </div>
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12">
          <profile-1 />
        </div>
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12">
          <profile-1 />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineAsyncComponent } from "vue"

export default {
  name: "Profiles",
  components: {
    Profile1: defineAsyncComponent(() =>
      import("src/components/cards/Profile1.vue")
    )
  },
}
</script>

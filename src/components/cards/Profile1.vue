<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="bg-secondary text-white" flat>
      <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg"
      />

      <q-card-section>
        <div class="text-h5 text-center text-primary">
          ch3rcy
        </div>
        
        <div class="text-h6 q-mt-sm q-mb-xs">Fatih Çerçi</div>
        <div class="text-h7 q-mb-xs">26 years old</div>
        <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="q-gutter-x-sm text-center">

            <q-avatar rounded class="cursor-pointer" size="24px">
              <img src="~/assets/social-media-icons/facebook.png" />
            </q-avatar>

            <q-avatar rounded class="cursor-pointer" size="24px">
              <img src="~/assets/social-media-icons/instagram.png" />
            </q-avatar>

            <q-avatar rounded class="cursor-pointer" size="24px">
              <img src="~/assets/social-media-icons/youtube.png" />
            </q-avatar>

            <q-avatar rounded class="cursor-pointer" size="24px">
              <img src="~/assets/social-media-icons/twitch.png" />
            </q-avatar>

            <q-avatar rounded class="cursor-pointer" size="24px">
              <img src="~/assets/social-media-icons/discord.png" />
            </q-avatar>

        </div>
      </q-card-section>

    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "Profile1",

  setup() {
    return {
    }
  },
})
</script>

<template>
  <q-card class="bg-transparent no-shadow no-border q-pb-md">
    <q-card-section class="q-pa-none">
      <div class="row flex-center">
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 cursor-pointer profile1">
          <profile-1 />
        </div>
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 cursor-pointer profile2">
          <profile-1 />
        </div>
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 cursor-pointer profile3">
          <profile-1 />
        </div>
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 cursor-pointer profile4">
          <profile-1 />
        </div>
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12 cursor-pointer profile5">
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

<style>
  .profile1{
    -webkit-animation:bounce-in 2.5s ease 0s 1 normal;
    -moz-animation:bounce-in 2.5s ease 0s 1 normal;
    -ms-animation:bounce-in 2.5s ease 0s 1 normal;
    animation:bounce-in 2.5s ease 0s 1 normal;
    transition: transform 1s;
  }

  .profile1:hover{
    transform: scale(1.02);
    transition: transform 0.5s;
  }

  .profile2{
    -webkit-animation:bounce-in 2s ease 0s 1 normal;
    -moz-animation:bounce-in 2s ease 0s 1 normal;
    -ms-animation:bounce-in 2s ease 0s 1 normal;
    animation:bounce-in 2s ease 0s 1 normal;
    transition: transform 1s;
  }

  .profile2:hover{
    transform: scale(1.02);
    transition: transform 0.5s;
  }

  .profile3{
    -webkit-animation:bounce-in 1.7s ease 0s 1 normal;
    -moz-animation:bounce-in 1.7s ease 0s 1 normal;
    -ms-animation:bounce-in 1.7s ease 0s 1 normal;
    animation:bounce-in 1.7s ease 0s 1 normal;
    transition: transform 1s;
  }

  .profile3:hover{
    transform: scale(1.02);
    transition: transform 0.5s;
  }

  .profile4{
    -webkit-animation:bounce-in 2s ease 0s 1 normal;
    -moz-animation:bounce-in 2s ease 0s 1 normal;
    -ms-animation:bounce-in 2s ease 0s 1 normal;
    animation:bounce-in 2s ease 0s 1 normal;
    transition: transform 1s;
  }

  .profile4:hover{
    transform: scale(1.02);
    transition: transform 0.5s;
  }

  .profile5{
    -webkit-animation:bounce-in 2.5s ease 0s 1 normal;
    -moz-animation:bounce-in 2.5s ease 0s 1 normal;
    -ms-animation:bounce-in 2.5s ease 0s 1 normal;
    animation:bounce-in 2.5s ease 0s 1 normal;
    transition: transform 1s;
  }

  .profile5:hover{
    transform: scale(1.02);
    transition: transform 0.5s;
  }

  @-webkit-keyframes bounce-in {
    0%{ opacity: 0; margin-top:25%; -webkit-transform: scale(1.0); transform: scale(1.0); }
    50%{ opacity: 1; -webkit-transform: scale(1.0); transform: scale(1.0); }
    70%{ -webkit-transform: scale(1); transform: scale(1); }
    100%{ -webkit-transform: scale(1); transform: scale(1); }
  }

  @keyframes bounce-in {
    0%{ opacity: 0; margin-top:25%; transform: scale(1.0); }
    50%{ opacity: 1; transform: scale(1.0); }
    70%{ transform: scale(1); }
    100%{ transform: scale(1); }
  }
  
</style>

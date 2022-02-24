<template>

  <q-layout view="lHh Lpr lFf" class="bg-sompo-dark">

    <!-- https://wweb.dev/resources/animated-css-background-generator/ -->
    <div class="background">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
        <q-toolbar class="bg-grey-9 text-white" style="min-height:40px;">
        <q-toolbar-title class="row justify-center items-center">
            <div class="font-12">IRONPUNCH © 2022 All rights reserved</div>
        </q-toolbar-title>
        </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { onMounted, reactive } from "vue"
import { useQuasar } from 'quasar'

export default {
  name: "MainLayout",
  components: {
  },
  setup() {
    const $q = useQuasar()

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

@keyframes move {
    100% {
        transform: translate3d(0, 0, 1px) rotate(360deg);
    }
}

.background {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #1f1f1f;
    overflow: hidden;
}

.background span {
    width: 1vmin;
    height: 1vmin;
    border-radius: 1vmin;
    backface-visibility: hidden;
    position: absolute;
    animation: move;
    animation-duration: 10;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}


.background span:nth-child(0) {
    color: #f5c747;
    top: 82%;
    left: 23%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 12vw 18vh;
    box-shadow: -2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(1) {
    color: #f5c747;
    top: 56%;
    left: 93%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 21vw 10vh;
    box-shadow: -2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(2) {
    color: #f5c747;
    top: 40%;
    left: 91%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 21vw 23vh;
    box-shadow: -2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(3) {
    color: #f5c747;
    top: 35%;
    left: 100%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -4vw -21vh;
    box-shadow: 2vmin 0 1.1570280270974649vmin currentColor;
}
.background span:nth-child(4) {
    color: #f5c747;
    top: 90%;
    left: 31%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 10vw -22vh;
    box-shadow: -2vmin 0 1.2236166430651858vmin currentColor;
}
.background span:nth-child(5) {
    color: #f5c747;
    top: 32%;
    left: 61%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 16vw -22vh;
    box-shadow: -2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(6) {
    color: #f5c747;
    top: 9%;
    left: 15%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -6vw -12vh;
    box-shadow: -2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(7) {
    color: #f5c747;
    top: 49%;
    left: 75%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -23vw 10vh;
    box-shadow: 2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(8) {
    color: #f5c747;
    top: 39%;
    left: 71%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 5vw 22vh;
    box-shadow: -2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(9) {
    color: #f5c747;
    top: 39%;
    left: 78%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -10vw -18vh;
    box-shadow: -2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(10) {
    color: #f5c747;
    top: 100%;
    left: 88%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -22vw 2vh;
    box-shadow: -2vmin 0 1.1745040921724856vmin currentColor;
}
.background span:nth-child(11) {
    color: #f5c747;
    top: 80%;
    left: 23%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 2vw -16vh;
    box-shadow: 2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(12) {
    color: #f5c747;
    top: 86%;
    left: 92%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 1vw -4vh;
    box-shadow: 2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(13) {
    color: #f5c747;
    top: 40%;
    left: 1%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -24vw 7vh;
    box-shadow: 2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(14) {
    color: #f5c747;
    top: 27%;
    left: 23%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -19vw 6vh;
    box-shadow: 2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(15) {
    color: #f5c747;
    top: 1%;
    left: 7%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -9vw -20vh;
    box-shadow: 2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(16) {
    color: #f5c747;
    top: 64%;
    left: 3%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 4vw 7vh;
    box-shadow: -2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(17) {
    color: #f5c747;
    top: 64%;
    left: 3%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 4vw 7vh;
    box-shadow: -2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(18) {
    color: #f5c747;
    top: 79%;
    left: 11%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 24vw 15vh;
    box-shadow: 2vmin 0 1.2188321717048238vmin currentColor;
}
.background span:nth-child(19) {
    color: #f5c747;
    top: 55%;
    left: 97%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -18vw -7vh;
    box-shadow: 2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(20) {
    color: #f5c747;
    top: 65%;
    left: 100%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 18vw 17vh;
    box-shadow: 2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(21) {
    color: #f5c747;
    top: 78%;
    left: 26%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -4vw 16vh;
    box-shadow: -2vmin 0 1.2181964296556125vmin currentColor;
}
.background span:nth-child(22) {
    color: #f5c747;
    top: 34%;
    left: 43%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -15vw 19vh;
    box-shadow: 2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(23) {
    color: #f5c747;
    top: 30%;
    left: 38%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 4vw -12vh;
    box-shadow: -2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(24) {
    color: #f5c747;
    top: 80%;
    left: 32%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 9vw 11vh;
    box-shadow: 2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(25) {
    color: #f5c747;
    top: 30%;
    left: 54%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -1vw 14vh;
    box-shadow: 2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(26) {
    color: #f5c747;
    top: 36%;
    left: 76%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 1vw 8vh;
    box-shadow: -2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(27) {
    color: #f5c747;
    top: 49%;
    left: 42%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 12vw -12vh;
    box-shadow: 2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(28) {
    color: #f5c747;
    top: 78%;
    left: 13%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 9vw 11vh;
    box-shadow: 2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(29) {
    color: #f5c747;
    top: 25%;
    left: 25%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 25vw 23vh;
    box-shadow: -2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(30) {
    color: #f5c747;
    top: 77%;
    left: 37%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 18vw 17vh;
    box-shadow: -2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(31) {
    color: #f5c747;
    top: 49%;
    left: 70%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 8vw -13vh;
    box-shadow: 2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(32) {
    color: #f5c747;
    top: 79%;
    left: 81%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 2vw -21vh;
    box-shadow: -2vmin 0 1.0422577094334669vmin currentColor;
}
.background span:nth-child(33) {
    color: #f5c747;
    top: 59%;
    left: 95%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 1vw -3vh;
    box-shadow: -2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(34) {
    color: #f5c747;
    top: 11%;
    left: 90%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -21vw -4vh;
    box-shadow: -2vmin 0 1.0748719743319461vmin currentColor;
}
.background span:nth-child(35) {
    color: #f5c747;
    top: 25%;
    left: 49%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -7vw 8vh;
    box-shadow: -2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(36) {
    color: #f5c747;
    top: 93%;
    left: 75%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -7vw -19vh;
    box-shadow: -2vmin 0 1.0834602820656205vmin currentColor;
}
.background span:nth-child(37) {
    color: #f5c747;
    top: 21%;
    left: 73%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -15vw -1vh;
    box-shadow: -2vmin 0 1.189582107595393vmin  currentColor;
}
.background span:nth-child(38) {
    color: #f5c747;
    top: 58%;
    left: 55%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 12vw -1vh;
    box-shadow: -2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(39) {
    color: #f5c747;
    top: 21%;
    left: 71%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 18vw -13vh;
    box-shadow: 2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(40) {
    color: #f5c747;
    top: 78%;
    left: 6%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -22vw -18vh;
    box-shadow: 2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(41) {
    color: #f5c747;
    top: 24%;
    left: 52%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 5vw 13vh;
    box-shadow: -2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(42) {
    color: #f5c747;
    top: 39%;
    left: 81%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 14vw -18vh;
    box-shadow: 2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(43) {
    color: #f5c747;
    top: 78%;
    left: 31%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -7vw -5vh;
    box-shadow: -2vmin 0 1.0220556227193254vmin currentColor;
}
.background span:nth-child(44) {
    color: #f5c747;
    top: 78%;
    left: 69%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -6vw 5vh;
    box-shadow: -2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(45) {
    color: #f5c747;
    top: 40%;
    left: 92%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -17vw -4vh;
    box-shadow: -2vmin 0 1.032729451767388vmin currentColor;
}
.background span:nth-child(46) {
    color: #f5c747;
    top: 41%;
    left: 95%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -9vw -14vh;
    box-shadow: 2vmin 0 1.189582107595393vmin currentColor;
}
.background span:nth-child(47) {
    color: #f5c747;
    top: 3%;
    left: 88%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: 24vw -21vh;
    box-shadow: 2vmin 0 1.1233196441605904vmin currentColor;
}
.background span:nth-child(48) {
    color: #f5c747;
    top: 83%;
    left: 72%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -1vw -3vh;
    box-shadow: -2vmin 0 0.8747449626811994vmin currentColor;
}
.background span:nth-child(49) {
    color: #f5c747;
    top: 18%;
    left: 12%;
    animation-duration: 25s;
    animation-delay: -1s;
    transform-origin: -17vw -21vh;
    box-shadow: 2vmin 0 1.189582107595393vmin currentColor;
}




</style>

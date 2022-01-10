<template>
  <div class="scan-container">
    <h5 class="text-weight-bold q-ma-none text-center text-primary">
      One Click - two selfies
    </h5>
    <div class="scan-box q-col-gutter-lg q-pt-lg row items-end">
      <div class="scan-box-main col-6">
        <canvas
          id="myCanvas"
          width="320"
          height="400"
          style="border: 1px solid #000000"
        ></canvas>
      </div>
      <div class="scan-box-side col-3">
        <p class="text-center text-weight-bold">Selfie 1</p>
        <img class="shadow-1" src="../assets/avatar-placeholder.svg" />
      </div>
      <div class="scan-box-side col-3">
        <p class="text-center text-weight-bold">Selfie 2</p>
        <img class="shadow-1" src="../assets/avatar-placeholder.svg" />
      </div>
    </div>
    <div class="q-pa-md q-mt-md text-center">
      <q-btn
        icon="photo_camera"
        color="primary"
        outline
        round
        unelevated
      ></q-btn>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.scan-container {
  max-width: 700px;
  width: 100%;
  margin: auto;
  box-shadow: 0 0 5px 0px #80808042;
  margin-top: 45px;
  padding: 15px;
  border-radius: 7px;
  .scan-box {
    &-main {
    }
  }
}
</style>

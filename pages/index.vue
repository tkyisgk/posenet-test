<template>
  <div class="container">
    <Tensorflow />
  </div>
</template>

<script>
import Tensorflow from '~/components/Tensorflow.vue'

export default {
  components: {
    Tensorflow
  }
}
</script>

<style>
.container {
  position: relative;
  width: 100%;
}
</style>

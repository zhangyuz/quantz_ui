<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <QuantZ/>
  </div>
</template>

<script>
// @ is an alias to /src
import QuantZ from '@/components/QuantZ.vue'

export default {
  name: 'Home',
  components: {
    QuantZ
  }
}
</script>

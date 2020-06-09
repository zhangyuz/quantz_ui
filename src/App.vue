<template>
  <v-app>

    <v-content>
      <QuantZ/>
    </v-content>
  </v-app>
</template>

<script>
import QuantZ from './components/QuantZ'

export default {
  name: 'App',

  components: {
    QuantZ
  },

  data: () => ({
    //
  })
}
</script>

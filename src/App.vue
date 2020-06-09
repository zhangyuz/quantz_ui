<template>
  <v-app>

    <v-content>
      <QuantZ/>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import QuantZ from './components/QuantZ'

export default {
  name: 'App',

  components: {
    QuantZ,
    HelloWorld
  },

  data: () => ({
    //
  })
}
</script>

<template>
  <v-container>
    <highcharts :constructor-type="'stockChart'" :options="stockOptions"></highcharts>
    <span>Hello {{msg}}</span>
  </v-container>
</template>

<script>

import axios from 'axios'
import { fromJSON } from 'data-forge'

function df2ChartOpt (df, title, name) {
  return {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: title
    },
    series: [
      {
        name: name,
        data: df.getSeries('close').toArray(),
        pointStart: Date.UTC(2018, 1, 1),
        pointInterval: 1000 * 3600 * 24,
        tooltip: {
          valueDecimals: 2
        }
      }
    ]
  }
}

export default {
  name: 'QuantZ',
  data: function () {
    return {
      msg: 'YUZ',
      stockOptions: {}
    }
  },
  created: function () {
    console.log('quantz created')
  },
  updated: function () {
    console.log('quantz updated')
  },
  mounted: function () {
    console.log('quantz mounted')
    this.fetchIndexDaily()
  },
  methods: {
    fetchIndexDaily: function () {
      axios.get('/quantz/', { baseURL: 'http://127.0.0.1:5000/' }).then(response => {
        // console.log(JSON.stringify(response.data))
        var indexDF = fromJSON(JSON.stringify(response.data))
        this.stockOptions = df2ChartOpt(indexDF, '000001.SH', '上证指数')
        console.log(indexDF.head(10).toJSON())
        console.log(indexDF.getSeries('close').toArray())
      })
    }
  }
}
</script>

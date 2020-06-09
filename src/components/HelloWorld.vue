<template>
  <v-container>
    <highcharts :constructor-type="'stockChart'" :options="stockOptions"></highcharts>
    <highcharts :constructor-type="'stockChart'" :options="IndexOptions"></highcharts>
    <div>{{ indexDaily }}</div>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import axios from 'axios'

var axiosIns = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  timeout: 5000
})

export default {
  name: 'HelloWorld',

  apollo: {
    indexDaily: gql`
      query {
        indexDaily(tsCode: "000001.SH", tradeDate: "20200211") {
          edges {
            node {
              close
              tradeDate
            }
          }
          pageInfo {
            startCursor
            endCursor
          }
        }
      }
    `
  },

  methods: {
    query_data: function () {
      axiosIns.get('/quantz/').then(resp => {
        console.log(resp.data)
      })
    }
  },

  data: () => ({
    stockOptions: {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'AAPL Stock Price'
      },
      series: [
        {
          name: 'AAPL',
          data: [
            10,
            20,
            10,
            23,
            65,
            121,
            60,
            44,
            66,
            98,
            30,
            32,
            56,
            25,
            12,
            36,
            53
          ],
          pointStart: Date.UTC(2018, 1, 1),
          pointInterval: 1000 * 3600 * 24,
          tooltip: {
            valueDecimals: 2
          }
        }
      ]
    },
    IndexOptions: {
      rangeSelector: { selected: 1 },
      title: { text: '000001.SH' },
      series: [
        {
          name: '000001.SH',
          data: [1, 2, 3, 4, 5, 6]
        }
      ]
    }
  }),

  created: () => {
    console.log('created called')
    console.log(this)
  },

  updated: () => {
    console.log('updated called')
  },

  mounted: () => {
    console.log('mounted called')
    this.methods.query_data()
  },

  destroyed: () => {
    console.log('mounted called')
  }
}
</script>

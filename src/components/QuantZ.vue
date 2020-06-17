<template>
  <v-container>
    <highcharts :constructor-type="'stockChart'" :options="stockOptions"></highcharts>
  </v-container>
</template>

<script>

import axios from 'axios'
// import { fromJSON } from 'data-forge'

function yyyymmdd2Date (dateStr) {
  // 将日期转换为Date对象
  var yyyy = dateStr.substr(0, 4)
  var mm = dateStr.substr(4, 2)
  var dd = dateStr.substr(6, 2)
  var date = new Date(yyyy, mm, dd)
  console.log(date)
  return date.getTime()
}

function json2Candlestick (indexArray) {
  var ohlc = []
  var volume = []
  var length = indexArray.length
  var i = length - 1
  for (i; i >= 0; i--) {
    // 数据库返回的数据是按照时间逆序排列的，不符合 Highcharts 对数据的要求
    // 这里将数据改为正序，符合Hightcharts对数据按照时间正序排列的要求
    var tradeDate = yyyymmdd2Date(indexArray[i].trade_date)
    yyyymmdd2Date(indexArray[i].trade_date)
    ohlc.push([tradeDate, indexArray[i].open, indexArray[i].high, indexArray[i].low, indexArray[i].close])
    volume.push([tradeDate, indexArray[i].vol])
  }
  return {
    yAxis: [{
      labels: {
        align: 'left'
      },
      height: '80%',
      resize: {
        enabled: true
      }
    }, {
      labels: {
        align: 'left'
      },
      top: '80%',
      height: '20%',
      offset: 0
    }],
    tooltip: {
      shape: 'square',
      headerShape: 'callout',
      borderWidth: 0,
      shadow: false,
      positioner: function (width, height, point) {
        var chart = this.chart
        var position
        if (point.isHeader) {
          position = {
            x: Math.max(
              // Left side limit
              chart.plotLeft,
              Math.min(
                point.plotX + chart.plotLeft - width / 2,
                // Right side limit
                chart.chartWidth - width - chart.marginRight
              )
            ),
            y: point.plotY
          }
        } else {
          position = {
            x: point.series.chart.plotLeft,
            y: point.series.yAxis.top - chart.plotTop
          }
        }
        return position
      }
    },
    series: [{
      type: 'candlestick',
      // type: 'ohlc',
      id: 'aapl-ohlc',
      name: 'AAPL Stock Price',
      data: ohlc
    }, {
      type: 'column',
      id: 'aapl-volume',
      name: 'AAPL Volume',
      data: volume,
      yAxis: 1
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 800
        },
        chartOptions: {
          rangeSelector: {
            inputEnabled: false
          }
        }
      }]
    },
    stockTools: {
      gui: {
        enabled: true
      }
    }
  }
}

export default {
  name: 'QuantZ',
  data: function () {
    return {
      stockOptions: {}
    }
  },
  created: function () {
    console.log('quantz created')
  },
  update: function () {
    console.log('quantz updated')
  },
  mounted: function () {
    console.log('quantz mounted')
    this.fetchIndexDaily()
  },
  methods: {
    fetchIndexDaily: function () {
      axios.get('/quantz/', { baseURL: 'http://127.0.0.1:5000/' }).then(response => {
        // 返回数组
        // console.log(response.data)
        // console.log(JSON.stringify(response.data))
        // var indexDF = fromJSON(JSON.stringify(response.data))
        this.stockOptions = json2Candlestick(response.data, '000001.SH', '上证指数')
        // this.stockOptions = df2ChartOpt(indexDF, '000001.SH', '上证指数')
        // console.log(indexDF.head(10).toJSON())
        // console.log(indexDF.getSeries('close').toArray())
      })
    }
  }
}
</script>

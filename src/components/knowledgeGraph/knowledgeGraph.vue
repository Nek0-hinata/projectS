<script lang="ts" setup>
import * as echarts from 'echarts'
import * as graph from './knowledgeGraph.json'
import { onMounted, ref } from 'vue'

const chart = ref()

onMounted(() => {
  const knowledgeGraph = echarts.init(chart.value)

  const options = {
    tooltip: {},
    legend: [
      {
        data: graph.categories.map((a) => a.name)
      }
    ],
    series: [
      {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'none',
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        labelLayout: {
          hideOverlap: true
        },
        scaleLimit: {
          min: 0.4,
          max: 2
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        }
      }
    ]
  }

  knowledgeGraph.setOption(options)
})
</script>

<template>
  <div ref="chart" style="width: 1000px; height: 1000px" />
</template>

<style scoped></style>

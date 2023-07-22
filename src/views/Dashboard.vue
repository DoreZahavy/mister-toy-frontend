<template >
    <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    components: {
        Doughnut
    },
    data() {
        return {
            chartOptions: {
                // responsive: true,
                // maintainAspectRatio: true
            },
       
        }
    },
    computed:{
        chartData(){
            return this.$store.getters.chartData
        }
    }
}
</script>
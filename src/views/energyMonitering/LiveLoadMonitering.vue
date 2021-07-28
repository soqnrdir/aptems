 <template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h5 class="fw-bold text-start">실시간 부하 모니터링</h5>
        <div class="card mt-5">
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-8">
                <h5 class="fw-bold text-center">현재 사용량(kWh)</h5>
                <vue3-chart-js
                    :id="BarChart.id"
                    ref="chartRef"
                    :type="BarChart.type"
                    :data="BarChart.data"
                    :options="BarChart.options"
                    @before-render="beforeRenderLogic"
                ></vue3-chart-js>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
// import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    Vue3ChartJs
    // Datepicker
  },
  data () {
    return {
      nowsday: ref(new Date())
    }
  },
  setup () {
    const BarChart = {
      id: 'bar',
      type: 'bar',
      data: {
        labels: ['6동 공용부', '5동 공용부', '4동 공용부', '3동 공용부', '2동 공용부', '1동 공용부',
          '관리사무소', '지하주차장 환기', '지하주차장 전등'
        ],
        datasets: [
          {
            axis: 'y',
            label: '사용량(kWh)',
            backgroundColor: [
              '#32CD32'
            ],
            data: [
              71.2, 40, 71, 23.9, 76.1, 85.9, 15.6, 0.5, 12.7
            ],
            borderColor: '#32CD32'
          }
        ]
      },
      options: {
        low: 0,
        high: 8,
        showArea: false,
        height: '245px',
        axisX: {
          showGrid: false
        },
        lineSmooth: true,
        showLine: true,
        showPoint: true,
        fullWidth: true,
        chartPadding: {
          right: 50
        },
        indexAxis: 'y'
      }
    }
    return {
      BarChart
    }
  }
}
</script>

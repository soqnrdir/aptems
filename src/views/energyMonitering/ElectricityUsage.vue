 <template>
  <div class="container">
    <div class="row">
    <div class="col-md-12">
      <h5 class="fw-bold text-start">월별 전기 사용량</h5>
      <div class="card mt-5">
        <div class="card-body">
          <div class="row">
            <div class="col-1">
              <datepicker  class="form-control bg-white text-center" v-model="nowsday"  inputFormat='yyyy-MM' startingView='month' minimumView='month' :locale="locale"/>
            </div>
            <button type="button" class="btn btn-info ms-auto me-3 text-white" style="flex-basis:122px;" @click="updateChart">&#9636;데이터입력</button>
          </div>
          <div class="row justify-content-center">
            <div class="col-6">
              <h5 class="fw-bold text-center">전기 사용량</h5>
              <vue3-chart-js
                  :id="BarChart.id"
                  ref="chartRef"
                  :type="BarChart.type"
                  :data="BarChart.data"
                  :options="BarChart.options"
              ></vue3-chart-js>
            </div>
            <div class="col-6">
              <h5 class="fw-bold text-center">전기요금</h5>
              <vue3-chart-js
                  :id="BarChart2.id"
                  ref="chartRef"
                  :type="BarChart2.type"
                  :data="BarChart2.data"
                  :options="BarChart2.options"
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
import Datepicker from 'vue3-datepicker'
import { ko } from 'date-fns/locale'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    Vue3ChartJs,
    Datepicker
  },
  data () {
    return {
      locale: ko,
      nowsday: ref(new Date('2021-07'))
    }
  },
  setup () {
    const BarChart = {
      id: 'bar',
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
          {
            label: '주택용사용량',
            backgroundColor: [
              'grey'
            ],
            data: [
              57000, 56000, 55500, 55000, 54000, 55000, 56000, 57000, 58000, 57000, 56000, 55000
            ],
            borderColor: 'grey'
          },
          {
            label: '산업용사용량',
            backgroundColor: [
              'skyblue'
            ],
            data: [
              2400, 2000, 2100, 2000, 1000, 2000, 1500, 2200, 1900, 2200, 2100, 2000
            ],
            borderColor: 'skyblue'
          },
          {
            label: '가로등사용량',
            backgroundColor: [
              'blue'
            ],
            data: [
              1800, 1500, 1700, 1600, 1100, 1200, 1500, 1800, 1500, 1200, 1600, 1400
            ],
            borderColor: 'blue'
          }
        ]
      },
      options: {
        low: 0,
        high: 3,
        showArea: false,
        height: '50px',
        axisX: {
          showGrid: false
        },
        lineSmooth: true,
        showLine: true,
        showPoint: true,
        fullWidth: false,
        chartPadding: {
          right: 50
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    }

    const BarChart2 = {
      id: 'bar',
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
          {
            label: '주택용요금',
            backgroundColor: [
              '#DAA520'
            ],
            data: [
              137000, 146000, 148500, 149000, 150000, 152000, 156000, 153000, 148000, 135000, 126000, 115000
            ],
            borderColor: '#DAA520'
          },
          {
            label: '산업용요금',
            backgroundColor: [
              'green'
            ],
            data: [
              2400, 2000, 2100, 2000, 1000, 2000, 1500, 2200, 1900, 2200, 2100, 2000
            ],
            borderColor: 'green'
          },
          {
            label: '가로등요금',
            backgroundColor: [
              'brown'
            ],
            data: [
              1800, 1500, 1700, 1600, 1100, 1200, 1500, 1800, 1500, 1200, 1600, 1400
            ],
            borderColor: 'brown'
          }
        ]
      },
      options: {
        low: 0,
        high: 3,
        showArea: false,
        height: '50px',
        axisX: {
          showGrid: false
        },
        lineSmooth: true,
        showLine: true,
        showPoint: true,
        fullWidth: false,
        chartPadding: {
          right: 50
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    }
    const beforeRenderLogic = (event) => {
      // ...
      // if(a === b) {
      //  event.preventDefault()
      // }
    }

    return {
      BarChart,
      BarChart2,
      beforeRenderLogic
    }
  }
}
</script>

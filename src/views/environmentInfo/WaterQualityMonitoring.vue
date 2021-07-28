 <template>
  <div class="container">
    <div class="row">
    <div class="col-md-12">
      <h5 class="fw-bold text-start">환경데이터 이력</h5>
      <div class="card mt-5">
        <div class="card-body">
          <div class="row">
            <div class="col-2">
              <select class="form-select" id="auth-text">
                <option selected value="저수지수질">저수지수질</option>
                <option value="지하도수질">지하도수질</option>
              </select>
            </div>
            <div class="col-2">
              <datepicker class="form-control bg-white" v-model="nowsday" :locale="locale"/>
            </div>
            <button type="button" class="btn btn-info ms-auto me-3 text-white" style="flex-basis:110px;" @click="updateChart">&#8634;새로고침</button>
          </div>
          <div class="row justify-content-center">
            <div class="col-8">
              <h5 class="fw-bold text-center">수질 정보</h5>
              <vue3-chart-js
                  :id="LineChart.id"
                  ref="chartRef"
                  :type="LineChart.type"
                  :data="LineChart.data"
                  :options="LineChart.options"
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
      nowsday: ref(new Date())
    }
  },
  setup () {
    const chartRef = ref(null)
    const LineChart = {
      id: 'line',
      type: 'line',
      data: {
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
          '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
          '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
          '24:00'
        ],

        datasets: [
          {
            label: 'PH',
            backgroundColor: [
              'red'
            ],
            data: [
              7.2, 7.3, 6.8, 6.9, 7.1, 7.1, 7, 6.8,
              6.9, 7.1, 7.3, 7.2, 7.2, 6.8, 6.9, 7,
              7, 6.8, 6.8, 6.9, 7.1, 7.3, 7.2, 7.1, 7.2
            ],
            borderColor: 'red'
          },
          {
            label: '염소',
            backgroundColor: [
              'orange'
            ],
            data: [
              0.8, 0.9, 0.8, 0.7, 0.6, 0.6, 0.7, 0.8,
              0.9, 1, 0.9, 0.9, 0.9, 1, 1, 0.9,
              0.8, 0.7, 0.7, 0.8, 0.9, 0.8, 0.9, 0.9, 1
            ],
            borderColor: 'orange'
          },
          {
            label: '탁도',
            backgroundColor: [
              '#41B883'
            ],
            data: [
              0.07, 0.05, 0.06, 0.06, 0.08, 0.09, 0.08, 0.08,
              0.07, 0.08, 0.07, 0.07, 0.06, 0.06, 0.07, 0.07,
              0.07, 0.08, 0.08, 0.09, 0.08, 0.08, 0.06, 0.07, 0.08
            ],
            borderColor: '#41B883'
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
        }
      }
    }
    const updateChart = () => {
      const PHRandomArr = []
      const ChlorineRandomArr = []
      const TurbidityRandomArr = []
      for (let i = 0; PHRandomArr.length < 25; i++) {
        let random = Math.random() * (8 - 6) + 6
        random = Math.round(random * 10) / 10.0
        if (random !== 8 || random !== 8) {
          PHRandomArr.push(random)
        }
      }

      for (let i = 0; ChlorineRandomArr.length < 25; i++) {
        let random = Math.random() * (2 - 1) + 1
        random = Math.round(random * 10) / 10.0
        if (random !== 0 || random !== 1) {
          ChlorineRandomArr.push(random)
        }
      }

      for (let i = 0; TurbidityRandomArr.length < 25; i++) {
        let random = Math.random() * (0.1 - 0.0) + 0.0
        random = Math.round(random * 100) / 100.0
        if (random !== 0 || random !== 1) {
          TurbidityRandomArr.push(random)
        }
      }

      LineChart.data.labels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
        '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
        '24:00']
      LineChart.data.datasets = [
        {
          label: 'PH',
          backgroundColor: [
            'red'
          ],
          data: PHRandomArr,
          borderColor: 'red'
        },
        {
          label: '염소',
          backgroundColor: [
            'orange'
          ],
          data: ChlorineRandomArr,
          borderColor: 'orange'
        },
        {
          label: '탁도',
          backgroundColor: [
            '#41B883'
          ],
          data: TurbidityRandomArr,
          borderColor: '#41B883'
        }
      ]
      chartRef.value.update()
    }
    const beforeRenderLogic = (event) => {
      // ...
      // if(a === b) {
      //  event.preventDefault()
      // }
    }

    return {
      LineChart,
      updateChart,
      chartRef,
      beforeRenderLogic
    }
  }
}
</script>

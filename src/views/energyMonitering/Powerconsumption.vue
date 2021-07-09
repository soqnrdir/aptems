 <template>
  <div class="container">
    <div class="row">
    <div class="col-md-12">
      <h5 class="fw-bold text-start">설비별 전력 사용량</h5>
      <div class="card mt-5">
        <div class="card-body">
          <div class="row">
            <div class="col-2">
              <select class="form-select" id="auth-text">
                <option selected value="지하주차장 조명">지하주차장 조명</option>
                <option value="장소1">장소1</option>
                <option value="장소2">장소2</option>
              </select>
            </div>
            <button type="button" class="border-0 bg-white nav-link" style="flex-basis:80px;" @click="updateChart">1일</button>
            <button type="button" class="border-0 bg-white" style="flex-basis:80px;" @click="updateChart">1주일</button>
            <button type="button" class="border-0 bg-white" style="flex-basis:80px;" @click="updateChart">3개월</button>
            <button type="button" class="border-0 bg-white" style="flex-basis:80px;" @click="updateChart">1년</button>
            <button type="button" class="border-0 bg-white" style="flex-basis:80px;" @click="updateChart">5년</button>
            <button type="button" class="btn btn-info ms-auto me-3 text-white" style="flex-basis:110px;" @click="updateChart">&#8634;새로고침</button>
          </div>
          <div class="row justify-content-center">
            <div class="col-8">
              <h5 class="fw-bold text-center">전력 사용량(kWh)</h5>
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
    const chartRef = ref(null)
    const BarChart = {
      id: 'bar',
      type: 'bar',
      data: {
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
          '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
          '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
          '24:00'
        ],
        datasets: [
          {
            label: '사용량(kWh)',
            backgroundColor: [
              '#DAA520'
            ],
            data: [
              7.2, 7.3, 6.8, 6.9, 7.1, 7.1, 7, 6.8,
              6.9, 7.1, 7.3, 7.2, 7.2, 6.8, 6.9, 7,
              7, 6.8, 6.8, 6.9, 7.1, 7.3, 7.2, 7.1, 7.2
            ],
            borderColor: '#DAA520'
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
      for (let i = 0; PHRandomArr.length < 25; i++) {
        let random = Math.random() * (8 - 6) + 6
        random = Math.round(random * 10) / 10.0
        if (random !== 8 || random !== 8) {
          PHRandomArr.push(random)
        }
      }
      BarChart.data.labels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
        '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
        '24:00']
      BarChart.data.datasets = [
        {
          label: '사용량(kWh)',
          backgroundColor: [
            '#DAA520'
          ],
          data: PHRandomArr,
          borderColor: '#DAA520'
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
      BarChart,
      updateChart,
      chartRef,
      beforeRenderLogic
    }
  }
}
</script>

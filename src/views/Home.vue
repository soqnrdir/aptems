<template>
  <div class="container text-start">
    <div class="row">
      <div class="card col-4 rounded p-2">
        <div>
          <div class="card-header bg-gradient" :style="{backgroundColor : titleColor}">
            <h5 class="card-title text-white mt-2" >현재 피크 전력</h5>
          </div>
          <div class="card-body d-flex">
            <div class="col-5 text-center d-flex justify-content-center ">
              <div class="col-8">
                <div class="border text-primary" style="height:100px;line-height:100px">정상</div>
                <div class="border bg-info" style="height:40px;line-height:40px">1850 kWh</div>
              </div>
            </div>
            <div class="col-7">
              <div class="row border">
                <div class="col-6 text-center text-white" :style="{backgroundColor : wattage}">변전용량</div>
                <div class="col-6">10,000 kWh</div>
              </div>
              <div class="row border">
                <div class="col-6 text-center text-white" :style="{backgroundColor : wattage}">계약전력</div>
                <div class="col-6">8,000 kWh</div>
              </div>
              <div class="row border">
                <div class="col-6 text-center text-white" :style="{backgroundColor : wattage}">피크전력</div>
                <div class="col-6">4,580 kWh</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card col-8 rounded p-2">
        <div>
          <div class="card-header bg-gradient" :style="{backgroundColor : titleColor}">
            <h5 class="card-title text-white mt-2">전체 전력 사용량 추세</h5>
          </div>
          <div class="card-body">
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
    <div class="row">
      <div class="card col-4 rounded p-2">
        <div>
          <div class="card-header bg-gradient" :style="{backgroundColor : titleColor}">
            <h5 class="card-title text-white mt-2">공용부 현 사용량</h5>
          </div>
          <div class="card-body" style="padding-top:0;padding-bottom:0">
            <div class="row border" :style="{backgroundColor : wattage}">
              <div class="col-6 fw-bold">엘리베이터</div>
              <div class="col-6 text-white">10 kW</div>
            </div>
            <div class="row border" :style="{backgroundColor : titleColor}">
              <div class="col-6">지하주차장</div>
              <div class="col-6 text-white">20 kW</div>
            </div>
            <div class="row border" :style="{backgroundColor : wattage}">
              <div class="col-6 fw-bold">조명</div>
              <div class="col-6 text-white">23 kW</div>
            </div>
            <div class="row border" :style="{backgroundColor : titleColor}">
              <div class="col-6">관리소</div>
              <div class="col-6 text-white">10 kW</div>
            </div>
            <div class="row border" :style="{backgroundColor : wattage}">
              <div class="col-6 fw-bold" >경로당</div>
              <div class="col-6 text-white">10 kW</div>
            </div>
            <div class="row border" :style="{backgroundColor : titleColor}">
              <div class="col-6">기타</div>
              <div class="col-6 text-white">10 kW</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card col-8 rounded p-2">
        <div>
          <div class="card-header bg-gradient" :style="{backgroundColor : titleColor}">
            <h5 class="card-title text-white mt-2">공용부 전력 사용량 추세</h5>
          </div>
          <div class="card-body">
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
    <div class="row">
      <div class="card col-4 rounded p-2">
        <div>
          <div class="card-header bg-gradient" :style="{backgroundColor : titleColor}">
            <h5 class="card-title text-white mt-2">주변환경</h5>
          </div>
          <div class="card-body d-flex justify-content-center ">
            <div class="col-10 text-center mt-3">
              <div class="row border ">
                <div class="col-6 text-center text-white bg-primary">미세먼지</div>
                <div class="col-6">좋음</div>
              </div>
              <div class="row border mt-3">
                <div class="col-6 text-center text-white bg-primary">피크전력</div>
                <div class="col-6">12.3 ºC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card col-4 rounded p-2">
        <div>
          <div class="card-header bg-gradient justify-content-center" :style="{backgroundColor : titleColor}">
            <h5 class="card-title text-white mt-2">날씨</h5>
          </div>
          <div class="card-body d-flex justify-content-center">
            <div class="col-8 d-flex">
            <img style="width:50%" src="../img/cloud.png">
            <div class="col-10 ms-3 mt-2">
              <div class="text-warning fw-bold">시흥시 오늘의 날씨</div>
              <div>23º</div>
              <div>흐림</div>
              <div>...</div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card col-4 rounded p-2">
        <div>
          <div class="card-header bg-gradient" :style="{backgroundColor : titleColor}">
            <h5 class="card-title text-white mt-2">알림</h5>
          </div>
          <div class="card-body d-flex justify-content-center">
            <div class="col-12 text-center ">
              <div class="row border">
                <div class="col-4 text-center bg-warning">2021/05/01 08:20:10</div>
                <div class="col-8 bg-warning">오늘 수요반응(DR) 발령이 예정되어 있습니다.</div>
              </div>
              <div class="row border">
                <div class="col-4 text-center bg-warning">2021/05/02 08:20:10</div>
                <div class="col-8 bg-warning">내일 수요반응(DR) 발령이 예정되어 있습니다.</div>
              </div>
              <div class="row border">
                <div class="col-4 text-center bg-warning">2021/05/03 08:20:10</div>
                <div class="col-8 bg-warning">모래 수요반응(DR) 발령이 예정되어 있습니다.</div>
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
export default {
  components: {
    Vue3ChartJs
  },
  data () {
    return {
      titleColor: 'yellowgreen',
      wattage: 'olivedrab'
    }
  },
  setup () {
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
              2100, 2300, 2500, 2200, 1700, 1200, 800, 1300,
              1400, 1800, 2100, 2800, 1500, 1300, 2200, 1900,
              1700, 1600, 2000, 2500, 2400, 2200, 2100, 2800, 2600
            ],
            borderColor: '#DAA520'
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        maintainAspectRatio: false,
        showArea: false,
        axisX: {
          showGrid: false
        },
        lineSmooth: true,
        showLine: true,
        showPoint: true,
        fullWidth: true
      }
    }
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
            backgroundColor: [
              'brown'
            ],
            data: [
              4.1, 4.3, 4.8, 4.9, 5.1, 5.1, 5, 5.8,
              5.9, 4.1, 4.3, 5.2, 4.2, 5.8, 4.9, 5,
              4.1, 4.8, 4.8, 4.9, 5.1, 5.3, 5.2, 5.1, 4.2
            ],
            borderColor: 'brown'
          },
          {
            backgroundColor: [
              'blue'
            ],
            data: [
              3.2, 3.3, 2.8, 2.9, 3.1, 3.1, 3, 2.8,
              2.9, 3.1, 3.3, 3.2, 3.2, 2.8, 2.9, 3,
              3, 2.8, 2.8, 2.9, 3.1, 3.3, 3.2, 3.1, 3.2
            ],
            borderColor: 'blue'
          },
          {
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
        plugins: {
          legend: {
            display: false
          }
        },
        maintainAspectRatio: false,
        showArea: false,
        axisX: {
          showGrid: false
        },
        lineSmooth: true,
        showLine: true,
        showPoint: true,
        fullWidth: true
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
      LineChart,
      beforeRenderLogic
    }
  }
}
</script>

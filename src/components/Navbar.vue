<template>
<div class="container">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <router-link  @click="changeColor()" to="/"><img src="../img/mainLogo.png" class="img-fluid" alt="..."></router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <li class="nav-item dropdown ms-3" :class="bgColor1" @click="changeColor(1)">
              <a class="nav-link dropdown-toggle" :class="textColor1" href="#" id="navbarEnergyMonitering" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                에너지모니터링
              </a>
              <ul class="dropdown-menu" :class="showUse1" aria-labelledby="navbarEnergyMonitering">
                <li><router-link class="nav-link" to="/powerconsumption">설비별전력사용량</router-link></li>
                <li><router-link class="nav-link" style="font-size:0.98em" to="/liveLoadMonitering">실시간부하모니터링</router-link></li>
                <li><router-link class="nav-link" to="/energyCostMonth">월별에너지비용</router-link></li>
                <li><router-link class="nav-link" to="/facilityControl">설비제어</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown ms-3" :class="bgColor2" @click="changeColor(2)">
              <a class="nav-link dropdown-toggle" :class="textColor2" href="#" id="navbarStatisticsReport" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                통계리포트
              </a>
              <ul class="dropdown-menu" :class="showUse2" aria-labelledby="navbarStatisticsReport">
                <li><router-link class="nav-link" to="/energyUseStatistics">에너지사용량통계</router-link></li>
                <li><router-link class="nav-link" to="/powerUseHistory">전력사용량이력</router-link></li>
                <li><router-link class="nav-link" to="/equipFailureHistory">장비장애이력</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown ms-3" :class="bgColor3" @click="changeColor(3)">
              <a class="nav-link dropdown-toggle" :class="textColor3" href="#" id="navbareEquipManagement" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                장비관리
              </a>
              <ul class="dropdown-menu" :class="showUse3" aria-labelledby="navbareEquipManagement">
                <li><router-link class="nav-link" to="/facilityManagement">설비관리</router-link></li>
                <li><router-link class="nav-link" to="/instrumentManagement">계측기관리</router-link></li>
                <li><router-link class="nav-link" to="/ioTSensorManagement">IoT센서관리</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown ms-3" :class="bgColor4" @click="changeColor(4)">
              <a class="nav-link dropdown-toggle" :class="textColor4" href="#" id="navbarDR" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                DR
              </a>
              <ul class="dropdown-menu" :class="showUse4" aria-labelledby="navbarDR">
                <li><router-link class="nav-link" to="/drStatus">DR현황</router-link></li>
                <li><router-link class="nav-link" to="/drOccurrenceHistory">DR발생이력</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown ms-3" :class="bgColor5" @click="changeColor(5)">
              <a class="nav-link dropdown-toggle" :class="textColor5" href="#" id="navbarEnvironmentInfo" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                환경정보
              </a>
              <ul class="dropdown-menu" :class="showUse5" aria-labelledby="navbarEnvironmentInfo">
                <li><router-link class="nav-link" to="/environmentDataHistory">환경데이터이력</router-link></li>
                <li><router-link class="nav-link" to="/waterQualityMonitoring">수질모니터링</router-link></li>
                <li><router-link class="nav-link" to="/waterQualityAlarmHistory">수질경보이력</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown ms-3" :class="bgColor6" @click="changeColor(6)">
              <a class="nav-link dropdown-toggle" :class="textColor6" href="#" id="navbarSystem" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                시스템
              </a>
              <ul class="dropdown-menu" :class="showUse6" aria-labelledby="navbarSystem">
                <li><router-link class="nav-link" to="/userManagement">사용자관리</router-link></li>
                <li><router-link class="nav-link" to="/systemSetting">시스템성정</router-link></li>
              </ul>
            </li>
        </ul>
        </div>
    </div>
  </nav>
</div>
</template>

<script>
// import $ from 'jquery'
export default {
  data () {
    return {
      bgColor1: '',
      bgColor2: '',
      bgColor3: '',
      bgColor4: '',
      bgColor5: '',
      bgColor6: '',

      textColor1: '',
      textColor2: '',
      textColor3: '',
      textColor4: '',
      textColor5: '',
      textColor6: '',

      showUse1: '',
      showUse2: '',
      showUse3: '',
      showUse4: '',
      showUse5: '',
      showUse6: ''
    }
  },
  methods: {
    changeColor (num) {
      this.showUse1 = ''
      this.showUse2 = ''
      this.showUse3 = ''
      this.showUse4 = ''
      this.showUse5 = ''
      this.showUse6 = ''

      this.bgColor1 = 'bg-light'
      this.bgColor2 = 'bg-light'
      this.bgColor3 = 'bg-light'
      this.bgColor4 = 'bg-light'
      this.bgColor5 = 'bg-light'
      this.bgColor6 = 'bg-light'

      this.textColor1 = 'text-dark'
      this.textColor2 = 'text-dark'
      this.textColor3 = 'text-dark'
      this.textColor4 = 'text-dark'
      this.textColor5 = 'text-dark'
      this.textColor6 = 'text-dark'

      if (num === 1) {
        this.bgColor1 = 'bg-dark'
        this.textColor1 = 'text-white'
        this.showUse1 = 'show'
      } if (num === 2) {
        this.bgColor2 = 'bg-dark'
        this.textColor2 = 'text-white'
        this.showUse2 = 'show'
      } if (num === 3) {
        this.bgColor3 = 'bg-dark'
        this.textColor3 = 'text-white'
        this.showUse3 = 'show'
      } if (num === 4) {
        this.bgColor4 = 'bg-dark'
        this.textColor4 = 'text-white'
        this.showUse4 = 'show'
      } if (num === 5) {
        this.bgColor5 = 'bg-dark'
        this.textColor5 = 'text-white'
        this.showUse5 = 'show'
      } if (num === 6) {
        this.bgColor6 = 'bg-dark'
        this.textColor6 = 'text-white'
        this.showUse6 = 'show'
      }
    }
  }
}
</script>

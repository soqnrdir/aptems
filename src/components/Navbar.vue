<template>
<div class="container">
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="flex-basis: 300px">
    <div class="container-fluid">
        <router-link @click ="changeColor()" to="/"><img src="../img/mainLogo.png" class="img-fluid" alt="..."></router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <li class="nav-item dropdown ms-3" >
              <a class="nav-link dropdown-toggle" @click ="changeColor(1)" :style="{ color: textColor1, backgroundColor: bgColor1 }" href="#" id="navbarEnergyMonitering" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                에너지모니터링
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarEnergyMonitering">
                <li><router-link class="nav-link dropdown-item" to="/powerconsumption">설비별전력사용량</router-link></li>
                <li><router-link class="nav-link dropdown-item" style="font-size:0.98em" to="/liveLoadMonitering">실시간부하모니터링</router-link></li>
                <li><router-link class="nav-link dropdown-item" to="/electricityUsage">월별전기사용량</router-link></li>
                <li><router-link class="nav-link dropdown-item" to="/energyCostMonth">월별에너지비용</router-link></li>
                <li><router-link class="nav-link dropdown-item" to="/facilityControl">설비제어</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown ms-3" >
              <a class="nav-link dropdown-toggle" @click ="changeColor(2)" :style="{ color: textColor2, backgroundColor: bgColor2 }" href="#" id="navbarStatisticsReport" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                통계리포트
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarStatisticsReport">
                <li><router-link class="nav-link" to="/energyUseStatistics">에너지사용량통계</router-link></li>
                <li><router-link class="nav-link" to="/powerUseHistory">전력사용량이력</router-link></li>
                <li><router-link class="nav-link" to="/equipFailureHistory">장비장애이력</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown ms-3" >
              <a class="nav-link dropdown-toggle" @click ="changeColor(3)" :style="{ color: textColor3, backgroundColor: bgColor3 }" href="#" id="navbareEquipManagement" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                장비관리
              </a>
              <ul class="dropdown-menu"  aria-labelledby="navbareEquipManagement">
                <li><router-link class="nav-link" to="/facilityManagement">설비관리</router-link></li>
                <li><router-link class="nav-link" to="/instrumentManagement">계측기관리</router-link></li>
                <li><router-link class="nav-link" to="/ioTSensorManagement">IoT센서관리</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown ms-3"  >
              <a class="nav-link dropdown-toggle" @click ="changeColor(4)" :style="{ color: textColor4, backgroundColor: bgColor4 }" href="#" id="navbarDR" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                DR
              </a>
              <ul class="dropdown-menu"  aria-labelledby="navbarDR">
                <li><router-link class="nav-link" to="/drStatus">DR현황</router-link></li>
                <li><router-link class="nav-link" to="/drOccurrenceHistory">DR발생이력</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown ms-3" >
              <a class="nav-link dropdown-toggle" @click ="changeColor(5)" :style="{ color: textColor5, backgroundColor: bgColor5 }"  href="#" id="navbarEnvironmentInfo" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                환경정보
              </a>
              <ul class="dropdown-menu"  aria-labelledby="navbarEnvironmentInfo">
                <li><router-link class="nav-link" to="/environmentDataHistory">환경데이터이력</router-link></li>
                <li><router-link class="nav-link" to="/waterQualityMonitoring">수질모니터링</router-link></li>
                <li><router-link class="nav-link" to="/waterQualityAlarmHistory">수질경보이력</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown ms-3" >
              <a class="nav-link dropdown-toggle" @click ="changeColor(6)" :style="{ color: textColor6, backgroundColor: bgColor6 }"  href="#" id="navbarSystem" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                시스템
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarSystem">
                <li><router-link class="nav-link" to="/userManagement">사용자관리</router-link></li>
                <li><router-link class="nav-link" to="/systemSetting">시스템설정</router-link></li>
              </ul>
            </li>
        </ul>
      </div>
    </div>
  </nav>
      <hr class="border border-dark border-2">
</div>
</template>

<script>
export default {
  data () {
    return {
      bgColor1: '#f8f9fa',
      bgColor2: '#f8f9fa',
      bgColor3: '#f8f9fa',
      bgColor4: '#f8f9fa',
      bgColor5: '#f8f9fa',
      bgColor6: '#f8f9fa',

      textColor1: 'black',
      textColor2: 'black',
      textColor3: 'black',
      textColor4: 'black',
      textColor5: 'black',
      textColor6: 'black'
    }
  },
  methods: {
    changeColor (num) {
      this.bgColor1 = '#f8f9fa'
      this.bgColor2 = '#f8f9fa'
      this.bgColor3 = '#f8f9fa'
      this.bgColor4 = '#f8f9fa'
      this.bgColor5 = '#f8f9fa'
      this.bgColor6 = '#f8f9fa'

      this.textColor1 = 'black'
      this.textColor2 = 'black'
      this.textColor3 = 'black'
      this.textColor4 = 'black'
      this.textColor5 = 'black'
      this.textColor6 = 'black'

      if (num === 1) {
        this.bgColor1 = 'black'
        this.textColor1 = '#f8f9fa'
      } if (num === 2) {
        this.bgColor2 = 'black'
        this.textColor2 = '#f8f9fa'
      } if (num === 3) {
        this.bgColor3 = 'black'
        this.textColor3 = '#f8f9fa'
      } if (num === 4) {
        this.bgColor4 = 'black'
        this.textColor4 = '#f8f9fa'
      } if (num === 5) {
        this.bgColor5 = 'black'
        this.textColor5 = '#f8f9fa'
      } if (num === 6) {
        this.bgColor6 = 'black'
        this.textColor6 = '#f8f9fa'
      }
    }
  }
}
</script>

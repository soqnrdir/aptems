import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Powerconsumption from '../views/energyMonitering/Powerconsumption.vue'
import LiveLoadMonitering from '../views/energyMonitering/LiveLoadMonitering.vue'
import EnergyCostMonth from '../views/energyMonitering/EnergyCostMonth.vue'
import FacilityControl from '../views/energyMonitering/FacilityControl.vue'

import EnergyUseStatistics from '../views/statisticsReport/EnergyUseStatistics.vue'
import PowerUseHistory from '../views/statisticsReport/PowerUseHistory.vue'
import EquipFailureHistory from '../views/statisticsReport/EquipFailureHistory.vue'

import FacilityManagement from '../views/equipmentManagement/FacilityManagement.vue'
import InstrumentManagement from '../views/equipmentManagement/InstrumentManagement.vue'
import IoTSensorManagement from '../views/equipmentManagement/IoTSensorManagement.vue'

import DRStatus from '../views/dr/DRStatus.vue'
import DROccurrenceHistory from '../views/dr/DROccurrenceHistory.vue'

import EnvironmentDataHistory from '../views/environmentInfo/EnvironmentDataHistory.vue'
import WaterQualityMonitoring from '../views/environmentInfo/WaterQualityMonitoring.vue'
import WaterQualityAlarmHistory from '../views/environmentInfo/WaterQualityAlarmHistory.vue'

import UserManagement from '../views/system/UserManagement.vue'
import SystemSetting from '../views/system/SystemSetting.vue'

const routes = [
  // 공통
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // 에너지모니터링
  {
    path: '/powerconsumption',
    name: 'Powerconsumption',
    component: Powerconsumption
  },
  {
    path: '/liveLoadMonitering',
    name: 'LiveLoadMonitering',
    component: LiveLoadMonitering
  },
  {
    path: '/energyCostMonth',
    name: 'EnergyCostMonth',
    component: EnergyCostMonth
  },
  {
    path: '/facilityControl',
    name: 'FacilityControl',
    component: FacilityControl
  },
  // 통계리포트
  {
    path: '/energyUseStatistics',
    name: 'EnergyUseStatistics',
    component: EnergyUseStatistics
  },
  {
    path: '/powerUseHistory',
    name: 'PowerUseHistory',
    component: PowerUseHistory
  },
  {
    path: '/equipFailureHistory',
    name: 'EquipFailureHistory',
    component: EquipFailureHistory
  },
  // 장비관리
  {
    path: '/facilityManagement',
    name: 'FacilityManagement',
    component: FacilityManagement
  },
  {
    path: '/instrumentManagement',
    name: 'InstrumentManagement',
    component: InstrumentManagement
  },
  {
    path: '/ioTSensorManagement',
    name: 'IoTSensorManagement',
    component: IoTSensorManagement
  },
  // DR
  {
    path: '/drStatus',
    name: 'DRStatus',
    component: DRStatus
  },
  {
    path: '/drOccurrenceHistory',
    name: 'DROccurrenceHistory',
    component: DROccurrenceHistory
  },
  // 환경정보
  {
    path: '/environmentDataHistory',
    name: 'EnvironmentDataHistory',
    component: EnvironmentDataHistory
  },
  {
    path: '/waterQualityMonitoring',
    name: 'WaterQualityMonitoring',
    component: WaterQualityMonitoring
  },
  {
    path: '/waterQualityAlarmHistory',
    name: 'WaterQualityAlarmHistory',
    component: WaterQualityAlarmHistory
  },
  // 시스템
  {
    path: '/userManagement',
    name: 'UserManagement',
    component: UserManagement
  },
  {
    path: '/systemSetting',
    name: 'SystemSetting',
    component: SystemSetting
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

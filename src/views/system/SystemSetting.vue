<template>
<div class="container">
  <div class="row ">
    <div class="col-md-12">
      <h5 class="fw-bold text-start">시스템 설정</h5>
      <div class="card mt-5 text-start p-2 rounded">
        <div>
          <div class="card-header">
            <h5 class="card-title fw-bold mt-2">시스템</h5>
          </div>
          <div class="card-body">
            <div class="row fs-3">
              <h5 class="col-1 fw-bold mt-2 text-end" style="flex-basis:120px">설치장소 : </h5>
              <div class="col-3">
                <input type="text" v-model="data.emplacement" :readonly="readonly1" class="form-control">
              </div>
              <button v-if="updated1 == 'on'" type="button" class="btn btn-danger ms-auto" style="flex-basis:60px;" @click="clickCancel1">취소</button>
              <button v-if="updated1 == 'on'" type="button" class="btn btn-info ms-3 me-3" style="flex-basis:60px;" @click="clickSave1">저장</button>
              <button v-if="updated1 == 'off'" type="button" class="btn btn-primary ms-auto me-3" style="flex-basis:60px;" @click="clickUpdate1">수정</button>
            </div>
            <div class="row mt-3">
              <h5 class="col-1 fw-bold mt-2 text-end" style="flex-basis:120px">담당자 : </h5>
              <div class="col-3">
                <input type="text" v-model="data.manager"  :readonly="readonly1" class="form-control">
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <div class="card-header">
            <h5 class="card-title fw-bold mt-2">전력 설정</h5>
          </div>
          <div class="card-body">
            <div class="row fs-4">
              <h5 class="col-1 fw-bold mt-2 text-end" style="flex-basis:170px">계약 전력 용량 : </h5>
              <div class="col-2">
                <input type="text" v-model="data.contratPower" :readonly="readonly2" class="form-control">
              </div>
              <button v-if="updated2 == 'on'" type="button" class="btn btn-danger ms-auto" style="flex-basis:60px;" @click="clickCancel2">취소</button>
              <button v-if="updated2 == 'on'" type="button" class="btn btn-info ms-3 me-3" style="flex-basis:60px;" @click="clickSave2">저장</button>
              <button v-if="updated2 == 'off'" type="button" class="btn btn-primary ms-auto me-3" style="flex-basis:60px;" @click="clickUpdate2">수정</button>
            </div>
            <div class="row mt-3">
              <h5 class="col-1 fw-bold mt-2 text-end" style="flex-basis:170px">점검 기준일 : </h5>
              <div class="col-3">
                <datepicker :disabled="dateDisabled" :style="{ backgroundColor: datebg }" class="form-control"
                  v-model="nowsday"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <div class="card-header">
            <h5 class="card-title fw-bold mt-2">정보 연계</h5>
          </div>
          <div class="card-body">
            <div class="row fs-3">
              <h5 class="col-1 fw-bold mt-2 text-end" style="flex-basis:170px">DR 서버 주소 : </h5>
              <div class="col-3">
                <input type="text" v-model="data.drServerAdd" :readonly="readonly3" class="form-control">
              </div>
              <button v-if="updated3 == 'on'" type="button" class="btn btn-danger ms-auto" style="flex-basis:60px;" @click="clickCancel3">취소</button>
              <button v-if="updated3 == 'on'" type="button" class="btn btn-info ms-3 me-3" style="flex-basis:60px;" @click="clickSave3">저장</button>
              <button v-if="updated3 == 'off'" type="button" class="btn btn-primary ms-auto me-3" style="flex-basis:60px;" @click="clickUpdate3">수정</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'

export default {
  components: {
    Datepicker
  },
  data () {
    return {
      // nowsday: ref(new Date()),
      nowsday: ref(new Date()),
      updated1: 'off',
      updated2: 'off',
      updated3: 'off',

      readonly1: true,
      readonly2: true,
      readonly3: true,
      dateDisabled: true,
      datebg: '#e9ecef',

      data: {
        emplacement: '1차아파트',
        manager: '홍길동',
        contratPower: '8,000kWh',
        setDate: '',
        drServerAdd: '1.234.567.89'
      }
    }
  },
  methods: {
    clickUpdate1 () {
      this.updated1 = 'on'
      this.readonly1 = false
    },
    clickUpdate2 () {
      this.updated2 = 'on'
      this.readonly2 = false
      this.dateDisabled = false
      this.datebg = 'white'
    },
    clickUpdate3 () {
      this.updated3 = 'on'
      this.readonly3 = false
    },
    clickCancel1 () {
      this.updated1 = 'off'
      this.readonly1 = true
    },
    clickCancel2 () {
      this.updated2 = 'off'
      this.readonly2 = true
      this.dateDisabled = true
      this.datebg = '#e9ecef'
    },
    clickCancel3 () {
      this.updated3 = 'off'
      this.readonly3 = true
    },
    clickSave1 () {
      this.updated1 = 'off'
      this.readonly1 = true
    },
    clickSave2 () {
      this.updated2 = 'off'
      this.readonly2 = true
      this.dateDisabled = true
      this.datebg = '#e9ecef'

      const setYear = this.nowsday.getFullYear()
      let setMonth = this.nowsday.getMonth() + 1
      if (setMonth < 10) {
        setMonth = '0' + setMonth
      }
      let setDay = this.nowsday.getDay()
      if (setDay < 10) {
        setDay = '0' + setDay
      }
      let setDate = ''
      setDate = setYear + '-' + setMonth + '-' + setDay
      this.setDate = setDate
    },
    clickSave3 () {
      this.updated3 = 'off'
      this.readonly3 = true
    }
  }
}
</script>

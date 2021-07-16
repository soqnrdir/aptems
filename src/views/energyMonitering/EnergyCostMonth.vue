<template>
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h5 class="fw-bold text-start">월별 에너지 비용</h5>
      <div class="card mt-5">
        <div class="card-body">
          <div class="row">
            <div class="col-2">
              <datepicker class="form-control bg-white" v-model="nowsday" inputFormat='yyyy-MM' startingView='month' monthHeadingFormat='yyyy-MM'/>
            </div>&#8275;
            <div class="col-2">
              <datepicker class="form-control bg-white" v-model="nowsday" inputFormat='yyyy-MM' startingView='month' monthHeadingFormat='yyyy-MM'/>
            </div>
            <button type="button" class="btn btn-info text-white" style="flex-basis:60px;" @click="clickSearch">검색</button>
            <button type="button" class="btn btn-info text-white ms-auto" style="flex-basis:90px;" data-bs-toggle="modal" data-bs-target="#userUpdateModal" @click="userPopR">비용등록</button>
            <button type="button" class="btn btn-info text-white ms-3 me-3" style="flex-basis:130px;">엑셀파일저장</button>
          </div>
          <div class="row">
              <table class="table">
              <colgroup>
                <col width = "12%">
                <col width = "12%">
                <col width = "12%">
                <col width = "12%">
                <col width = "12%">
                <col width = "12%">
                <col width = "12%">
                <col width = "12%">
              </colgroup>
              <thead>
                  <tr>
                  <th scope="col" v-for="column in table.columns" :key="column">{{column}}</th>
                  </tr>
              </thead>
              <tbody v-if="table.data.length != 0">
                <tr v-for="(item, index) in paginatedData" :key="index" >
                  <td>{{item.year}}</td>
                  <td style="color:#00BFFF;cursor:pointer" data-bs-toggle="modal" data-bs-target="#userUpdateModal" @click="userPopU(item, index)">{{item.month}}</td>
                  <td>{{item.residentialUsage}}</td>
                  <td>{{item.residentialRates}}</td>
                  <td>{{item.IndustrialUsage}}</td>
                  <td>{{item.IndustrialRates}}</td>
                  <td>{{item.streetLampUsage}}</td>
                  <td>{{item.streetLampRates}}</td>
                </tr>
              </tbody>
              <tbody v-if="table.data.length == 0">
                <tr>
                  <td colspan="3">데이터가 존재하지 않습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row" v-if="table.data.length != 0">
            <nav aria-label="Page navigation example" class="d-flex flex-row-reverse bd-highlight">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" @click="prevPage" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item" :class="activeOn1" @click="activeSet(pageDefaultNum1)"><a class="page-link" href="#">{{pageDefaultNum1}}</a></li>
                <li v-if="table.data.length > pageDefaultNum1 * 10" class="page-item" :class="activeOn2" @click="activeSet(pageDefaultNum2)"><a class="page-link" href="#">{{pageDefaultNum2}}</a></li>
                <li v-if="table.data.length > pageDefaultNum2 * 10" class="page-item" :class="activeOn3" @click="activeSet(pageDefaultNum3)"><a class="page-link" href="#">{{pageDefaultNum3}}</a></li>
                <li v-if="table.data.length > pageDefaultNum3 * 10" class="page-item" :class="activeOn4" @click="activeSet(pageDefaultNum4)"><a class="page-link" href="#">{{pageDefaultNum4}}</a></li>
                <li v-if="table.data.length > pageDefaultNum4 * 10" class="page-item" :class="activeOn5" @click="activeSet(pageDefaultNum5)"><a class="page-link" href="#">{{pageDefaultNum5}}</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" @click="nextPage" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <!-- modal -->
      <div class="modal fade" id="userUpdateModal" tabindex="-1" aria-labelledby="userUpdateModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fw-bold" id="userUpdateModalLabel">비용 {{userPopTitle}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-start">
              <form>
                <div class="mb-3">
                    <label for="id-text" class="col-form-label">년월:</label>
                    <input :disabled="userPopUorR == false" type="text" class="form-control" v-model="userData.date" id="id-text">
                </div>
                <div class="mb-3">
                    <label for="name-text" class="col-form-label">주택용사용량:</label>
                    <input type="text" class="form-control" v-model="userData.residentialUsage" id="name-text">
                </div>
                <div class="mb-3">
                    <label for="company-text" class="col-form-label">주택용요금:</label>
                    <input type="text" class="form-control" v-model="userData.residentialRates" id="company-text">
                </div>
                <div class="mb-3">
                    <label for="1-text" class="col-form-label">산업용사용량:</label>
                    <input type="text" class="form-control" v-model="userData.IndustrialUsage" id="1-text">
                </div>
                <div class="mb-3">
                    <label for="2-text" class="col-form-label">산업용요금:</label>
                    <input type="text" class="form-control" v-model="userData.IndustrialRates" id="2-text">
                </div>
                <div class="mb-3">
                    <label for="3-text" class="col-form-label">가로등사용량:</label>
                    <input type="text" class="form-control" v-model="userData.streetLampUsage" id="3-text">
                </div>
                <div class="mb-3">
                    <label for="4-text" class="col-form-label">가로등요금:</label>
                    <input type="text" class="form-control" v-model="userData.streetLampRates" id="4-text">
                </div>
              </form>
            </div>
            <div class="modal-footer">
                <button v-show="userPopUorR == false" type="button" @click="clickDelete" class="btn btn-danger">삭제</button>
                <button v-if="userPopUorR == true" type="button" @click="clickInsert" class="btn btn-primary">등록</button>
                <button v-else type="button" class="btn btn-primary" @click="clickUpdate">수정</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="closeModal" id="btnClose">닫기</button>
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

const tableColumns = ['년도', '월', '주택용사용량', '주택용요금', '산업용사용량', '산업용요금', '가로등사용량', '가로등요금']
const tableData = [{
  year: '2020',
  month: '1',
  residentialUsage: '84,523',
  residentialRates: '13,566,307',
  IndustrialUsage: '2,463',
  IndustrialRates: '358,690',
  streetLampUsage: '635',
  streetLampRates: '95,970'
},
{
  year: '2020',
  month: '2',
  residentialUsage: '84,523',
  residentialRates: '13,566,307',
  IndustrialUsage: '2,463',
  IndustrialRates: '358,690',
  streetLampUsage: '635',
  streetLampRates: '95,970'
},
{
  year: '2020',
  month: '3',
  residentialUsage: '84,523',
  residentialRates: '13,566,307',
  IndustrialUsage: '2,463',
  IndustrialRates: '358,690',
  streetLampUsage: '635',
  streetLampRates: '95,970'
},
{
  year: '2020',
  month: '4',
  residentialUsage: '84,523',
  residentialRates: '13,566,307',
  IndustrialUsage: '2,463',
  IndustrialRates: '358,690',
  streetLampUsage: '635',
  streetLampRates: '95,970'
},
{
  year: '2020',
  month: '5',
  residentialUsage: '84,523',
  residentialRates: '13,566,307',
  IndustrialUsage: '2,463',
  IndustrialRates: '358,690',
  streetLampUsage: '635',
  streetLampRates: '95,970'
},
{
  year: '2020',
  month: '6',
  residentialUsage: '84,523',
  residentialRates: '13,566,307',
  IndustrialUsage: '2,463',
  IndustrialRates: '358,690',
  streetLampUsage: '635',
  streetLampRates: '95,970'
},
{
  year: '2020',
  month: '7',
  residentialUsage: '84,523',
  residentialRates: '13,566,307',
  IndustrialUsage: '2,463',
  IndustrialRates: '358,690',
  streetLampUsage: '635',
  streetLampRates: '95,970'
},
{
  year: '2020',
  month: '8',
  residentialUsage: '84,523',
  residentialRates: '13,566,307',
  IndustrialUsage: '2,463',
  IndustrialRates: '358,690',
  streetLampUsage: '635',
  streetLampRates: '95,970'
},
{
  year: '2020',
  month: '9',
  residentialUsage: '84,523',
  residentialRates: '13,566,307',
  IndustrialUsage: '2,463',
  IndustrialRates: '358,690',
  streetLampUsage: '635',
  streetLampRates: '95,970'
},
{
  year: '2020',
  month: '10',
  residentialUsage: '84,523',
  residentialRates: '13,566,307',
  IndustrialUsage: '2,463',
  IndustrialRates: '358,690',
  streetLampUsage: '635',
  streetLampRates: '95,970'
},
{
  year: '2020',
  month: '11',
  residentialUsage: '84,523',
  residentialRates: '13,566,307',
  IndustrialUsage: '2,463',
  IndustrialRates: '358,690',
  streetLampUsage: '635',
  streetLampRates: '95,970'
},
{
  year: '2020',
  month: '12',
  residentialUsage: '84,523',
  residentialRates: '13,566,307',
  IndustrialUsage: '2,463',
  IndustrialRates: '358,690',
  streetLampUsage: '635',
  streetLampRates: '95,970'
}]

export default {
  components: {
    Datepicker
  },
  data () {
    return {
      nowsday: ref(new Date('2021-07')),
      table: {
        columns: [...tableColumns],
        data: [...tableData]
      },
      list: function () {
        var list = []
        for (var i = this.startIndex; i < this.endIndex; i++) {
          this.list.push(tableData[i])
        }
        return list
      },
      pageNum: 0,
      pageSize: 10,
      startIndex: 0,
      endIndex: 10,
      validated: 1,
      userPopTitle: '',
      userPopUorR: true,
      userData: {
        index: null,
        year: '',
        month: '',
        date: '',
        residentialUsage: '',
        residentialRates: '',
        IndustrialUsage: '',
        IndustrialRates: '',
        streetLampUsage: '',
        streetLampRates: ''
      },
      pageDefaultNum1: 1,
      pageDefaultNum2: 2,
      pageDefaultNum3: 3,
      pageDefaultNum4: 4,
      pageDefaultNum5: 5,
      pervDisabled: '#',
      nextDisabled: '#',

      activeOn1: 'active',
      activeOn2: '',
      activeOn3: '',
      activeOn4: '',
      activeOn5: ''
    }
  },
  methods: {
    prevPage () {
      if (this.pageDefaultNum1 !== 1) {
        this.activeOn1 = 'active'
        this.activeOn2 = ''
        this.activeOn3 = ''
        this.activeOn4 = ''
        this.activeOn5 = ''

        this.pageDefaultNum1 = this.pageDefaultNum1 - 5
        this.pageDefaultNum2 = this.pageDefaultNum2 - 5
        this.pageDefaultNum3 = this.pageDefaultNum3 - 5
        this.pageDefaultNum4 = this.pageDefaultNum4 - 5
        this.pageDefaultNum5 = this.pageDefaultNum5 - 5

        this.pageNum = this.pageDefaultNum1 - 1
        this.startIndex = this.pageNum * this.pageSize
        this.endIndex = this.startIndex + this.pageSize
      } else {
        this.activeOn1 = 'active'
        this.activeOn2 = ''
        this.activeOn3 = ''
        this.activeOn4 = ''
        this.activeOn5 = ''

        this.pageNum = 0
        this.startIndex = this.pageNum * this.pageSize
        this.endIndex = this.startIndex + this.pageSize
      }
    },
    nextPage () {
      let tableLen = this.table.data.length
      if (tableLen > this.pageDefaultNum5 * 10) {
        this.pageDefaultNum1 = this.pageDefaultNum1 + 5
        this.pageDefaultNum2 = this.pageDefaultNum2 + 5
        this.pageDefaultNum3 = this.pageDefaultNum3 + 5
        this.pageDefaultNum4 = this.pageDefaultNum4 + 5
        this.pageDefaultNum5 = this.pageDefaultNum5 + 5

        this.activeOn1 = 'active'
        this.activeOn2 = ''
        this.activeOn3 = ''
        this.activeOn4 = ''
        this.activeOn5 = ''

        tableLen = tableLen / 10
        tableLen = parseInt(tableLen)

        this.pageNum = tableLen
        this.startIndex = this.pageNum * this.pageSize
        this.endIndex = this.startIndex + this.pageSize
      } else {
        this.activeOn1 = ''
        this.activeOn2 = ''
        this.activeOn3 = ''
        this.activeOn4 = ''
        this.activeOn5 = ''

        let paging = 1
        if (tableLen > 10) {
          paging = tableLen / 10
          paging = parseInt(paging)
          paging += 1
          if (paging > 5) {
            paging = paging % 5
          }
        }

        let pageNum = 0
        if (tableLen > 10) {
          tableLen = tableLen / 10
          tableLen = parseInt(tableLen)
          pageNum += tableLen
        }

        this.pageNum = pageNum
        this.startIndex = this.pageNum * this.pageSize
        this.endIndex = this.startIndex + this.pageSize

        if (paging === 1) {
          this.activeOn1 = 'active'
        } else if (paging === 2) {
          this.activeOn2 = 'active'
        } else if (paging === 3) {
          this.activeOn3 = 'active'
        } else if (paging === 4) {
          this.activeOn4 = 'active'
        } else {
          this.activeOn5 = 'active'
        }
      }
    },
    activeSet (num) {
      this.activeOn1 = ''
      this.activeOn2 = ''
      this.activeOn3 = ''
      this.activeOn4 = ''
      this.activeOn5 = ''

      this.pageNum = num - 1
      this.startIndex = this.pageNum * this.pageSize
      this.endIndex = this.startIndex + this.pageSize

      if (num > 5) {
        num = num % 5
        if (num === 1) {
          this.activeOn1 = 'active'
        } else if (num === 2) {
          this.activeOn2 = 'active'
        } else if (num === 3) {
          this.activeOn3 = 'active'
        } else if (num === 4) {
          this.activeOn4 = 'active'
        } else {
          this.activeOn5 = 'active'
        }
      } else {
        if (num === 1) {
          this.activeOn1 = 'active'
        } else if (num === 2) {
          this.activeOn2 = 'active'
        } else if (num === 3) {
          this.activeOn3 = 'active'
        } else if (num === 4) {
          this.activeOn4 = 'active'
        } else {
          this.activeOn5 = 'active'
        }
      }
    },
    pwCheck () {
      if (this.validated === 1) {
        this.validated = 0
      } else {
        this.validated = 1
      }
    },
    userPopR () {
      this.userPopTitle = '등록'
      this.validated = 1
      this.userPopUorR = true

      this.userData.date = ''
      this.userData.year = ''
      this.userData.month = ''
      this.userData.residentialUsage = ''
      this.userData.residentialRates = ''
      this.userData.IndustrialUsage = ''
      this.userData.IndustrialRates = ''
      this.userData.streetLampUsage = ''
      this.userData.streetLampRates = ''
    },
    userPopU (item, index) {
      this.userPopTitle = '수정'
      this.validated = 1
      this.userPopUorR = false

      index = this.startIndex + index
      this.userData.index = index
      this.userData.date = item.year + '-' + item.month
      this.userData.residentialUsage = item.residentialUsage
      this.userData.residentialRates = item.residentialRates
      this.userData.IndustrialUsage = item.IndustrialUsage
      this.userData.IndustrialRates = item.IndustrialRates
      this.userData.streetLampUsage = item.streetLampUsage
      this.userData.streetLampRates = item.streetLampRates
    },
    clickInsert () {
      if (this.userData.date == null || this.userData.date === '') {
        alert('년월을 입력해주세요.')
        return
      }
      if (this.userData.residentialUsage == null || this.userData.residentialUsage === '') {
        alert('주택용사용량을 입력해주세요.')
        return
      }
      if (this.userData.residentialRates == null || this.userData.residentialRates === '') {
        alert('주택용요금을 입력해주세요.')
        return
      }
      if (this.userData.IndustrialUsage == null || this.userData.IndustrialUsage === '') {
        alert('산업용사용량을 입력해주세요.')
        return
      }
      if (this.userData.IndustrialRates == null || this.userData.IndustrialRates === '') {
        alert('산업용요금을 입력해주세요.')
        return
      }
      if (this.userData.streetLampUsage == null || this.userData.streetLampUsage === '') {
        alert('가로등사용량을 입력해주세요.')
        return
      }
      if (this.userData.streetLampRates == null || this.userData.streetLampRates === '') {
        alert('가로등요금을 입력해주세요.')
        return
      }

      var inserted = confirm('해당 항목을 등록하시겠습니까?')
      if (inserted === true) {
        const dates = this.userData.date.split('-')
        this.userData.year = dates[0]
        this.userData.month = dates[1]

        this.table.data.push({
          no: this.table.data.length + 1,
          year: this.userData.year,
          month: this.userData.month,
          residentialUsage: this.userData.residentialUsage,
          residentialRates: this.userData.residentialRates,
          IndustrialUsage: this.userData.IndustrialUsage,
          IndustrialRates: this.userData.IndustrialRates,
          streetLampUsage: this.userData.streetLampUsage,
          streetLampRates: this.userData.streetLampRates
        })
        alert('등록되었습니다.')
        this.$refs.closeModal.click()
      }
    },
    clickUpdate () {
      if (this.userData.residentialUsage == null || this.userData.residentialUsage === '') {
        alert('주택용사용량을 입력해주세요.')
        return
      }
      if (this.userData.residentialRates == null || this.userData.residentialRates === '') {
        alert('주택용요금을 입력해주세요.')
        return
      }
      if (this.userData.IndustrialUsage == null || this.userData.IndustrialUsage === '') {
        alert('산업용사용량을 입력해주세요.')
        return
      }
      if (this.userData.IndustrialRates == null || this.userData.IndustrialRates === '') {
        alert('산업용요금을 입력해주세요.')
        return
      }
      if (this.userData.streetLampUsage == null || this.userData.streetLampUsage === '') {
        alert('가로등사용량을 입력해주세요.')
        return
      }
      if (this.userData.streetLampRates == null || this.userData.streetLampRates === '') {
        alert('가로등요금을 입력해주세요.')
        return
      }

      var updated = confirm('해당 항목을 수정하시겠습니까?')
      if (updated === true) {
        this.table.data[this.userData.index].residentialUsage = this.userData.residentialUsage
        this.table.data[this.userData.index].residentialRates = this.userData.residentialRates
        this.table.data[this.userData.index].IndustrialUsage = this.userData.IndustrialUsage
        this.table.data[this.userData.index].IndustrialRates = this.userData.IndustrialRates
        this.table.data[this.userData.index].streetLampUsage = this.userData.streetLampUsage
        this.table.data[this.userData.index].streetLampRates = this.userData.streetLampRates

        alert('수정되었습니다.')
        this.$refs.closeModal.click()
      }
    },
    clickDelete () {
      var deleted = confirm('해당 항목을 삭제하시겠습니까?')
      if (deleted === true) {
        var nowindex = this.userData.index

        this.table.data.splice(this.userData.index, 1)

        var arr = []
        for (;nowindex < this.table.data.length; nowindex++) {
          arr.push(nowindex)

          this.table.data[nowindex].no = nowindex + 1
        }
        alert('삭제되었습니다.')
        this.$refs.closeModal.click()
        let tableLen = this.table.data.length

        this.activeOn1 = ''
        this.activeOn2 = ''
        this.activeOn3 = ''
        this.activeOn4 = ''
        this.activeOn5 = ''

        if (this.pageNum !== 0) {
          let paging = 1
          if (tableLen > 10) {
            paging = tableLen / 10
            paging = parseInt(paging)
            paging += 1
            if (paging > 5) {
              paging = paging % 5
            }
          }

          let pageNum = 0
          if (tableLen > 10) {
            tableLen = tableLen / 10
            tableLen = parseInt(tableLen)
            pageNum += tableLen
          }

          this.pageNum = pageNum
          this.startIndex = this.pageNum * this.pageSize
          this.endIndex = this.startIndex + this.pageSize

          if (paging === 1) {
            this.activeOn1 = 'active'
          } else if (paging === 2) {
            this.activeOn2 = 'active'
          } else if (paging === 3) {
            this.activeOn3 = 'active'
          } else if (paging === 4) {
            this.activeOn4 = 'active'
          } else {
            this.activeOn5 = 'active'
          }
        } else {
          this.activeOn1 = 'active'
        }
      }
    }
  },
  computed: {
    pageCount () {
      const listLeng = this.table.data.length
      const listSize = this.pageSize
      let page = Math.floor(listLeng / listSize)
      if (listLeng % listSize > 0) page += 1
      return page
    },
    paginatedData () {
      const start = this.pageNum * this.pageSize
      const end = start + this.pageSize
      return this.table.data.slice(start, end)
    }
  }
}
</script>

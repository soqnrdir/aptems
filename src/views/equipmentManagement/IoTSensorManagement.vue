<template>
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h5 class="fw-bold text-start">IoT센서관리</h5>
      <div class="card mt-5">
        <div class="card-body">
          <div class="row">
        <div class="text-end">
          <button type="button" class="btn btn-info btn-fill text-white" data-bs-toggle="modal" data-bs-target="#userUpdateModal" @click="userPopR">
            IoT센서등록
          </button>
        </div>
      </div>
          <div class="row">
              <table class="table">
                <colgroup>
                  <col width = "13%">
                  <col width = "13%">
                  <col width = "13%">
                  <col width = "13%">
                  <col width = "13%">
                  <col />
                </colgroup>
                  <thead>
                      <tr>
                      <th v-for="column in table.columns" :key="column">{{column}}</th>
                      </tr>
                  </thead>
                  <tbody v-if="table.data.length != 0">
                    <tr v-for="(item, index) in paginatedData" :key="index" >
                      <td>{{item.controlNo}}</td>
                      <td style="color:#00BFFF;cursor:pointer" data-bs-toggle="modal" data-bs-target="#userUpdateModal" @click="userPopU(item, index)">{{item.instrumentNm}}</td>
                      <td>{{item.deviceAdd}}</td>
                      <td>{{item.regDate}}</td>
                      <td>{{item.modelNm}}</td>
                      <td>{{item.communicationStatus}}</td>
                      <td>{{item.measurementTarget}}</td>
                    </tr>
                  </tbody>
                  <tbody v-if="table.data.length == 0">
                    <tr>
                      <td colspan="8">데이터가 존재하지 않습니다.</td>
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
                  <h5 class="modal-title fw-bold" id="userUpdateModalLabel">사용자 {{userPopTitle}}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-start">
                <form>
                  <div class="mb-3">
                      <label for="id-text" class="col-form-label">관리번호:</label>
                      <input type="text" class="form-control" v-model="userData.controlNo" id="id-text">
                  </div>
                  <div class="mb-3">
                      <label for="name-text" class="col-form-label">계측기명:</label>
                      <input type="text" class="form-control" v-model="userData.instrumentNm" id="name-text">
                  </div>
                  <div class="mb-3">
                      <label for="company-text" class="col-form-label">장치주소:</label>
                      <input type="text" class="form-control" v-model="userData.deviceAdd" id="company-text">
                  </div>
                  <div class="mb-3">
                      <label for="telephone-text" class="col-form-label">모델명:</label>
                      <input type="text" class="form-control" v-model="userData.modelNm" id="telephone-text">
                  </div>
                  <div class="mb-3">
                      <label for="telephone-text" class="col-form-label">통신상태:</label>
                      <input type="text" class="form-control" v-model="userData.communicationStatus" id="telephone-text">
                  </div>
                  <div class="mb-3">
                      <label for="telephone-text" class="col-form-label">설치장소:</label>
                      <input type="text" class="form-control" v-model="userData.emplacement" id="telephone-text">
                  </div>
                  <div class="mb-3">
                      <label for="auth-text" class="col-form-label">계측대상:</label>
                      <select class="form-select" v-model="userData.measurementTarget" id="auth-text">
                        <option selected value="지하주차장 조명">지하주차장 조명</option>
                        <option value="엘리베이터 조명">엘리베이터 조명</option>
                      </select>
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
const tableColumns = ['관리번호', '계측기명', '장치주소', '설치날짜', '모델명', '통신상태', '계측대상']
const tableData = [{
  controlNo: 'A-001',
  instrumentNm: '광선계측기',
  deviceAdd: '1.234.567.89',
  regDate: '2021-05-28',
  modelNm: 'KDX-200',
  communicationStatus: '정상',
  emplacement: '지하주차장',
  measurementTarget: '지하주차장 조명'
},
{
  controlNo: 'A-002',
  instrumentNm: '광선계측기',
  deviceAdd: '1.234.567.89',
  regDate: '2021-05-28',
  modelNm: 'KDX-200',
  communicationStatus: '정상',
  emplacement: '지하주차장',
  measurementTarget: '지하주차장 조명'
},
{
  controlNo: 'A-003',
  instrumentNm: '광선계측기',
  deviceAdd: '1.234.567.89',
  regDate: '2021-05-28',
  modelNm: 'KDX-200',
  communicationStatus: '정상',
  emplacement: '지하주차장',
  measurementTarget: '지하주차장 조명'
},
{
  controlNo: 'A-004',
  instrumentNm: '광선계측기',
  deviceAdd: '1.234.567.89',
  regDate: '2021-05-28',
  modelNm: 'KDX-200',
  communicationStatus: '정상',
  emplacement: '지하주차장',
  measurementTarget: '지하주차장 조명'
},
{
  controlNo: 'A-005',
  instrumentNm: '광선계측기',
  deviceAdd: '1.234.567.89',
  regDate: '2021-05-28',
  modelNm: 'KDX-200',
  communicationStatus: '정상',
  emplacement: '지하주차장',
  measurementTarget: '지하주차장 조명'
},
{
  controlNo: 'A-006',
  instrumentNm: '광선계측기',
  deviceAdd: '1.234.567.89',
  regDate: '2021-05-28',
  modelNm: 'KDX-200',
  communicationStatus: '정상',
  emplacement: '지하주차장',
  measurementTarget: '지하주차장 조명'
},
{
  controlNo: 'A-007',
  instrumentNm: '광선계측기',
  deviceAdd: '1.234.567.89',
  regDate: '2021-05-28',
  modelNm: 'KDX-200',
  communicationStatus: '정상',
  emplacement: '지하주차장',
  measurementTarget: '지하주차장 조명'
},
{
  controlNo: 'A-008',
  instrumentNm: '광선계측기',
  deviceAdd: '1.234.567.89',
  regDate: '2021-05-28',
  modelNm: 'KDX-200',
  communicationStatus: '정상',
  emplacement: '지하주차장',
  measurementTarget: '지하주차장 조명'
},
{
  controlNo: 'A-009',
  instrumentNm: '광선계측기',
  deviceAdd: '1.234.567.89',
  regDate: '2021-05-28',
  modelNm: 'KDX-200',
  communicationStatus: '정상',
  emplacement: '지하주차장',
  measurementTarget: '지하주차장 조명'
},
{
  controlNo: 'A-010',
  instrumentNm: '광선계측기',
  deviceAdd: '1.234.567.89',
  regDate: '2021-05-28',
  modelNm: 'KDX-200',
  communicationStatus: '정상',
  emplacement: '지하주차장',
  measurementTarget: '지하주차장 조명'
},
{
  controlNo: 'A-011',
  instrumentNm: '광선계측기',
  deviceAdd: '1.234.567.89',
  regDate: '2021-05-28',
  modelNm: 'KDX-200',
  communicationStatus: '정상',
  emplacement: '지하주차장',
  measurementTarget: '지하주차장 조명'
}]

export default {
  data () {
    return {
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
        controlNo: '',
        instrumentNm: '',
        deviceAdd: '',
        modelNm: '',
        communicationStatus: '',
        emplacement: '',
        measurementTarget: ''
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

      this.userData.controlNo = ''
      this.userData.instrumentNm = ''
      this.userData.deviceAdd = ''
      this.userData.modelNm = ''
      this.userData.communicationStatus = ''
      this.userData.emplacement = ''
      this.userData.measurementTarget = '지하주차장 조명'
    },
    userPopU (item, index) {
      this.userPopTitle = '수정'
      this.validated = 1
      this.userPopUorR = false

      index = this.startIndex + index
      this.userData.index = index
      this.userData.controlNo = item.controlNo
      this.userData.instrumentNm = item.instrumentNm
      this.userData.deviceAdd = item.deviceAdd
      this.userData.modelNm = item.modelNm
      this.userData.communicationStatus = item.communicationStatus
      this.userData.emplacement = item.emplacement
      this.userData.measurementTarget = item.measurementTarget
    },
    clickInsert () {
      if (this.userData.controlNo == null || this.userData.controlNo === '') {
        alert('관리번호를 입력해주세요.')
        return
      }
      if (this.userData.instrumentNm == null || this.userData.instrumentNm === '') {
        alert('계측기명을 입력해주세요.')
        return
      }
      if (this.userData.deviceAdd == null || this.userData.deviceAdd === '') {
        alert('장치주소를 입력해주세요.')
        return
      }
      if (this.userData.modelNm == null || this.userData.modelNm === '') {
        alert('모델명을 입력해주세요.')
        return
      }
      if (this.userData.communicationStatus == null || this.userData.communicationStatus === '') {
        alert('통신장치를 입력해주세요.')
        return
      }
      if (this.userData.emplacement == null || this.userData.emplacement === '') {
        alert('설치장소를 입력해주세요.')
        return
      }

      var inserted = confirm('해당 항목을 등록하시겠습니까?')
      if (inserted === true) {
        const today = new Date()
        const year = today.getFullYear() // 년도
        let month = today.getMonth() + 1 // 월
        if (month < 10) month = '0' + month
        let date = today.getDate() // 날짜
        if (date < 10) date = '0' + date

        const nowsday = year + '-' + month + '-' + date

        this.table.data.push({
          controlNo: this.userData.controlNo,
          instrumentNm: this.userData.instrumentNm,
          deviceAdd: this.userData.deviceAdd,
          regDate: nowsday,
          modelNm: this.userData.modelNm,
          communicationStatus: this.userData.communicationStatus,
          emplacement: this.userData.emplacement,
          measurementTarget: this.userData.measurementTarget
        })
        alert('등록되었습니다.')
        this.$refs.closeModal.click()
      }
    },
    clickUpdate () {
      if (this.userData.controlNo == null || this.userData.controlNo === '') {
        alert('관리번호를 입력해주세요.')
        return
      }
      if (this.userData.instrumentNm == null || this.userData.instrumentNm === '') {
        alert('계측기명을 입력해주세요.')
        return
      }
      if (this.userData.deviceAdd == null || this.userData.deviceAdd === '') {
        alert('장치주소를 입력해주세요.')
        return
      }
      if (this.userData.modelNm == null || this.userData.modelNm === '') {
        alert('모델명을 입력해주세요.')
        return
      }
      if (this.userData.communicationStatus == null || this.userData.communicationStatus === '') {
        alert('통신장치를 입력해주세요.')
        return
      }
      if (this.userData.emplacement == null || this.userData.emplacement === '') {
        alert('설치장소를 입력해주세요.')
        return
      }

      var updated = confirm('해당 항목을 수정하시겠습니까?')
      if (updated === true) {
        this.table.data[this.userData.index].controlNo = this.userData.controlNo
        this.table.data[this.userData.index].instrumentNm = this.userData.instrumentNm
        this.table.data[this.userData.index].deviceAdd = this.userData.deviceAdd
        this.table.data[this.userData.index].modelNm = this.userData.modelNm
        this.table.data[this.userData.index].communicationStatus = this.userData.communicationStatus
        this.table.data[this.userData.index].emplacement = this.userData.emplacement
        this.table.data[this.userData.index].measurementTarget = this.userData.measurementTarget

        alert('수정되었습니다.')
        this.$refs.closeModal.click()
      }
    },
    clickDelete () {
      var deleted = confirm('해당 항목을 삭제하시겠습니까?')
      if (deleted === true) {
        this.table.data.splice(this.userData.index, 1)

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

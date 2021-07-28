<template>
<div class="container" @mousedown="closeToast">
  <div class="row">
    <div class="col-md-12">
      <h5 class="fw-bold text-start">설비 관리</h5>
      <div class="card mt-5">
        <div class="card-body">
          <div class="row">
            <div class="text-end">
              <button type="button" class="btn btn-info btn-fill text-white" data-bs-toggle="modal" data-bs-target="#userUpdateModal" @click="userPopR">
                설비등록
              </button>
            </div>
          </div>
          <div class="row mt-3">
            <table class="table">
              <colgroup>
                <col width = "18%">
                <col width = "18%">
                <col width = "18%">
                <col width = "18%">
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
                  <td style="color:#00BFFF;cursor:pointer" data-bs-toggle="modal" data-bs-target="#userUpdateModal" @click="userPopU(item, index)">{{item.equipmentNm}}</td>
                  <td>{{item.emplacement}}</td>
                  <td>{{item.regDate}}</td>
                  <td>{{item.etc}}</td>
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
              <h5 class="modal-title fw-bold" id="userUpdateModalLabel">설비 {{userPopTitle}}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form class="row g-3 needs-validation" novalidate @submit="clickSubmit" onsubmit="return false">
              <div class="modal-body text-start">
                <div class="mb-3">
                    <label for="controlNo-text" class="col-form-label">관리번호:</label>
                    <input type="text" class="form-control" v-model="userData.controlNo" id="controlNo-text" required autocomplete="off">
                    <div class="invalid-feedback">
                      관리번호를 입력해주세요.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="equipmentNm-text" class="col-form-label">설비명:</label>
                    <input type="text" class="form-control" v-model="userData.equipmentNm" id="equipmentNm-text" required autocomplete="off">
                    <div class="invalid-feedback">
                      설비명을 입력해주세요.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="emplacement-text" class="col-form-label">설비위치:</label>
                    <input type="text" class="form-control" v-model="userData.emplacement" id="emplacement-text" required autocomplete="off">
                    <div class="invalid-feedback">
                      설비위치를 입력해주세요.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="etc-text" class="col-form-label">비고:</label>
                    <input type="text" class="form-control" v-model="userData.etc" id="etc-text" autocomplete="off">
                </div>
                <div class="modal-footer">
                    <button v-show="userPopUorR == false" type="button" @click="clickDelete" class="btn btn-danger">삭제</button>
                    <button v-if="userPopUorR == true" type="submit" class="btn btn-primary">등록</button>
                    <button v-else type="submit" class="btn btn-primary">수정</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="closeModal">닫기</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="toast-container position-absolute top-0 end-0 p-3">
          <div class="toast" :class="display2" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <strong class="me-auto">설비 삭제</strong>
              <button type="button" class="btn-close" @click="closeDelete" ></button>
            </div>
            <div class="toast-body text-start">
              삭제하시겠습니까?
            </div>
            <div class="text-end">
              <button  type="button" class="btn btn-danger mb-2" @click="deleteToast">확인</button>
              <button type="button" class="btn btn-secondary ms-2 mb-2 me-2" @click="closeDelete">닫기</button>
            </div>
          </div>
        </div>
      </div>
      <div class="toast-container position-absolute top-0 end-0 p-3">
        <div class="toast" :class="display" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <strong class="me-auto">설비 {{toastStats}}</strong>
            <button type="button" class="btn-close" @click="closeToast" ></button>
          </div>
          <div class="toast-body text-start">
            {{toastStats}}되었습니다.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
const tableColumns = ['관리번호', '설비명', '설치위치', '등록일', '비고']
const tableData = [{
  controlNo: 'P001',
  equipmentNm: '지하주차장 조명',
  emplacement: '지하주차장 분전반A-1',
  regDate: '2021-05-28',
  etc: '내용'
},
{
  controlNo: 'P002',
  equipmentNm: '지하주차장 조명',
  emplacement: '지하주차장 분전반A-1',
  regDate: '2021-05-28',
  etc: '내용'
},
{
  controlNo: 'P003',
  equipmentNm: '지하주차장 조명',
  emplacement: '지하주차장 분전반A-1',
  regDate: '2021-05-28',
  etc: '내용'
},
{
  controlNo: 'P004',
  equipmentNm: '지하주차장 조명',
  emplacement: '지하주차장 분전반A-1',
  regDate: '2021-05-28',
  etc: '내용'
},
{
  controlNo: 'P005',
  equipmentNm: '지하주차장 조명',
  emplacement: '지하주차장 분전반A-1',
  regDate: '2021-05-28',
  etc: '내용'
},
{
  controlNo: 'P006',
  equipmentNm: '지하주차장 조명',
  emplacement: '지하주차장 분전반A-1',
  regDate: '2021-05-28',
  etc: '내용'
},
{
  controlNo: 'P007',
  equipmentNm: '지하주차장 조명',
  emplacement: '지하주차장 분전반A-1',
  regDate: '2021-05-28',
  etc: '내용'
},
{
  controlNo: 'P008',
  equipmentNm: '지하주차장 조명',
  emplacement: '지하주차장 분전반A-1',
  regDate: '2021-05-28',
  etc: '내용'
},
{
  controlNo: 'P009',
  equipmentNm: '지하주차장 조명',
  emplacement: '지하주차장 분전반A-1',
  regDate: '2021-05-28',
  etc: '내용'
},
{
  controlNo: 'P010',
  equipmentNm: '지하주차장 조명',
  emplacement: '지하주차장 분전반A-1',
  regDate: '2021-05-28',
  etc: '내용'
},
{
  controlNo: 'P011',
  equipmentNm: '지하주차장 조명',
  emplacement: '지하주차장 분전반A-1',
  regDate: '2021-05-28',
  etc: '내용'
},
{
  controlNo: 'P012',
  equipmentNm: '지하주차장 조명',
  emplacement: '지하주차장 분전반A-1',
  regDate: '2021-05-28',
  etc: '내용'
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
      toastStats: '',
      display: 'hide',
      display2: 'hide',
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
        equipmentNm: '',
        emplacement: '',
        etc: ''
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
    closeDelete () {
      this.display2 = 'hide'
    },
    closeToast () {
      this.display = 'hide'
    },
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
      var forms = document.querySelectorAll('.needs-validation')
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.classList.remove('was-validated')
        })

      this.userPopTitle = '등록'
      this.validated = 1
      this.userPopUorR = true
      this.display2 = 'hide'

      this.userData.controlNo = ''
      this.userData.equipmentNm = ''
      this.userData.emplacement = ''
      this.userData.etc = ''
    },
    userPopU (item, index) {
      var forms = document.querySelectorAll('.needs-validation')
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.classList.remove('was-validated')
        })

      this.userPopTitle = '수정'
      this.validated = 1
      this.userPopUorR = false
      this.display2 = 'hide'

      index = this.startIndex + index
      this.userData.index = index
      this.userData.controlNo = item.controlNo
      this.userData.equipmentNm = item.equipmentNm
      this.userData.emplacement = item.emplacement
      this.userData.etc = item.etc
    },
    clickSubmit () {
      if (this.userData.controlNo !== '' && this.userData.equipmentNm !== '' && this.userData.emplacement !== '') {
        if (this.userPopTitle === '등록') {
          this.toastStats = '등록'
          this.clickInsert()
        } else {
          this.toastStats = '수정'
          this.clickUpdate()
        }
      }
    },
    clickInsert () {
      const moment = require('moment')
      const today = moment()

      const nowsday = today.format('YYYY-MM-DD')

      this.table.data.push({
        controlNo: this.userData.controlNo,
        equipmentNm: this.userData.equipmentNm,
        emplacement: this.userData.emplacement,
        regDate: nowsday,
        etc: this.userData.etc
      })
      this.display = 'show'
      this.$refs.closeModal.click()
    },
    clickUpdate () {
      this.table.data[this.userData.index].controlNo = this.userData.controlNo
      this.table.data[this.userData.index].equipmentNm = this.userData.equipmentNm
      this.table.data[this.userData.index].emplacement = this.userData.emplacement
      this.table.data[this.userData.index].etc = this.userData.etc

      this.display = 'show'
      this.$refs.closeModal.click()
    },
    clickDelete () {
      this.toastStats = '삭제'
      this.display2 = 'show'
    },
    deleteToast () {
      this.display2 = 'hide'

      this.table.data.splice(this.userData.index, 1)

      this.display = 'show'
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
  },
  mounted () {
    // 이벤트는 한번만 등록
    var forms = document.querySelectorAll('.needs-validation')

    // array로 변환할 필요가 있을 경우
    Array.prototype.slice.call(forms)
    // 각 인수를 form으로 보는 반복문
      .forEach(function (form) {
        // 각 index를 submit 했을 때
        form.addEventListener('submit', function (event) {
          // 만약 채크가 되어있지 않다면
          if (!form.checkValidity()) {
            // submit 이벤트를 막고
            event.preventDefault()
            event.stopPropagation()
          }

          // 그 결과를 UI로 나타낸다.
          form.classList.add('was-validated')
          // 자식부터 부모로 이벤트가 전파되는 것을 버블링(bubbling)이라고 한다. => false일 경우
        }, false)
      })
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

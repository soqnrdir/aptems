<template>
<div class="container" @mousedown="closeToast">
  <div class="row">
    <div class="col-md-12">
      <h5 class="fw-bold text-start">사용자 관리</h5>
      <div class="card mt-5">
        <div class="card-body">
          <div class="row">
            <div class="text-end">
              <button type="button" class="btn btn-info btn-fill text-white" data-bs-toggle="modal" data-bs-target="#userUpdateModal" @click="userPopR">
                사용자등록
              </button>
            </div>
          </div>
          <div class="row mt-3">
            <table class="table">
              <thead>
                  <tr>
                  <th v-for="column in table.columns" :key="column">{{column}}</th>
                  </tr>
              </thead>
              <tbody v-if="table.data.length != 0">
                <tr v-for="(item, index) in paginatedData" :key="index" >
                  <td>{{item.no}}</td>
                  <td style="color:#00BFFF;cursor:pointer" data-bs-toggle="modal" data-bs-target="#userUpdateModal" @click="userPopU(item, index)">{{item.id}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.company}}</td>
                  <td>{{item.telephone}}</td>
                  <td>{{item.regDate}}</td>
                  <td>{{item.loginDate}}</td>
                  <td>{{item.auth}}</td>
                </tr>
              </tbody>
              <tbody v-if="table.data.length == 0">
                <tr>
                  <td colspan="8">데이터가 존재하지 않습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <div class="row">
              <div class="btn-cover text-end">
                  <button :disabled="pageNum === 0" @click="prevPage" class="btn btn-info btn-fill rounded-circle" style="margin-right:10px;zoom:0.8">
                  이전
                  </button>
                  <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
                  <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="btn btn-info btn-fill rounded-circle" style="margin-left:10px;zoom:0.8">
                  다음
                  </button>
              </div>
          </div> -->
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
            <form class="row g-3 needs-validation" novalidate @submit="clickSubmit" onsubmit="return false">
              <div class="modal-body text-start">
                <div class="mb-3">
                    <label for="id-text" class="col-form-label">아이디:</label>
                    <input type="text" class="form-control" v-model="userData.id" id="id-text" required autocomplete="off">
                    <div class="invalid-feedback">
                      아이디를 입력해주세요.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="name-text" class="col-form-label">이름:</label>
                    <input type="text" class="form-control" v-model="userData.name" id="name-text" required autocomplete="off">
                    <div class="invalid-feedback">
                      이름을 입력해주세요.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="company-text" class="col-form-label">소속:</label>
                    <input type="text" class="form-control" v-model="userData.company" id="company-text" required autocomplete="off">
                    <div class="invalid-feedback">
                      소속을 입력해주세요.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="telephone-text" class="col-form-label">전화:</label>
                    <input type="text" class="form-control" v-model="userData.telephone" id="telephone-text" required autocomplete="off">
                    <div class="invalid-feedback">
                      전화를 입력해주세요.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="auth-text" class="col-form-label">권한:</label>
                    <select class="form-select" v-model="userData.auth" id="auth-text">
                      <option selected value="관리자">관리자</option>
                      <option value="사용자">사용자</option>
                    </select>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <label for="passward-text" class="col-form-label">비밀번호:</label>
                    <div class="row">
                      <div class="col-8">
                        <input :disabled="validated == 1" v-model="password" type="text" class="form-control" id="passward-text" autocomplete="off">
                      </div>
                      <div class="form-check col-4">
                        <input class="form-check-input" type="checkbox" @click="pwCheck" id="flexCheckDefault" v-model="pwCheckRemove" >
                        <label class="form-check-label" for="flexCheckDefault">
                            비밀번호 설정
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                  <button v-show="userPopUorR == false" type="button" @click="clickDelete" class="btn btn-danger">삭제</button>
                  <button v-if="userPopUorR == true" type="submit"  class="btn btn-primary">등록</button>
                  <button v-else type="submit" class="btn btn-primary" >수정</button>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="closeModal">닫기</button>
              </div>
            </form>
          </div>
        </div>
        <div class="toast-container position-absolute top-0 end-0 p-3">
          <div class="toast" :class="display2" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <strong class="me-auto">사용자 삭제</strong>
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
            <strong class="me-auto">사용자 {{toastStats}}</strong>
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
const tableColumns = ['No', 'Id', '이름', '소속', '전화', '등록일', '최근로그인', '권한']
const tableData = [{
  no: 1,
  id: 'admin',
  name: '김관리',
  company: '씨그널',
  telephone: '010-2845-0641',
  regDate: '2021-05-28',
  loginDate: '2021-05-28 10:12:42',
  auth: '관리자'
},
{
  no: 2,
  id: 'user1',
  name: '곽동철',
  company: '철광산업',
  telephone: '010-1234-5678',
  regDate: '2021-05-28',
  loginDate: '2021-05-28 10:12:42',
  auth: '사용자'
},
{
  no: 3,
  id: 'user2',
  name: '이미나',
  company: '니드머니',
  telephone: '010-1234-5678',
  regDate: '2021-05-28',
  loginDate: '2021-05-28 10:12:42',
  auth: '사용자'
},
{
  no: 4,
  id: 'user3',
  name: '장돈필',
  company: '니드머니',
  telephone: '010-1234-5678',
  regDate: '2021-05-28',
  loginDate: '2021-05-28 10:12:42',
  auth: '사용자'
},
{
  no: 5,
  id: 'user4',
  name: '백진상',
  company: '니드머니',
  telephone: '010-1234-5678',
  regDate: '2021-05-28',
  loginDate: '2021-05-28 10:12:42',
  auth: '사용자'
},
{
  no: 6,
  id: 'user5',
  name: '김철수',
  company: '철광산업',
  telephone: '010-1234-5678',
  regDate: '2021-05-28',
  loginDate: '2021-05-28 10:12:42',
  auth: '사용자'
},
{
  no: 7,
  id: 'user6',
  name: '박영희',
  company: '씨그널',
  telephone: '010-1234-5678',
  regDate: '2021-05-28',
  loginDate: '2021-05-28 10:12:42',
  auth: '사용자'
},
{
  no: 8,
  id: 'user7',
  name: '홍길동',
  company: '히스토리',
  telephone: '010-1234-5678',
  regDate: '2021-05-28',
  loginDate: '2021-05-28 10:12:42',
  auth: '사용자'
},
{
  no: 9,
  id: 'user8',
  name: '이순신',
  company: '히스토리',
  telephone: '010-1234-5678',
  regDate: '2021-05-28',
  loginDate: '2021-05-28 10:12:42',
  auth: '사용자'
},
{
  no: 10,
  id: 'user9',
  name: '황광선',
  company: '히스토리',
  telephone: '010-1234-5678',
  regDate: '2021-05-28',
  loginDate: '2021-05-28 10:12:42',
  auth: '사용자'
},
{
  no: 11,
  id: 'user10',
  name: '조충범',
  company: '니드머니',
  telephone: '010-1234-5678',
  regDate: '2021-05-28',
  loginDate: '2021-05-28 10:12:42',
  auth: '사용자'
}]

export default {
  data () {
    return {
      toastStats: '',
      display: 'hide',
      display2: 'hide',
      password: '',
      pwCheckRemove: false,
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
        id: '',
        name: '',
        company: '',
        telephone: '',
        auth: ''
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
    // nextPage () {
    //   this.pageNum += 1
    //   this.startIndex = this.pageNum * this.pageSize
    //   this.endIndex = this.startIndex + this.pageSize
    // },
    // prevPage () {
    //   this.pageNum -= 1
    //   this.startIndex = this.pageNum * this.pageSize
    //   this.endIndex = this.startIndex + this.pageSize
    // },
    // 페이징은 추후에 다시 수정
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
        this.password = ''
        this.validated = 0
      } else {
        this.password = ''
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
      this.pwCheckRemove = false
      this.password = ''
      this.display2 = 'hide'

      this.userData.id = ''
      this.userData.name = ''
      this.userData.company = ''
      this.userData.telephone = ''
      this.userData.auth = '관리자'
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
      this.pwCheckRemove = false
      this.password = ''
      this.display2 = 'hide'

      index = this.startIndex + index
      this.userData.index = index
      this.userData.id = item.id
      this.userData.name = item.name
      this.userData.company = item.company
      this.userData.telephone = item.telephone
      this.userData.auth = item.auth
    },
    clickSubmit () {
      if (this.userData.id !== '' && this.userData.name !== '' && this.userData.company !== '' && this.userData.telephone !== '') {
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
      const nowstime = today.format('h:mm:ss')

      this.table.data.push({
        no: this.table.data.length + 1,
        id: this.userData.id,
        name: this.userData.name,
        company: this.userData.company,
        telephone: this.userData.telephone,
        regDate: nowsday,
        loginDate: nowsday + ' ' + nowstime,
        auth: this.userData.auth
      })
      this.display = 'show'
      this.$refs.closeModal.click()
    },
    clickUpdate () {
      this.table.data[this.userData.index].id = this.userData.id
      this.table.data[this.userData.index].name = this.userData.name
      this.table.data[this.userData.index].company = this.userData.company
      this.table.data[this.userData.index].telephone = this.userData.telephone
      this.table.data[this.userData.index].auth = this.userData.auth

      this.display = 'show'
      this.$refs.closeModal.click()
    },
    clickDelete () {
      this.toastStats = '삭제'
      this.display2 = 'show'
    },
    deleteToast () {
      this.display2 = 'hide'
      var nowindex = this.userData.index

      this.table.data.splice(this.userData.index, 1)

      var arr = []
      for (;nowindex < this.table.data.length; nowindex++) {
        arr.push(nowindex)

        this.table.data[nowindex].no = nowindex + 1

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

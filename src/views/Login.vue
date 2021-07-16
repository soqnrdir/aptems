<template>
<div class="container d-flex justify-content-center align-items-center" style="height:600px">
  <div class="card col-3 mt-5 text-start p-2 rounded">
    <div>
      <div class="card-header d-flex justify-content-evenly">
        <img style="width:60%" src="../img/mainLogo.png">
        <h5 class="card-title fw-bold mt-3 fs-2">로그인</h5>
      </div>
      <div class="card-body">
        <form>
          <div class="mb-3">
              <label for="id-text" class="col-form-label fw-bold ms-1">아이디</label>
              <input type="text" class="form-control" id="id-text" style="border-top:0px;border-left:0px;border-right:0px" placeholder="아이디를 입력해주세요">
          </div>
          <div class="mb-5">
            <label for="id-text" class="col-form-label fw-bold ms-1">비밀번호</label>
            <input type="text" class="form-control" id="id-text" style="border-top:0px;border-left:0px;border-right:0px" placeholder="비밀번호를 입력해주세요">
            <div class="d-flex justify-content-between mt-2 ms-1">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" @click="pwCheck" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                    아이디 저장
                </label>
              </div>
              <div class="fw-bold">
                <button type="button" class="border-0 bg-white" style="flex-basis:80px;" >아이디 찾기</button> /
                <button type="button" class="border-0 bg-white" style="flex-basis:80px;" >비밀번호 찾기</button>
              </div>
            </div>
          </div>
          <div>
             <button type="button" class="btn btn-dark col-12">
             로그인
          </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

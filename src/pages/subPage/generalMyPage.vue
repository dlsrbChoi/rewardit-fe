<template>
  <div class="mypage-home">
    <div class="main-title">
      <p>마이페이지</p>
    </div>
    <div class="tab-menu">
      <ul>
        <li class="active">이벤트 참여 내역</li>
        <li @click="$router.push('/mypage/qr-code')">
          QR 교환 및 내역 확인
        </li>
        <li @click="$router.push('/mypage/qr-code/use')">
          QR 사용
        </li>
      </ul>
    </div>
    <div class="remain-box">
      <p>요청가능 금액 : <span class="point">0</span> 원</p>
      <p>지급된 금액 : <span class="point">0</span> 원</p>
    </div>
    <div class="table">
      <table>
        <caption>
          마이페이지 테이블
        </caption>
        <colgroup>
          <col style="width: 30%; min-width: 120px" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th>광고종류</th>
            <td>회원가입 적립</td>
          </tr>
          <tr>
            <th>이벤트 명</th>
            <td>회원가입</td>
          </tr>
          <tr>
            <th>발생 포인트</th>
            <td>2,000</td>
          </tr>
          <tr>
            <th>승인일시</th>
            <td>2024-12-31</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

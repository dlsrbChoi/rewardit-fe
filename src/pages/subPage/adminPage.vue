<template>
  <div class="admin-home">
    <div class="main-title">
      <p>관리자페이지</p>
    </div>
    <div class="remain-box">
      <p>총 사장님 수 : <span class="point">0</span> 명</p>
      <p>총 회원 수 : <span class="point">0</span> 명</p>
      <p>지급 금액 : <span class="point">0</span> 명</p>
      <p>채굴 포인트 : <span class="point">0</span> 명</p>
    </div>
    <div class="table">
      <div class="table-top">
        <select>
          <option>1 월</option>
          <option>2 월</option>
        </select>
      </div>
      <table>
        <caption>
          관리자페이지 테이블
        </caption>
        <colgroup>
          <col style="width: 30%; min-width: 120px" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th>번호</th>
            <td>1</td>
          </tr>
          <tr>
            <th>가게명</th>
            <td>세븐 피시방</td>
          </tr>
          <tr>
            <th>이름</th>
            <td>김중건</td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>010-1234-5678</td>
          </tr>
          <tr>
            <th>누적금액</th>
            <td>10,000 원</td>
          </tr>
          <tr>
            <th>은행명</th>
            <td>농협</td>
          </tr>
          <tr>
            <th>계좌번호</th>
            <td></td>
          </tr>
          <tr>
            <th>등본<br />(확인여부)</th>
            <td>O</td>
          </tr>
          <tr>
            <th>지급 여부</th>
            <td>완료/미지급</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

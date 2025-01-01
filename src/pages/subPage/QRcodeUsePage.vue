<template>
  <div class="mypage-home">
    <div class="main-title">
      <p>마이페이지</p>
    </div>
    <div class="tab-menu">
      <ul>
        <li @click="$router.push('/mypage')">
          이벤트 참여 내역
        </li>
        <li @click="$router.push('/mypage/qr-code')">
          QR 교환 및 내역 확인
        </li>
        <li class="active">QR 사용</li>
      </ul>
    </div>
    <div class="remain-box">
      <p>요청가능 금액 : <span class="point">0</span> 원</p>
      <p>지급된 금액 : <span class="point">0</span> 원</p>
    </div>
    <div class="table">
      <table>
        <caption>
          QR 사용 테이블
        </caption>
        <colgroup>
          <col style="width: 30%; min-width: 120px" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th>잔여 포인트</th>
            <td>10,000</td>
          </tr>
          <tr>
            <th>교환 요청</th>
            <td>
              <input type="tel" class="middle" />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="table-bottom">
        <button type="button" class="button black">
          QR 교환 요청
        </button>
      </div>
    </div>
  </div>
</template>

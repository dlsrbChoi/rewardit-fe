<template>
  <div class="admin-home">
    <div class="main-title">
      <p>사장님페이지</p>
    </div>
    <div class="remain-box">
      <p>총 파트너 수 : <span class="point">0</span> 명</p>
      <p>지급 금액 : <span class="point">0</span> 명</p>
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
          사장님페이지 테이블
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
            <th>요청시간</th>
            <td>12-30 13:00</td>
          </tr>
          <tr>
            <th>요청회원명</th>
            <td>서하늘</td>
          </tr>
          <tr>
            <th>요청금액</th>
            <td>10,000</td>
          </tr>
          <tr>
            <th>승인대기</th>
            <td>
              대기중
              <button
                type="button"
                class="button black"
                @click="showModal"
              >
                승인하기
              </button>
            </td>
          </tr>
          <tr>
            <th>승인확인</th>
            <td>승인완료</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import openModal from '@/util/modalSetter';

export default {
  data() {
    return {};
  },

  methods: {
    showModal() {
      openModal(
        `승인하시겠습니까?`,
        'confirm',
        null,
        this.test,
        '취소',
        '승인',
      );
    },

    test() {
      console.log('승인');
    },
  },
};
</script>

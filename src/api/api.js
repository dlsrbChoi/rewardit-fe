import instance from ".";

export default {
  /* CAMPAIGN */
  // 캠페인 목록 조회
  getCampaignList(params) {
    return instance.get('/api/campaign', { params });
  },

  // 캠페인 참여 요청
  getCampaignJoin(params) {
    return instance.post('/api/campaign/participate', params);
  },

  /* MEMBER */
  // 구글 회원 존재 여부
  checkMember(params) {
    return instance.post('/api/member/google/exists', params)
  },

  // 구글 로그인
  googleLogin(params) {
    return instance.post('/api/member/google/login', params)
  },

  // refresh 토큰
  refreshToken() {
    return instance.get('/api/member/refresh');
  },

  // 회원 정보 조회
  getMemberInfo() {
    return instance.get('/api/member')
  },

  /* REWARD */
  // 리워드 기록 목록 조회
  getRewardHistory(params) {
    return instance.get('/api/reward', { params });
  },

  /* QR CODE */
  // 포인트 QR 코드 생성
  generateQrcode(params) {
    return instance.post('/api/qr/generate', params)
  },

  // 포인트 사용 QR 조회
  getQrcode(qrId) {
    return instance.get(`/api/qr/${qrId}`, {
      responseType: 'arraybuffer'
    });
  },

  // QR 사용 처리
  useQrcode(qrId) {
    return instance.post(`/api/qr/use/${qrId}`)
  },

  // QR 사용 목록 조회
  getQrcodeHistory(params) {
    return instance.get('/api/qr', { params })
  },

  /* SHOP */
  // 사업자 로그인
  loginBusiness(params) {
    return instance.post('/api/shop/login', params)
  },

  // QR 가맹점 연결
  useQRcodeWithBusiness(qrId) {
    return instance.post(`/api/shop/use-request/${qrId}`)
  },

  // QR 사용 요청 조회
  getQRcodeUseHistory(params) {
    return instance.get('/api/shop/use-request', { params })
  },


  /* ADMIN */
  // 관리자 로그인
  loginAdmin(params) {
    return instance.post('/api/admin/login', params)
  },

  // 조회
  getManageList(params) {
    return instance.get('/api/admin', { params })
  },

  // total 조회
  getTotalInfo() {
    return instance.get('/api/admin/total')
  },

  // 사업자 회원가입
  signupBusiness(params) {
    return instance.post('/api/shop', params)
  },

  // 월별 지급 등록
  applyAdjustment(params) {
    return instance.post('/api/admin/adjustment', params)
  },
};
function loginExpire() {
  sessionStorage.removeItem("login");
  sessionStorage.removeItem("userInfo");
  sessionStorage.removeItem("Authorization");
  alert("로그인 기간이 만료되었습니다.");
  window.location.href = '/';
}

export default loginExpire;
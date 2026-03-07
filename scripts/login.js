const userName = document.getElementById("user-name");
const password = document.getElementById("password");
const logingBtn = document.getElementById("login-btn");


logingBtn.addEventListener("click", function () {
  const logUserName = userName.value;
  const logPassword = password.value;
  if (logUserName === "admin" && logPassword === "admin123") {
    alert("success");
    window.location.assign("./home.html")
  } else {
    alert("login-failed");
    return;
  }
});
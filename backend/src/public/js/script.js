
const logout = async() => {
    await fetch("/api/users/logout", { method: "POST" });
    window.location.href = "/";
}

const quickLogin = async () => {
  document.getElementById("email").value = "admin@test"
  document.getElementById("password").value = "123"
}

const logout = async() => {
    await fetch("/api/users/logout", { method: "POST" });
    window.location.href = "/";
}

const quickLogin = async () => {
  document.getElementById("email").value = "admin@admin.com"
  document.getElementById("password").value = "admin123"
}

 window.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('header nav ul li a');
    const path = window.location.pathname;

    links.forEach(link => {
      if (link.getAttribute('href') === path) {
        link.classList.add('active');
      }
    });
  });
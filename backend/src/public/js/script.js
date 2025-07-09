
const logout = async() => {
    await fetch("/api/users/logout", { method: "POST" });
    window.location.href = "/";
}

const quickLogin = async () => {
  document.getElementById("email").value = "admin@admin.com"
  document.getElementById("password").value = "admin123"
}

const links = document.querySelectorAll('header nav ul li a');
const path = window.location.pathname;

links.forEach(link => {
  if (link.getAttribute('href') === path) {
    link.classList.add('active');
  }
});

const darkTheme = () => {
    const changeThemeCheck = document.getElementById('theme_dark');
    const changeThemeIcon = document.getElementById('theme_icon');

    const storageTheme = localStorage.getItem('tema') || 'light';
    applyTheme(storageTheme);

    changeThemeCheck.checked = storageTheme === 'dark';
    putIcon(storageTheme);

    changeThemeCheck.addEventListener('change', () => {
        const newTheme = changeThemeCheck.checked ? 'dark' : 'light';
        console.log(newTheme);
        
        applyTheme(newTheme);
    });

    function applyTheme(tema) {
        document.documentElement.setAttribute('data-theme', tema);
        localStorage.setItem('tema', tema);
        putIcon(tema);
    }

    function putIcon(tema) {
        changeThemeIcon.textContent = tema === 'dark' ? '☀️' : '🌙';
    }
};
window.addEventListener('DOMContentLoaded', () => {
    darkTheme();
});
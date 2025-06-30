
const logout = async() => {
    await fetch("/api/users/logout", { method: "POST" });
    window.location.href = "/admin";
}
const logoutBtn = document.getElementById("logout")
// Logs out the admin by removing the token, userId and role from local storage
logoutBtn.onclick = function(e){
    e.preventDefault();
    if(confirm("Are you sure you want to logout?")!=true){
        return;
    }
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("role")
    window.location.href = "/auth/login"
}
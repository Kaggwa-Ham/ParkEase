// ==============================
// ParkEase Login - Save User Info
// ==============================

document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault(); // Prevent form from reloading page

    // Get user inputs
    let userName = document.getElementById("userName").value.trim();
    let password = document.getElementById("password").value;

    // Fake authentication for demo
    // In production, check credentials on server
    let role = "attendant"; // or "admin" based on actual login
    
    // Example: set admin for special user
    if(userName === "admin") {
        role = "admin";
    }

    // Save user info to localStorage
    let user = {
        userName: userName,
        role: role
    };
    localStorage.setItem("ParkEaseUser", JSON.stringify(user));

    // Redirect to dashboard
    window.location.href = "signOut.html";
});
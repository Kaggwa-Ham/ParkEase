// ===============================
// PARKEASE LOGIN SYSTEM
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    let loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value;

        // Get all registered users
        let users = JSON.parse(localStorage.getItem("ParkEaseUsers")) || [];

        // Find matching user
        let matchedUser = null;

        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username && users[i].password === password) {
                matchedUser = users[i];
                break;
            }
        }

        // If no match found
        if (matchedUser === null) {
            alert("Invalid username or password");
            return;
        }

        // Save logged-in user session
        localStorage.setItem("ParkEaseUser", JSON.stringify(matchedUser));

        // Redirect based on role
        if (matchedUser.role === "admin") {
            window.location.href = "register.html";
        } else {
            window.location.href = "dashboard.html";
        }
    });

});
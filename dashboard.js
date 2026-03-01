
// ==============================
// ParkEase Dashboard - Fill User Info
// ==============================

document.addEventListener("DOMContentLoaded", function(){

    // Get logged-in user
    let user = JSON.parse(localStorage.getItem("ParkEaseUser"));

    if(!user){
        alert("Please login first!");
        window.location.href = "index.html";
        return;
    }

    // Fill read-only fields
    document.getElementById("receiverName").value = user.userName;
    document.getElementById("dashboardRole").value = user.role;

    // Optional: Show in console
    console.log("Logged in as:", user.userName, "| Role:", user.role);
});
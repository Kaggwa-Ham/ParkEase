document.getElementById("signOutForm").addEventListener("submit", function(event) {

    event.preventDefault();

    var receiverName = document.getElementById("receiverName").value;
    var receiptNumber = document.getElementById("receiptNumber").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var gender = document.getElementById("gender").value;
    var ninNumber = document.getElementById("ninNumber").value;
    var arrivalTime = document.getElementById("arrivalTime").value;

    var arrivalDate = new Date(arrivalTime);
    var currentDate = new Date();

    var difference = currentDate - arrivalDate;

    var hoursParked = difference / (1000 * 60 * 60);
    hoursParked = Math.ceil(hoursParked); 

    var ratePerHour = 2000;
    var totalAmount = hoursParked * ratePerHour;

    var receiptHTML =
        "<p><strong>Receiver:</strong> " + receiverName + "</p>" +
        "<p><strong>Receipt No:</strong> " + receiptNumber + "</p>" +
        "<p><strong>Phone:</strong> " + phoneNumber + "</p>" +
        "<p><strong>Gender:</strong> " + gender + "</p>" +
        "<p><strong>NIN:</strong> " + ninNumber + "</p>" +
        "<hr>" +
        "<p><strong>Time Parked:</strong> " + hoursParked + " hour(s)</p>" +
        "<p><strong>Rate:</strong> 2000 UGX per hour</p>" +
        "<h3>Total: " + totalAmount + " UGX</h3>";

    document.getElementById("receiptContent").innerHTML = receiptHTML;

});
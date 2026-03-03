document.getElementById("signOutForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let receiverName = document.getElementById("receiverName").value;
    let receiptNumber = document.getElementById("receiptNumber").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let gender = document.getElementById("gender").value;
    let ninNumber = document.getElementById("ninNumber").value;
    let arrivalTime = document.getElementById("arrivalTime").value;

    let arrivalDate = new Date(arrivalTime);
    let currentDate = new Date();

    let difference = currentDate - arrivalDate;

    let hoursParked = difference / (1000 * 60 * 60);
    hoursParked = Math.ceil(hoursParked); 

    let ratePerHour = 2000;
    let totalAmount = hoursParked * ratePerHour;

    let receiptHTML =
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
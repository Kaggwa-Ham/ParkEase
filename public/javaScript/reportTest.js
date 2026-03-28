var vehicles = [
    {
        plate: "UBD 123A",
        type: "Personal Car",
        timeIn: "08:00",
        status: "Signed Out",
        parkingFee: 4000,
        batteryHire: 0,
        tyreClinic: 2000
    },
    {
        plate: "UAM 456B",
        type: "Truck",
        timeIn: "09:30",
        status: "Parked",
        parkingFee: 6000,
        batteryHire: 3000,
        tyreClinic: 0
    }
];

function loadAdminDashboard() {

    var tableBody = document.getElementById("vehicleTableBody");

    var totalParking = 0;
    var totalBattery = 0;
    var totalTyre = 0;

    for (var i = 0; i < vehicles.length; i++) {

        var vehicle = vehicles[i];

        totalParking += vehicle.parkingFee;
        totalBattery += vehicle.batteryHire;
        totalTyre += vehicle.tyreClinic;

        var row = "<tr>" +
            "<td>" + vehicle.plate + "</td>" +
            "<td>" + vehicle.type + "</td>" +
            "<td>" + vehicle.timeIn + "</td>" +
            "<td>" + vehicle.status + "</td>" +
            "<td>" + vehicle.parkingFee + " UGX</td>" +
            "<td>" + vehicle.batteryHire + " UGX</td>" +
            "<td>" + vehicle.tyreClinic + " UGX</td>" +
            "</tr>";

        tableBody.innerHTML += row;
    }

    var grandTotal = totalParking + totalBattery + totalTyre;

    document.getElementById("parkingTotal").innerText = totalParking + " UGX";
    document.getElementById("batteryTotal").innerText = totalBattery + " UGX";
    document.getElementById("tyreTotal").innerText = totalTyre + " UGX";
    document.getElementById("grandTotal").innerText = grandTotal + " UGX";
}

loadAdminDashboard();
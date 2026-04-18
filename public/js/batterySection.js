let currentMode = "hire";

function switchTab(mode) {
    currentMode = mode;
    let buttons = document.getElementsByClassName("tab-btn");
    buttons[0].classList.remove("active");
    buttons[1].classList.remove("active");
    if (mode == "hire") {
        buttons[0].classList.add("active");
    } else {
        buttons[1].classList.add("active");
    }
    updatePrice();
}

function updatePrice() {

    // Get selected vehicle type
    let vehicle = document.getElementById("vehicleType").value;

    let price = 0;   // default price

    // If we are in HIRE mode
    if (currentMode == "hire") {

        if (vehicle == "car") {
            price = 30000;
        }
        else if (vehicle == "truck") {
            price = 50000;
        }
        else if (vehicle == "taxi") {
            price = 35000;
        }
        else if (vehicle == "boda") {
            price = 15000;
        }

    }

    // If we are in BUY mode
    else if (currentMode == "buy") {

        if (vehicle == "car") {
            price = 250000;
        }
        else if (vehicle == "truck") {
            price = 400000;
        }
        else if (vehicle == "taxi") {
            price = 270000;
        }
        else if (vehicle == "boda") {
            price = 120000;
        }

    }

    // Update the price display
    if (price > 0) {
        document.getElementById("priceDisplay").innerText = price + " UGX";
        document.getElementById("finalFee").value = price + " UGX";
    } else {
        document.getElementById("priceDisplay").innerText = "0 UGX";
        document.getElementById("finalFee").value = "";
    }
}
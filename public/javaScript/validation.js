//I am going to write Validation for the regisstration page

let form = document.getElementById("registrationForm")
let driverName = document.getElementById("driverName");
let numberPlate = document.getElementById("numberPlate");
let vehicleModel = document.getElementById("vehicleModel");
let arrivalTime = document.getElementById("arrivalTime");
let phoneNumber = document.getElementById("phoneNumber");
let ninNumber = document.getElementById("ninNumber");
let message = document.getElementById("message");
let message1 = document.getElementById("message1");
let message2 = document.getElementById("message2");
let message3 = document.getElementById("message2");
let message4 = document.getElementById("message2");
let message5 = document.getElementById("message2");
let message6 = document.getElementById("message2");
let message7 = document.getElementById("message2");

form.addEventListener("submit", function(event) {
    event.preventDefault()

    let numberPlateRegex = /^([A-Z]{3})(\s)(\d{3})([A-Z])$/;
    let phoneNumberRegex = /^(?:\+256|0)7\d{8}$/
    let ninNumberRegex = /^[CF][MF]\d{5}[A-Z0-9]{7}$/;

    message.textContent="";
    message1.textContent="";
    message2.textContent="";
    message3.textContent="";
    message4.textContent="";
    message5.textContent="";
    message6.textContent="";
    message7.textContent="";
    
    
    let numberPlateInput = numberPlate.value.trim();
    if (!numberPlateRegex.test(numberPlateInput)){
        message1.textContent = "Enter valid plate number";
        message1.style.color = "red";
        return
    }

    let phoneNumberInput = phoneNumber.value.trim();
    if (!phoneNumberRegex.test(phoneNumberInput)){
        message1.textContent = "Enter valid Phone number";
        message1.className = "error";
        return
    }
    let ninNumberInput = ninNumber.value.trim();
    if(!ninNumberRegex.test(ninNumberInput)) {
        message1.textContent = "Enter valid Phone number";
        message1.className = "error";
        return
    }
    
    message2.textContent = "Plate number is valid";
    message2.className = "success";
})


//Testing smthg

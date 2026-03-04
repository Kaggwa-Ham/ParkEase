//I am going to write Validation for the regisstration page

let form = document.getElementById("registrationForm")
let driverName = document.getElementById("driverName");
let numberPlate = document.getElementById("numberPlate");
let vehicleModel = document.getElementById("vehicleModel");
let arrivalTime = document.getElementById("arrivalTime");
let phoneNumber = document.getElementById("phoneNumber");
let ninNumber = document.getElementById("ninNumber");
let message = document.getElementById("message");

form.addEventListener("submit", function(event) {
    event.preventDefault()
    let numberPlateRegex = /^([A-Z]{3})(\s)(\d{3})([A-Z])$/;
    let phoneNumberRegex = /^(?:\+256|0)7\d{8}$/
    let ninNumberRegex = /^[CF][MF]\d{5}[A-Z0-9]{7}$/;

    message.textContent="";
    let numberPlateInput = numberPlate.value.trim();
    
    if (driverName === "Tendani") {
        message.textContent = "Intruderrrrrrrrr, run for your life";
    } 
    else {
        message.textContent = "Welcome the king of 67";
    }
    
    // if (!numberPlateRegex.test(numberPlateInput)){
    //     message.textContent = "Enter valid plate number";
    //     message.style.color = "red";
    //     return
    // }
    
    // message.textContent = "Plate number is valid";
    // message.style.color = "green";
})


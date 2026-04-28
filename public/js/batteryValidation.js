
const form = document.getElementById("batteryForm");
const resultDiv = document.getElementById("resultMessage");

const platePattern = /^[A-Z]{3}\s\d{3}[A-Z]$/;
const namePattern = /^[a-zA-Z]+ [a-zA-Z]+/;
const phonePattern = /^(?:\+256|0)7\d{8}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const ninRegex = /^(CM|CF)[0-9]{2}[A-Z0-9]{10}$/;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const batteryType = document.getElementById("batteryType").value
    const batterySize = document.getElementById("batterySize").value
    const hire = document.getElementById("hire").value
    const sale = document.getElementById("sale").value

    resultDiv.innerHTML = "";
    resultDiv.classList.remove("validationError");

    function Error(message) {
        resultDiv.classList.add("validationError");
        resultDiv.innerHTML = `<p>${message}</p>`;
    }

    if (!batteryType) {
        Error("Please select the battery type.");
        return;
    }

    if (!batterySize) {
        Error("Please select the battery size.");
        return;
    }

    if (!hire) {
        Error("Please enter the hire price.");
        return;
    }

    if (!sale) {
        Error("Please enter the sale price.");
        return;
    }

    form.submit();
});
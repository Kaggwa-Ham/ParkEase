
const form = document.getElementById("batteryTransaction");
const resultDiv = document.getElementById("resultMessage");

const platePattern = /^[A-Z]{3}\s\d{3}[A-Z]$/;
const namePattern = /^[a-zA-Z]+ [a-zA-Z]+/;
const phonePattern = /^(?:\+256|0)7\d{8}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const ninRegex = /^(CM|CF)[0-9]{2}[A-Z0-9]{10}$/;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const transactionType = document.getElementById("transactionType").value.trim();
  const numberPlate = document.getElementById("numberPlate").value.trim();
  const price = document.getElementById("price").value.trim();
  const name = document.getElementById("name").value.trim()
  const phoneNumber = document.getElementById("phoneNumber").value;

  resultDiv.innerHTML = "";
  resultDiv.classList.remove("validationError");

  function Error(message) {
    resultDiv.classList.add("validationError");
    resultDiv.innerHTML = `<p>${message}</p>`;
  }

  if (!transactionType) {
    Error("Please select the transaction type.");
    return;
  }
  if (!platePattern.test(numberPlate)) {
    Error("Please enter a valid Number plate.");
    return;
  }

  if (!price) {
    Error("Please enter the price.");
    return;
  }

  if (!namePattern.test(name)) {
    Error("Please enter your full name.");
    return;
  }
  
  if (!phonePattern.test(phoneNumber)) {
    Error(" Invalid Number Use: 07XXXXXXXX or +2567XXXXXXXX");
    return;
  }

  

  if (!platePattern.test(plate)) {
    Error(" Invalid number plate. Use: UAA 123A");
    return;
  }

  form.submit();
});
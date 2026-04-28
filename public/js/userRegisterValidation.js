
const form = document.getElementById("userForm");
const resultDiv = document.getElementById("resultMessage");

const platePattern = /^[A-Z]{3}\s\d{3}[A-Z]$/;
const firstNamePattern = /^[a-zA-Z]+/;
const secondNamePattern = /^[a-zA-Z]+/;
const phonePattern = /^(?:\+256|0)7\d{8}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const ninRegex = /^(CM|CF)[0-9]{2}[A-Z0-9]{10}$/;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  //const plate = document.getElementById("numberPlate").value.trim().toUpperCase();
  const firstName = document.getElementById("firstName").value.trim();
  const secondName = document.getElementById("secondName").value.trim();
  const phone = document.getElementById("phoneNumber").value.trim();
  const ninNumber = document.getElementById("ninNumber").value.trim().toUpperCase();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  resultDiv.innerHTML = "";
  resultDiv.classList.remove("validationError");

  function Error(message) {
    resultDiv.classList.add("validationError");
    resultDiv.innerHTML = `<p>${message}</p>`;
  }

  if (!firstNamePattern.test(firstName)) {
    Error("Please enter your first name.");
    return;
  }

  if (!secondNamePattern.test(secondName)) {
    Error("Please enter your second name.");
    return;
  }
  
if (!emailPattern.test(email)) {
    Error("Please enter a valid email address");
    return;
  }

  if (!phonePattern.test(phone)) {
    Error(" Invalid Number Use: 07XXXXXXXX or +2567XXXXXXXX");
    return;
  }

  if (!ninRegex.test(ninNumber)) {
    Error(" Invalid NIN Number");
    return;
  }

  if (!passwordPattern.test(password)) {
    Error("Your Password should be 8 characters long");
    return;
  }

  form.submit();
});

const form = document.getElementById("loginForm");
const resultDiv = document.getElementById("resultMessage");

const platePattern = /^[A-Z]{3}\s\d{3}[A-Z]$/;
const namePattern = /^[a-zA-Z]+ [a-zA-Z]+/;
const phonePattern = /^(?:\+256|0)7\d{8}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const ninRegex = /^(CM|CF)[0-9]{2}[A-Z0-9]{10}$/;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
console.log("hi")
  resultDiv.innerHTML = "";
  resultDiv.classList.remove("validationError");

  function showError(message) {
    resultDiv.classList.add("validationError");
    resultDiv.innerHTML = `<p>${message}</p>`;
  }

  if (!emailPattern.test(email)) {
    showError(" Invalid email. Use: john@gmail.com");
    return;
  }

  if (!passwordPattern.test(password)) {
    showError("Please enter a strong password");
    return;
  }

  form.submit();
});
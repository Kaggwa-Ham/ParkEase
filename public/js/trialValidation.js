const form = document.getElementById("trialForm");
const resultDiv = document.getElementsByClassName("Name");


const firstNamePattern = /^[a-zA-Z]+/;
const lastNamePattern = /^[a-zA-Z]+/;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();

    // resultDiv.innerHTML = "";
    resultDiv.classList.remove("validationError");

    function Error() {
        resultDiv.classList.add("validationError");
        // resultDiv.innerHTML = `<p>${message}</p>`;
    }
    function Approved(message) {
        resultDiv.classList.add("validationAccept")
    }

    if (!firstNamePattern.test(firstName) && !lastNamePattern.test(lastName)) {
        Error();
        return;
    }

    // else {
    //     resultDiv.innerHTML = "<p>Validation successful! Submitting form...</p>";
    //     resultDiv.classList.add("validationError");
    // }

    form.submit();
});
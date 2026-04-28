const resultDiv = document.getElementById("resultMessage");

function copyReceipt(receiptNumber) {
    navigator.clipboard.writeText(receiptNumber);
    resultDiv.innerHTML = `<p> Receipt ${receiptNumber} successfully copied!</p>`;
    resultDiv.classList.add("validationError");

    setTimeout(() => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("validationError");
    }, 3000);
}
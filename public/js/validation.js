document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const vehicleTypeSelect = document.getElementById('vehicleType');
    const ninContainer = document.getElementById('ninContainer');
    const ninInput = document.getElementById('ninNumber');

    // Toggle NIN requirement based on vehicle type [cite: 93]
    vehicleTypeSelect.addEventListener('change', function () {
        if (this.value === 'Boda-boda') {
            ninContainer.style.display = 'block';
            ninInput.setAttribute('required', 'required');
        } else {
            ninContainer.style.display = 'none';
            ninInput.removeAttribute('required');
            ninInput.value = '';
            ninInput.classList.remove('is-invalid');
        }
    });
    // Form submission validation 
    form.addEventListener('submit', function (e) {
        let isValid = true;

        // Name Validation [cite: 115]
        const nameRegex = /^[A-Z][a-zA-Z\s]*$/;
        const driverName = document.getElementById('driverName');
        if (!nameRegex.test(driverName.value)) {
            driverName.classList.add('is-invalid');
            isValid = false;
        } else {
            driverName.classList.remove('is-invalid');
        }

        // Phone Validation
        const phoneRegex = /^(0|\+256)(7|4|3|2)[0-9]{8}$/;
        const phone = document.getElementById('phoneNumber');
        if (!phoneRegex.test(phone.value)) {
            phone.classList.add('is-invalid');
            isValid = false;
        } else {
            phone.classList.remove('is-invalid');
        }
        // Plate Validation 
        const plateRegex = /^U[A-Za-z]{2}\s?[0-9]{3}[A-Za-z]$/;
        const plate = document.getElementById('numberPlate');
        if (!plateRegex.test(plate.value)) {
            plate.classList.add('is-invalid');
            isValid = false;
        } else {
            plate.classList.remove('is-invalid');
        }

        // NIN Validation (If Boda-boda) [cite: 118]
        if (vehicleTypeSelect.value === 'Boda-boda') {
            const ninRegex = /^[A-Z0-9]{14}$/;
            if (!ninRegex.test(ninInput.value)) {
                ninInput.classList.add('is-invalid');
                isValid = false;
            } else {
                ninInput.classList.remove('is-invalid');
            }
        }

        if (!isValid) {
            e.preventDefault(); // Stop submission if validation fails
        }
    });
});



// Uganda number plate: 3 letters, 3 digits, 1 letter (e.g. UAA 123A)
const platePattern = /^[A-Z]{3}\d{3}[A-Z]$/;

// Owner name: at least two words, letters only
const namePattern = /^[a-zA-Z]+ [a-zA-Z]+/;

// Ugandan phone number
const phonePattern = /^(?:\+256|0)7\d{8}$/;

// Email format
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Strong password: uppercase, lowercase, number, 8+ chars
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


// ==========================
// GET FORM AND RESULT AREA
// ==========================

const form = document.getElementById("signInForm");
const resultDiv = document.getElementById("resultMessage");


// ==========================
// LISTEN FOR SUBMIT
// ==========================

form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get user inputs
  const plate = document.getElementById("numberPlate").value.trim().toUpperCase();
  const name = document.getElementById("ownerName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // ==========================
  // VALIDATION CHECKS
  // ==========================

  // Check each field individually so we can show specific error messages
  if (!platePattern.test(plate)) {
    showError("❌ Invalid number plate. Format should be like: UAA123A");
    return;
  }

  if (!namePattern.test(name)) {
    showError("❌ Please enter a full name (first and last name).");
    return;
  }

  if (!phonePattern.test(phone)) {
    showError("❌ Invalid phone number. Use format: 07XXXXXXXX or +2567XXXXXXXX");
    return;
  }

  if (!emailPattern.test(email)) {
    showError("❌ Invalid email address.");
    return;
  }

  if (!passwordPattern.test(password)) {
    showError("❌ Password must be 8+ characters with uppercase, lowercase, and a number.");
    return;
  }

  // ==========================
  // IF ALL VALID → SUBMIT
  // ==========================

  console.log("✅ All fields valid, submitting...");
  form.submit(); // actually submits the form to your Express route
});


// ==========================
// HELPER FUNCTION
// ==========================

function showError(message) {
  resultDiv.innerHTML = `
    <div class="alert alert-danger">
      ${message}
    </div>
  `;
  console.log("Validation failed:", message);
}

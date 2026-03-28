// In script.js, implement the core validation logic.
// Select all necessary DOM elements (form, inputs, error message spans).
//Form and input elements
const form = document.getElementById('registrationForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
//Error message spans
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Load saved username: On page load, check if a username is saved in localStorage. If so, pre-fill the username field.
window.addEventListener('DOMContentLoaded', () => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        usernameInput.value = savedUsername;
    }
});

// Real-time validation: Add input event listeners to each field.
usernameInput.addEventListener('input', validateUsername);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

// Check validity using the Constraint Validation API (inputElement.validity).
function validateUsername() {
    if (usernameInput.validity.valueMissing) {
        usernameError.textContent = 'Username is required.';
    } else if (usernameInput.validity.tooShort) {
        usernameError.textContent = 'Username must be at least 5 characters.';
    } else {
        usernameError.textContent = '';
    }
}

function validateEmail() {
    if (emailInput.validity.valueMissing) {
        emailError.textContent = 'Email is required.';
    } else if (emailInput.validity.typeMismatch) {
        emailError.textContent = 'Please enter a valid email address.';
    } else {
        emailError.textContent = '';
    }
}

function validatePassword() {
    if (passwordInput.validity.valueMissing) {
        passwordError.textContent = 'Password is required.';
    } else if (passwordInput.validity.tooShort) {
        passwordError.textContent = 'Password must be at least 8 characters.';
    } else if (passwordInput.validity.patternMismatch) {
        passwordError.textContent = 'Password must include uppercase, lowercase, and a number.';
    } else {
        passwordError.textContent = '';
    }
}



// For the “Confirm Password” field, explicitly check if it matches the “Password” field.
function validateConfirmPassword() {
    if (confirmPasswordInput.validity.valueMissing) {
        confirmPasswordError.textContent = 'Please confirm your password.';
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match.';
    } else {
        confirmPasswordError.textContent = '';
    }
}

// Display appropriate custom error messages in the corresponding <span> elements. Clear messages if valid.
// Form submission: Add a submit event listener to the form.
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Call event.preventDefault().

// Perform a final validation check on all fields.
    validateUsername();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

// If all fields are valid:
// Display a success message (e.g., an alert or update a status message on the page).
// Save the username to localStorage.
// Optionally, reset the form.
    if (form.checkValidity()) {
        alert('Registration successful!');
        localStorage.setItem('username', usernameInput.value);
        form.reset();
    }

// If any field is invalid, ensure error messages are displayed and focus on the first invalid field.
    else {
        const firstInvalidField = form.querySelector(':invalid');
        if (firstInvalidField) {
            firstInvalidField.focus();
            alert('Please correct the errors in the form before submitting.');
        }
    }
});



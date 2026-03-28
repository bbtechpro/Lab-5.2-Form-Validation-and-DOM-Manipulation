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

// Advanced Password Regex: 8+ chars, 1 uppercase, 1 lowercase, 1 number
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function validatePassword() {
    if (passwordInput.validity.valueMissing) {
        passwordError.textContent = 'Password is required.';
        passwordInput.setCustomValidity('Required');
    } else if (!passwordRegex.test(passwordInput.value)) {
        passwordError.textContent = 'Must be 8+ characters with an uppercase letter, lowercase letter, and a number.';
        passwordInput.setCustomValidity('Weak Password');
    } else {
        passwordError.textContent = '';
        passwordInput.setCustomValidity('');
    }
    validateConfirmPassword();
}

function validateConfirmPassword() {
    if (confirmPasswordInput.value === '') {
        confirmPasswordError.textContent = 'Please confirm your password.';
        confirmPasswordInput.setCustomValidity('Required');
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        confirmPasswordInput.setCustomValidity('Mismatch');
    } else {
        confirmPasswordError.textContent = '';
        confirmPasswordInput.setCustomValidity('');
    }
}

const toggleBtn = document.getElementById('togglePassword');

toggleBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    confirmPasswordInput.setAttribute('type', type);
    toggleBtn.textContent = type === 'password' ? 'Show' : 'Hide';
});

// form.checkValidity() always returns true when the form has novalidate (per HTML spec),
// so we must check each control that uses setCustomValidity / constraints.
function allFieldsValid() {
    return (
        usernameInput.checkValidity() &&
        emailInput.checkValidity() &&
        passwordInput.checkValidity() &&
        confirmPasswordInput.checkValidity()
    );
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    validateUsername();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (allFieldsValid()) {
        alert('Registration successful!');
        localStorage.setItem('username', usernameInput.value);
        form.reset();
    } else {
        const firstInvalidField = form.querySelector(':invalid');
        if (firstInvalidField) {
            firstInvalidField.focus();
            alert('Please correct the errors in the form before submitting.');
        }
    }
});



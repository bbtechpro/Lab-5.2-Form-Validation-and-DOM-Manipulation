In this lab, you will build an interactive user registration form. You’ll apply your knowledge of DOM manipulation, event handling, HTML5 and JavaScript form validation, and localStorage. The form will provide real-time feedback to the user and demonstrate how to handle user input effectively and persist simple data.

Workplace Context
Imagine you’re a junior front-end developer at a startup. Your team is building a new web application, and your first task is to create the client-side functionality for the user registration page. It’s crucial that this form is user-friendly, provides clear validation feedback to prevent errors, and perhaps remembers some basic user input for convenience. This lab simulates that task, focusing on creating a responsive and interactive form.

Objectives
By the end of this lab, you will be able to:

Structure an HTML form with appropriate input fields for registration.
Implement real-time input validation using JavaScript event listeners (input event).
Use HTML5 validation attributes (e.g., required, type, minlength, pattern).
Apply the JavaScript Constraint Validation API to check validity and display custom error messages.
Dynamically create and display error messages next to input fields.
Handle the form submit event, prevent default submission, and perform final validation.
Use localStorage to save and retrieve simple form data (e.g., username).

Reflection Questions
Include your answers to the following questions in your submission, within the README.md file:

How did event.preventDefault() help in handling form submission?

- If data is invalid, we run showError() to show the appropriate error, and stop the form from submitting with preventDefault(). This keeps the page from refreshing every time the submit button is clicked.

What is the difference between using HTML5 validation attributes and JavaScript-based validation? Why might you use both?

- 
Explain how you used localStorage to persist and retrieve the username. What are the limitations of localStorage for storing sensitive data?
Describe a challenge you faced in implementing the real-time validation and how you solved it.
How did you ensure that custom error messages were user-friendly and displayed at the appropriate times?

Testing and Validation
☑︎ Test Basic Registration: Fill out all fields with valid data and submit the form. Verify the success message and that the username is saved in localStorage (check your browser’s Developer Tools > Application > Local Storage).
Test Username Validation:
☑︎ Try submitting with an empty username.
☑︎ Enter a username that is too short.
☑︎ Verify error messages appear in real-time as you type (or on blur/submit).
Test Email Validation:
☑︎ Try submitting with an empty email.
☑︎ Enter an invalid email format (e.g., “test@”, “test.com”).
Test Password Validation:
☑︎ Try submitting with an empty password.
☑︎ Enter a password that is too short.
☑︎ Enter a password that doesn’t meet the pattern (e.g., all lowercase, no numbers).
☑︎ Ensure the “Confirm Password” field shows an error if it doesn’t match the password.
☑︎ Test Local Storage Persistence: After a successful registration, refresh the page. The username field should be pre-filled with the value you entered.

Edge Cases: Think about what happens if a user tries to bypass validation (though client-side validation is mainly for UX, server-side is for security). What happens if localStorage is full or disabled (for this lab, we assume it works, but it’s a real-world consideration)?
☑︎
Common Ways Users Bypass Client-Side Validation
•	Browser Developer Tools: Users can right-click "Inspect" to delete required, maxlength, or pattern attributes from HTML tags, or remove the disabled state from a submit button.
•	Disabling JavaScript: By turning off JavaScript in browser settings, all custom script-based validation logic is skipped entirely.
•	Interception Proxies: Tools like Burp Suite or Fiddler allow a user to capture a "valid" request and modify the data (e.g., changing a price from $100 to $1) before forwarding it to the server.
•	Direct API Requests: A user can use command-line tools like curl or platforms like Postman to send data directly to your server's endpoints, bypassing the frontend UI and its validation altogether.

Impact of Bypassing Validation (If Server-Side is Missing)
If your server trusts the incoming data because "the frontend already checked it," the application becomes vulnerable to several critical risks: 
•	Injection Attacks: Malicious strings can be sent to execute SQL Injection or Cross-Site Scripting (XSS) if the data is saved or rendered without being sanitized.
•	Data Integrity Issues: Users might submit invalid formats (e.g., a 50-character string into a field meant for a 5-digit zip code), potentially crashing the database or causing downstream logic errors.
•	Business Logic Abuse: In a shopping cart, a user could bypass a "max quantity" check to hoard items or modify price parameters to pay less than intended.
•	Resource Exhaustion: Sending massive amounts of data (e.g., a 10MB string for a "name" field) can overload server memory or storage if length limits aren't enforced on the backend.

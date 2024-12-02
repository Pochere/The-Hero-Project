document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all forms
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission
            
            // Validate the form
            const isValid = validateForm(form);
            if (!isValid) {
                alert("Please correct the highlighted errors before submitting the form.");
                return;
            }

            // Extract form data
            const formData = new FormData(form);
            const formDetails = {};
            formData.forEach((value, key) => {
                formDetails[key] = value;
            });

            // Log the data (for testing, replace with a real update function as needed)
            console.log("Form submitted:", formDetails);

            // Display feedback to the user
            alert("Form submitted successfully!");

            // Optionally, reset the form after submission
            form.reset();
        });
    });

    // Add event listeners to all buttons
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            alert(`You clicked the button: ${button.textContent}`);
        });
    });

    // Make forms responsive to input
    const inputs = document.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
        input.addEventListener("input", function () {
            console.log(`Input updated: ${input.name} = ${input.value}`);
        });
    });

    /**
     * Function to validate a form
     * @param {HTMLFormElement} form - The form element to validate
     * @returns {boolean} - Whether the form is valid
     */
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll("input, select, textarea");

        inputs.forEach((input) => {
            const errorElement = input.nextElementSibling;

            // Clear any previous error messages
            if (errorElement && errorElement.classList.contains("error-message")) {
                errorElement.textContent = "";
                input.classList.remove("error");
            }

            // Check required fields
            if (input.hasAttribute("required") && !input.value.trim()) {
                displayError(input, "This field is required.");
                isValid = false;
            }

            // Check email format
            if (input.type === "email" && input.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value)) {
                    displayError(input, "Please enter a valid email address.");
                    isValid = false;
                }
            }

            // Check numeric input
            if (input.type === "number" && input.value) {
                if (isNaN(input.value) || input.value < 0) {
                    displayError(input, "Please enter a valid number.");
                    isValid = false;
                }
            }

            // Add additional validations as needed (e.g., minLength, pattern)
            if (input.hasAttribute("minlength") && input.value.length < input.getAttribute("minlength")) {
                displayError(input, `Please enter at least ${input.getAttribute("minlength")} characters.`);
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Function to display an error message for an input
     * @param {HTMLElement} input - The input element with an error
     * @param {string} message - The error message to display
     */
    function displayError(input, message) {
        let errorElement = input.nextElementSibling;

        if (!errorElement || !errorElement.classList.contains("error-message")) {
            // Create an error message element if it doesn't exist
            errorElement = document.createElement("div");
            errorElement.classList.add("error-message");
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }

        errorElement.textContent = message;
        input.classList.add("error");
    }
});

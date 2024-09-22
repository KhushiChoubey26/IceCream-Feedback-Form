// formValidation.js

function validateName(name) {
    // Check if the name is not empty and is at least 2 characters long
    return name && name.trim().length >= 2;
}

function validatePassword(password) {
    // Check if the password is at least 8 characters long, contains a number, and a special character
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
}

module.exports = { validateName, validatePassword };

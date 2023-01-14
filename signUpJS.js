var form = document.getElementById("signUpform");
var firstName = document.getElementById("first-name");
var lastName = document.getElementById("last-name");
var email = document.getElementById("email");
var emailConfirmation = document.getElementById("email-confirmation");
var phoneNumber = document.getElementById("number");
var birthYear = document.getElementById("birth-year");
var password = document.getElementById("passwordEntry");
var studentStatus = document.getElementById("studying");
var studentStatus = document.getElementById("not-studying");
var employmentStatus = document.getElementById("employmed");
var employmentStatus = document.getElementById("seeking-employment");
var employmentStatus = document.getElementById("other");
var error = document.getElementById("error");


function passName() {
    var fName = document.getElementById("first-name"), value;
    localStorage.setItem("firstName", fName.value)
}

const select = document.getElementById("birth-year");
for (let year = 2023; year > 1912; year--) {
    let newOption = new Option(year, year);
    select.add(newOption, null);
}

function togglePassword() {
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

function passwordLengthCheck(pass) {
    if (pass.length < 6) {
        return true;
    }
}

function passwordNumberCheck(pass) {
    for (let i = 0; i < pass.length; i++) {
        if (Number.isInteger(parseInt(pass[i]))) {
            return false;
        }
    }
    return true;
}

function passwordLetterCheck(pass) {
    for (let i = 0; i < pass.length; i++) {
        if (/^[A-Za-z]+$/.test(pass[i])) {
            return false;
        }
    }
    return true;
}

form.addEventListener("submit", (e) => {
    let messages = [];
    console.debug(e);

    if (firstName.value === "" || firstName.value == null) {
        messages.push("First Name is required");
    } else if (
        firstName.value.charAt(0) == firstName.value.charAt(0).toLowerCase()
    ) {
        messages.push("First Name must start with a capital letter");
    } else if (lastName.value === "" || lastName.value == null) {
        messages.push("Last Name is required");
    } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)
    ) {
        messages.push("Please enter a valid email address");
    } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            emailConfirmation.value
        )
    ) {
        messages.push("Please enter a valid email address to confirm");
    } else if (!(emailConfirmation.value === email.value)) {
        messages.push("email address does not match");
    } else if (
        phoneNumber.value.charAt(0) !== "+" ||
        phoneNumber.value.charAt(2) !== "1" ||
        phoneNumber.value.charAt(1) !== "6" ||
        phoneNumber.value.charAt(3) !== "4" ||
        phoneNumber.value.length !== 12 ||
        !/^\d+$/.test(phoneNumber.value.substr(5, 11))
    ) {
        messages.push(
            "Please enter in Australian mobile format: +61 4xx xxx xxx  *Do not include spaces"
        );
    } else if (birthYear.value === "" || birthYear.value == null) {
        messages.push("Must be over the age of 16 to sign up");
    } else if (2023 - birthYear.value < 16) {
        messages.push("Must be over the age of 16 to sign up");
    } else if (password.value === "" || password.value == null) {
        messages.push("Password is required");
    } else if (passwordLengthCheck(password.value)) {
        messages.push("Password must be a minimum of 6 characters");
    } else if (passwordLetterCheck(password.value)) {
        messages.push("Password must contain atleast 1 letter");
    } else if (passwordNumberCheck(password.value)) {
        messages.push("Password must contain atleast 1 number");
    }
    if (messages.length > 0) {
        e.preventDefault();
        error.innerText = messages.join(", ");
    }

    passName()
});
// }

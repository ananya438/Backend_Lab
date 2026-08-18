let registrations = [];

function validateForm() {

    let name = document.getElementById("name").value.trim();
    let sap = document.getElementById("sap").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let semester = document.getElementById("semester").value;
    let event = document.getElementById("event").value;
    let skills = document.getElementById("skills").value.trim();

    if (name === "" || sap === "" || email === "" ||
        mobile === "" || semester === "" ||
        event === "" || skills === "") {
        showMessage("Please fill all the fields.", "red");
        return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        showMessage("Enter a valid email.", "red");
        return false;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        showMessage("Mobile number must contain 10 digits.", "red");
        return false;
    }

    let student = {
        name: name,
        sap: sap,
        email: email,
        mobile: mobile,
        semester: semester,
        event: event,
        skills: skills
    };

    registrations.push(student);

    showMessage("Registration successful!", "green");

    document.getElementById("registrationForm").reset();

    console.log(registrations);

    return false;
}

function showMessage(message, color) {
    let result = document.getElementById("message");
    result.innerText = message;
    result.style.color = color;
}
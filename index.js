document.getElementById("loginBtn").addEventListener("click", function () {
    const validMobileNumber = 1648494005;
    const validPinNumber = 1234;

    const enteredMobileNumber = document.getElementById("mobileNumber").value.trim();
    const enteredPinNumber = document.getElementById("pinNumber").value.trim();

    const mobileNumberValueConv = Number(enteredMobileNumber);
    const pinNumberValueConv = Number(enteredPinNumber);

    if (enteredMobileNumber === "" || enteredPinNumber === "") {
        alert("Please enter both mobile number and PIN.");
        return;
    }

    if (mobileNumberValueConv === validMobileNumber && pinNumberValueConv === validPinNumber) {
        window.location.href = "home.html";
        return;
    }

    alert("Invalid Mobile Number or Pin");
});
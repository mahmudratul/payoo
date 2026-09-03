// loginBtn functionality 
document.getElementById("loginBtn").addEventListener("click", function(event) {
    const numbers = 1648494005
    const pinNumber = 1234
    const enteredMobileNumber = document.getElementById("mobileNumber").value;
    const mobileNumberValueConv = parseInt(enteredMobileNumber);
    const enteredPinNumber = document.getElementById("pinNumber").value;
    const pinNumberValueConv = parseInt(enteredPinNumber);
    if (mobileNumberValueConv === numbers && pinNumberValueConv === pinNumber) {
        window.location.href = "home.html";
    }
    else {
        alert("Invalid Mobile Number or Pin");
    }
})
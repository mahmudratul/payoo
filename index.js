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


//git remote add origin https://github.com/mahmudratul/payoo.git
// git branch -M main
// git push -u origin main
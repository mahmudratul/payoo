document.getElementById("addMoneyBtn").addEventListener("click", function(event) {
    event.preventDefault();
     const pinNumber = 1234
    const bankSelect = document.getElementById("bankSelect").value;
    const amountInput = document.getElementById("amountInput").value;
    const amountValueConv = parseInt(amountInput);
    const bankAccNum = document.getElementById("bankAccNum").value;
 if(bankAccNum.length !== 11) {
        alert("Bank account number must be 11 digits.");
        return;
    }
   
    const enteredPinNumber = document.getElementById("PinNumber").value;
    const pinNumberValueConv = parseInt(enteredPinNumber);
    const availableBalance = document.getElementById("presetAmount").innerText;
    const availableBalanceValueConv = parseInt(availableBalance);
    const totalBalance = availableBalanceValueConv + amountValueConv;

    document.getElementById("presetAmount").innerText = totalBalance;

    if (bankSelect === "" || amountInput === "" || bankAccNum === "" || enteredPinNumber === "") {
        alert("Please fill in all the fields.");
    } else if (pinNumberValueConv !== pinNumber) {
        alert("Invalid Pin Number");
    } else {
        document.getElementById("presetAmount").innerText = totalBalance;
        alert(`$${amountValueConv} has been added to your account.`); return;
    }
})
//  toggling feauture 
document.getElementById("addMoneyBtn").addEventListener("click", function(event) {
    event.preventDefault();
  })
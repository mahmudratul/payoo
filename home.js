const state = {
    balance: 45000,
    pin: 1234,
    transactions: []
};

const cardMap = {
    addMoneySection: "add-money",
    cashOutSection: "cash-out",
    transferMoneySection: "transfer-money",
    getBonusSection: "get-bonus",
    billsSection: "pay-bill",
    transactionsSection: "transactions"
};

const validations = {
    accountNumber: /^\d{11}$/,
    pin: /^\d{4}$/
};

function updateBalance() {
    const balanceElement = document.getElementById("presetAmount");
    if (balanceElement) {
        balanceElement.textContent = state.balance.toLocaleString("en-US");
    }
}

function addTransaction(title, amount) {
    state.transactions.unshift({
        title,
        amount,
        date: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
    });

    renderTransactions();
}

function renderTransactions() {
    const list = document.getElementById("transactionsList");
    if (!list) return;

    if (!state.transactions.length) {
        list.innerHTML = '<p class="text-gray-500">No transactions yet.</p>';
        return;
    }

    list.innerHTML = state.transactions
        .map((transaction) => {
            const sign = transaction.amount >= 0 ? "+" : "-";
            const amountText = `${sign}$${Math.abs(transaction.amount).toLocaleString("en-US")}`;
            const amountColor = transaction.amount >= 0 ? "text-green-600" : "text-red-600";

            return `
                <div class="flex justify-between items-center border-b border-gray-200 pb-2 last:border-0">
                    <div>
                        <p class="font-medium">${transaction.title}</p>
                        <p class="text-xs text-gray-500">${transaction.date}</p>
                    </div>
                    <p class="font-bold ${amountColor}">${amountText}</p>
                </div>
            `;
        })
        .join("");
}

function setActiveCard(sectionId) {
    const activeCardId = cardMap[sectionId] || "add-money";

    Object.values(cardMap).forEach((cardId) => {
        const card = document.getElementById(cardId);
        if (!card) return;

        const isActive = cardId === activeCardId;
        card.classList.toggle("border-blue-500", isActive);
        card.classList.toggle("border-gray-300", !isActive);
        card.classList.toggle("bg-blue-50", isActive);
        card.classList.toggle("shadow-sm", isActive);
        card.classList.toggle("scale-[1.01]", isActive);
        card.setAttribute("aria-pressed", String(isActive));
    });
}

function showSection(sectionId) {
    const sections = [
        "addMoneySection",
        "cashOutSection",
        "transferMoneySection",
        "getBonusSection",
        "billsSection",
        "transactionsSection"
    ];

    sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = id === sectionId ? "block" : "none";
        }
    });

    setActiveCard(sectionId);
}

function showAlert(message) {
    alert(message);
}

function parsePositiveNumber(value) {
    const cleanedValue = Number(value);
    return Number.isFinite(cleanedValue) && cleanedValue > 0 ? cleanedValue : null;
}

function validateAccountNumber(value) {
    return validations.accountNumber.test(value);
}

function validatePin(value) {
    return validations.pin.test(value);
}

function clearForm(formType) {
    const inputs = document.querySelectorAll(`[id$="${formType}"]`);
    inputs.forEach((field) => {
        if (field.tagName === "INPUT" || field.tagName === "SELECT") {
            field.value = "";
        }
    });
}

function applyTransaction(formValues) {
    const { title, amount, type } = formValues;

    if (!validateAccountNumber(formValues.accountNumber)) {
        showAlert("Account number must be 11 digits.");
        return;
    }

    if (!validatePin(formValues.pin)) {
        showAlert("Pin must be 4 digits.");
        return;
    }

    if (Number(formValues.pin) !== state.pin) {
        showAlert("Invalid Pin Number");
        return;
    }

    const parsedAmount = parsePositiveNumber(formValues.amount);
    if (!parsedAmount) {
        showAlert("Please enter a valid amount greater than 0.");
        return;
    }

    if (type === "debit" && parsedAmount > state.balance) {
        showAlert("Insufficient balance.");
        return;
    }

    if (type === "debit") {
        state.balance -= parsedAmount;
    } else {
        state.balance += parsedAmount;
    }

    addTransaction(title, type === "debit" ? -parsedAmount : parsedAmount);
    updateBalance();
    showAlert(`${title} successful. ${type === "debit" ? "Amount deducted" : "Amount added"} from your balance.`);
}

function initializeListeners() {
    document.getElementById("add-money").addEventListener("click", () => showSection("addMoneySection"));
    document.getElementById("cash-out").addEventListener("click", () => showSection("cashOutSection"));
    document.getElementById("transfer-money").addEventListener("click", () => showSection("transferMoneySection"));
    document.getElementById("get-bonus").addEventListener("click", () => showSection("getBonusSection"));
    document.getElementById("pay-bill").addEventListener("click", () => showSection("billsSection"));
    document.getElementById("transactions").addEventListener("click", () => showSection("transactionsSection"));

    document.getElementById("logoutBtn").addEventListener("click", () => {
        window.location.href = "index.html";
    });

    document.getElementById("addMoneyBtn").addEventListener("click", () => {
        const formValues = {
            accountNumber: document.getElementById("bankAccNum").value.trim(),
            amount: document.getElementById("addMoneyAmount").value.trim(),
            pin: document.getElementById("addMoneyPin").value.trim(),
            title: `Add Money - ${document.getElementById("bankSelect").value}`,
            type: "credit"
        };

        if (!document.getElementById("bankSelect").value) {
            showAlert("Please select a bank.");
            return;
        }

        applyTransaction(formValues);
        clearForm("addMoney");
        document.getElementById("bankSelect").value = "";
    });

    document.getElementById("cashOutBtn").addEventListener("click", () => {
        const formValues = {
            accountNumber: document.getElementById("cashOutAgentNumber").value.trim(),
            amount: document.getElementById("cashOutAmount").value.trim(),
            pin: document.getElementById("cashOutPin").value.trim(),
            title: "Cash Out",
            type: "debit"
        };

        applyTransaction(formValues);
        clearForm("cashOut");
    });

    document.getElementById("sendMoneyBtn").addEventListener("click", () => {
        const formValues = {
            accountNumber: document.getElementById("transferUserAccountNumber").value.trim(),
            amount: document.getElementById("transferAmount").value.trim(),
            pin: document.getElementById("transferPin").value.trim(),
            title: "Send Money",
            type: "debit"
        };

        applyTransaction(formValues);
        clearForm("transfer");
    });

    document.getElementById("bonusBtn").addEventListener("click", () => {
        const bonusAmount = 250;
        state.balance += bonusAmount;
        addTransaction("Bonus Claim", bonusAmount);
        updateBalance();
        showAlert(`$${bonusAmount.toLocaleString("en-US")} bonus added to your account.`);
    });

    document.getElementById("payBillBtn").addEventListener("click", () => {
        const billSelect = document.getElementById("billSelect").value;
        const formValues = {
            accountNumber: document.getElementById("billAccNum").value.trim(),
            amount: document.getElementById("billAmount").value.trim(),
            pin: document.getElementById("billPin").value.trim(),
            title: billSelect ? `Pay Bill - ${billSelect}` : "Pay Bill",
            type: "debit"
        };

        if (!billSelect) {
            showAlert("Please select the bill you want to pay.");
            return;
        }

        applyTransaction(formValues);
        clearForm("bill");
        document.getElementById("billSelect").value = "";
    });
}

function initializePage() {
    updateBalance();
    renderTransactions();
    showSection("addMoneySection");
    initializeListeners();
}

initializePage();

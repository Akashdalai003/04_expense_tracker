document.addEventListener("DOMContentLoaded", () => {
  const ExpenseNameInput = document.getElementById("expense-name");
  const ExpenseAmountInput = document.getElementById("expense-amount");
  const ExpenseList = document.getElementById("expense-list");
  const ExpenseForm = document.getElementById("expense-form");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();

  renderExpenses()

  ExpenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = ExpenseNameInput.value.trim();
    const amount = parseFloat(ExpenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newExpense);
      saveExpensesToLocal();
      renderExpenses()
      updateTotal();

      //clear Input
      ExpenseNameInput.value = "";
      ExpenseAmountInput.value = "";
    }
  });

  function renderExpenses() {
    ExpenseList.innerHTML=""
    expenses.forEach(expense => {
        const li=document.createElement('li')
        li.innerHTML=`
        ${expense.name}- $${expense.amount}
        <button data-id="${expense.id}">Delete</button>`
        ExpenseList.appendChild(li)
        
    });
  }

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function updateTotal() {
    totalAmount=calculateTotal()
    totalAmountDisplay.textContent=totalAmount.toFixed(2)
  }

  ExpenseList.addEventListener('click',(e)=>{
    if(e.target.tagName==='BUTTON'){
        const expenseId=parseInt(e.target.getAttribute('data-id'))
        expenses = expenses.filter(expense=>expense.id!==expenseId)

        saveExpensesToLocal()
        renderExpenses()
        updateTotal()
    }
  })
});

const expenseForm = document.querySelector('#expense-form');
const expensesList = document.querySelector('#expenses-list');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
  expensesList.innerHTML = '';


  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');
    expenseItem.innerHTML = `
      <span>${expense.name} - Rs.${expense.amount} - ${expense.date}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    expensesList.appendChild(expenseItem);
  });


  localStorage.setItem('expenses', JSON.stringify(expenses));
}


function handleFormSubmit(event) {
  event.preventDefault();

  const name = expenseForm.querySelector('#name').value;
  const amount = parseFloat(expenseForm.querySelector('#amount').value);
  const date = expenseForm.querySelector('#date').value;

  expenses.push({ name, amount, date });


  expenseForm.reset();
  renderExpenses();
}


function handleDeleteClick(event) {
  if (event.target.classList.contains('delete-btn')) {
    const index = parseInt(event.target.dataset.index);
    expenses.splice(index, 1);
    renderExpenses();
  }
}
expenseForm.addEventListener('submit', handleFormSubmit);
expensesList.addEventListener('click', handleDeleteClick);

renderExpenses();

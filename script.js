//Get Budget
const budget = document.getElementById("budget");
const budgetBtn = document.getElementById("budget-btn"); 
const budgetTotal = document.querySelector(".show-budget-total");

const balance = document.querySelector(".show-balance-total");

//Get Expenses
const expenseTitle = document.getElementById("expense-title");
const expenseAmt = document.getElementById("expense-value");
const expenseEntry = document.querySelector(".expense-entry");
const displayExpenseTitle = document.querySelector(".expense-entry .desc");
const displayExpensePrice = document.querySelector(".expense-entry .price");
const expenseBtn = document.getElementById("expense-btn");
const displayExpenseTotal = document.querySelector(".show-expense-total");

//get alert
let alert = document.querySelector(".alert");


//Store
let budgetVal = 0;
let compDetails = [];

//get budget value
budgetBtn.addEventListener("click", function(e){
    e.preventDefault;
    if(budget.value === "" || budget.value < 0){
        alert.classList.remove("hide")
        setTimeout(() => {
            alert.classList.add("hide");
          }, 4000);
    } 
    else{
        budgetVal = parseInt(budget.value);
        budgetTotal.textContent = budgetVal;
        budget.value = "";
    }    
})

//get expense
expenseBtn.addEventListener("click", function(e){
    e.preventDefault;
    if(expenseTitle.value === "" || expenseAmt.value === "" || expenseAmt.value < 0){
        alert.classList.remove("hide")
        setTimeout(() => {
            alert.classList.add("hide");
          }, 4000);
    }
    
    addExpense(expenseTitle.value, expenseAmt.value)
    
    balance.textContent = balanceTotal();
    
    displayExpenseTotal.textContent = calcExpense();

    expenseTitle.value = "";
    expenseAmt.value = "";
    
})

// handle expense
function addExpense(title, amt){
    
    const details = {
        id: (Math.random() * 100000).toString(),
        expenseTitle: title,
        expenseAmt: parseInt(amt),
    }
    compDetails.push(details);

    // show expenses
    let entryBox = document.createElement("div");
        entryBox.classList.add("entry-details")
        entryBox.innerHTML = `<p class ="desc">${details.expenseTitle}</p>
            <p class ="price">${details.expenseAmt}</p>
            <div class="controls">
                <button class ="edit"><i class="fas fa-edit" data-id="${details.id}"></i></button> 
                <button class ="delete"><i class="fas fa-trash" data-id="${details.id}"></i></button>
            </div>`
        expenseEntry.appendChild(entryBox);
}
//get expense total
function calcExpense(){
    let total = 0;
    total = compDetails.reduce(function(acc, curr){
        return acc += curr.expenseAmt;
    }, 0)
    return total;  
}

//get total balance
function balanceTotal(){
 return budgetVal - calcExpense();
}

//edit
function edit(e){
    const id = e.target.dataset.id;
    const parent = e.path[3];

    expenseEntry.removeChild(parent);

    compDetails.findIndex(function(item){
        if(item.id === id){
            expenseTitle.value = item.expenseTitle;
            expenseAmt.value = item.expenseAmt;
        }
    })
    let sorted = compDetails.filter(function(item){
        return item.id !== id;
    })
    compDetails = sorted;

    displayExpenseTotal.textContent = calcExpense();
    balance.textContent = balanceTotal();
    console.log(balanceTotal())
}

//delete
function trash(e){
    const id = e.target.dataset.id;
    const parent = e.path[3];

    expenseEntry.removeChild(parent);

    let sorted = compDetails.filter(function(item){
        return item.id !== id;
    })
    compDetails = sorted;

    displayExpenseTotal.textContent = calcExpense();
    balance.textContent = balanceTotal();
    console.log(balanceTotal())
}

expenseEntry.addEventListener("click", function(e){
    if(e.target.classList.contains("fa-edit")){
        edit(e)
        // console.log(e)
    }
    else if(e.target.classList.contains("fa-trash")){
        trash(e)
    }
})
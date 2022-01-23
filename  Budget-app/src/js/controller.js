import { Transaction, transactionType } from "./model";
import { AddTransactionView, ShowBalanceView, ExpenseTrackerView, IncomeTrackerView } from "./Views"


const getTransactionsFromLS = (type) => { //get the data from ls
    return JSON.parse(localStorage.getItem(type) || '[]')
}

const saveTransactionInLS = (type, transaction) => { //save the transaction data in ls
    let list = getTransactionsFromLS(type);//get and save in list
    list.push(transaction);
    list = JSON.stringify(list);
    localStorage.setItem(type, list);
}

//Addtransaction method
const controlAddTransaction = (event) => {
    event.preventDefault();
    let { amount, type } = AddTransactionView; //get the value from view
    console.log(amount, type)
    const transaction = new Transaction(type, amount); //after get value create anew transaction
    saveTransactionInLS(type, transaction);
    AddTransactionView.clearForm(); //its clear the form
    if (type === transactionType.EXPENSE) { // update the transaction if new transaaction arrives
        ExpenseTrackerView.pushTransactionCard(transaction);
    }
    else {
        IncomeTrackerView.pushTransactionCard(transaction);
    }
    controlShowBalance();
}



const controlShowBalance = () => {
    console.log("StorageChangeListener triggered");
    const income = getTransactionsFromLS(transactionType.INCOME);
    const expense = getTransactionsFromLS(transactionType.EXPENSE);
    ShowBalanceView.render({
        income,
        expense
    })
};

const compareAmountFn = (a, b, flag) => { //sorted according to value
    if (flag) {
        if (a._value < b._value) {
            return -1;
        }
        if (a._value > b._value) {
            return 1;
        }
        // a must be equal to b
        return 0;

    } else {
        if (a._value > b._value) {
            return -1;
        }
        if (a._value < b._value) {
            return 1;
        }
        // a must be equal to b
        return 0;
    }
}
const controlSortByAmount = (list, view, flag, shouldReverse) => {
    if (Array.isArray(list)) { //check the list is array or not
        list.sort((a, b) => compareAmountFn(a, b, flag));
        console.log("sorted list is", list)
        if (shouldReverse) list = list.reverse()
        view.render(list);
    }
};

const controlFilterChange = (ev) => {
    console.log(ev.target.value)
    if (ev.target.id === "income_filter") { //check what filter is 
        if (ev.target.value === "Amount+") { //after change filter the amount is + 
            controlSortByAmount(getTransactionsFromLS(transactionType.INCOME),
                IncomeTrackerView, false)
        }

        if (ev.target.value === "Amount-") {
            controlSortByAmount(getTransactionsFromLS(transactionType.INCOME),
                IncomeTrackerView, true)
        }

        if (ev.target.value === "none") {
            IncomeTrackerView.render(getTransactionsFromLS(transactionType.INCOME));
        }
    } else {
        if (ev.target.value === "Amount+") {
            controlSortByAmount(getTransactionsFromLS(transactionType.EXPENSE),
                ExpenseTrackerView, false, true)
        }

        if (ev.target.value === "Amount-") {
            controlSortByAmount(getTransactionsFromLS(transactionType.EXPENSE),
                ExpenseTrackerView, true, true)
        }

        if (ev.target.value === "none") {
            ExpenseTrackerView.render(getTransactionsFromLS(transactionType.EXPENSE));
        }
    }

}

const init = () => {
    AddTransactionView.addSubmitHandler(controlAddTransaction);
    controlShowBalance();

    ExpenseTrackerView.render(getTransactionsFromLS(transactionType.EXPENSE))//it get the data from listview to render the Eview
    ExpenseTrackerView.addFilterEventHandler(controlFilterChange)


    IncomeTrackerView.render(getTransactionsFromLS(transactionType.INCOME))//it get the data from listview to render the Iview
    IncomeTrackerView.addFilterEventHandler(controlFilterChange)

};
init();

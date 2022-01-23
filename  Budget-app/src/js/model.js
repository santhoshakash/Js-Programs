export const transactionType = { //creating a object
    INCOME: "INCOME", 
    EXPENSE: "EXPENSE"
};

export class Transaction {
    #secret = `adsad${Math.random() * 100}`;

    constructor(type, value) {
        if (typeof value !== "number" || isNaN(value)) //check the value is number or not,i it not 
            throw new TypeError("value must be number")//trow eroor
        if (!(type in transactionType)) //if type is not transcition type throw error
            throw new Error("type must be INCOME or EXPENSE only");
        this._type = type;//after checking it set
        this._value = value; 
        this.id = `${type}-${value}-${this.#secret}`; //creating a id for transaction
        console.log(this.id);
        this.timestamp = Date.now();
    }
};


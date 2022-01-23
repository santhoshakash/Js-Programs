import { CURRENCY_UNIT } from "../config";  //its has a commom things of Expensetrac and Incometrack view


export class ListView {
    render(data) {
        this.data = data;
        const html = this.generateHTMLString();
        this._container.innerHTML = html; //this container goes to I &E view
    }
    addFilterEventHandler(handler) {
        this._filterSelect.addEventListener("change", (e) => { //whenever the filter is changed it call the controller
            handler(e)
        })
    }

    pushTransactionCard(transaction) {
        this._container.insertAdjacentHTML("afterbegin", this.getCardHTMLString(transaction))
    }

    getCardHTMLString(el) {
        return ` <div class="card transaction_card" style="display:flex; justify-content:space-between">
        <div class=${el._type === "EXPENSE" ? "red" : "green"}
         style="font-weight:bolder;"> ${el._type === "EXPENSE" ? "-" : ""}
          ${el._value} ${CURRENCY_UNIT}</div>
        <div>${this.#getDateByTimeStamp(el.timestamp)}</div> 
      </div>`
    }

    generateHTMLString() { //it reciecve the data to genearte html ele
        let html = ""; //initialize empty str
        if (Array.isArray(this.data)) { //if its array
            this.data.forEach(el => { //for each transaction
                html += this.getCardHTMLString(el); //it add the above div elem
            })
        }
        return html;
    }

    #getDateByTimeStamp(timestamp) { //dispaly the timstamp
        let date = new Date(timestamp);
        return date.toDateString();
    }

}
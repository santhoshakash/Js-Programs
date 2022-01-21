class ContactContainerView {    //its all control by controller
    _container = document.querySelector(".contacts_container");
  
    render(data) {  //it will shows all the data
      this.data = data;
      const html = this.#generateHTMLString();
      this._container.innerHTML = html; //look below
      this.applyDeleteEvent();
    }
  
    applyDeleteEvent() {
      const deleteBtns = document.querySelectorAll(".delete_contact");
      deleteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          this.onDelete(btn.id);
        });
      });
    }
  
    addDeleteListner(handler) { //delete fn in cc
      this.onDelete = handler;
    }
  
    pushContactIntoContainer(contact) { //recently added contact are put in top
      const html = this.#generatCardContactHTML(contact);
      this._container.insertAdjacentHTML("afterbegin", html);
      this.applyDeleteEvent();
    }
    #generateHTMLString() {
      const data = this.data;
      let html = ""; //empty string
      if (Array.isArray(data)) { //for each array we want to create a contact card
        data.forEach((contact) => {
          html += this.#generatCardContactHTML(contact); //add html elements by call another fn below
        });
        return html;
      }
    }
    #generatCardContactHTML(contact) {
      return ` <div class="contact_card">
              <div class="contact_info">
                <div style="font-size:x-large">${contact.name}</div>
                <div>${contact.phone}</div>
                <div>${contact.email}</div>
              </div>
              <button class="delete_contact" id="${contact.id}">delete</button>
          </div>`;
    }
  }
  
  export default new ContactContainerView();
  
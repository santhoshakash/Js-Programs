class AddContactView {
    _modal = document.querySelector(".add_contact_modal"); //acess the modal like open and close it
    _formContainer = document.querySelector(".add_contact_form");
    _inputName = this._formContainer.querySelector(".name_input");
    _inputPhone = this._formContainer.querySelector(".phone_input");
    _inputEmail = this._formContainer.querySelector(".email_input");
    _addContactBtn = document.querySelector(".add_contact_btn");
  
    constructor() {
      this._addContactBtn.addEventListener("click", this.toggleModal.bind(this));//onclick to open the addcontact form ?????????
      this._formContainer.querySelector(".close").addEventListener("click", this.toggleModal.bind(this));//close the opened form.
    }
    toggleModal(event) {
      event.preventDefault();
      console.log(this._modal);
      this._modal.classList.toggle("hidden");//remove the hidden class when click
    }
  
    addContactSubmitListner(handler) { //handler fn
      if (typeof handler !== "function") //if not a fn throw error
        throw new TypeError("handler must be a function");
      this._formContainer.addEventListener("submit", handler.bind(this));
    }
  
   
  
    clearForm() { //clear the for after saveit
      this._inputName.value = "";
      this._inputEmail.value = "";
      this._inputPhone.value = "";
    }
  
    get Name() {  //get the function
      return this._inputName.value;
    }
    get Phone() {
      return this._inputPhone.value;
    }
    get Email() {
      return this._inputEmail.value;
    }
  }
  
  export default new AddContactView();
  
class SearchView {
    container = document.querySelector(".search_form");//seclect the form
  
    addSubmitController(controller) {
      if (typeof controller !== "function")
        throw new TypeError("controller must be function");//om submiy od throw an eroor if it is not a function
      this.container.addEventListener("submit", controller.bind(this));
    }
  
    clearForm() {
      this.container.querySelector(".search_input").value = "";
    }
  
    get query() {
      return this.container.querySelector(".search_input").value;//get a value
    }
  }
  
  export default new SearchView();
  
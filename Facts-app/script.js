class State {
    state = {
      loading: false,
      number: "random",//user enter value in box
      type: "math",
    };
    updateState(props) { //update the state
      this.state = {
        ...this.state,
        ...props,
      };
    }
  }
  const state = new State();
  
  const DOM = {
    okBtn: document.querySelector(".okBtn"),
    randomBtn: document.querySelector(".randomBtn"),
    typeSelector: document.querySelector(".type"),
    number: document.querySelector(".number"),
    factbox: document.querySelector(".factbox"),
  };
  
  DOM.number.addEventListener("input", (e) => { //update the state
    state.updateState({
      number: e.target.value,
    });
    console.log(state.state);
  });
  
  DOM.typeSelector.addEventListener("change", (e) => {
    state.updateState({
      type: e.target.value,
    });
    console.log(state.state);
  });
  
  
  DOM.okBtn.addEventListener("click", () => {
    state.updateState({ loading: true }); //for loading when clock
    console.log("loading..");
    showSpinner();
    getFact(state.state.number, state.state.type)//pass the number and type
      .then(fact => { //return facts
        console.log(fact);
        state.updateState({ loading: true });
      })
      .catch(err => {
        console.error(err);
      })
  });
  //same as okbtn
  DOM.randomBtn.addEventListener("click", () => {
    state.updateState({ loading: true });
    console.log("loading..")
    showSpinner();
    getFact("random", state.state.type)
      .then(fact => {
        console.log(fact);
        state.updateState({ loading: true });
      })
      .catch(err => {
        console.error(err);
      })
  })
  
  const getFact = (number = "random", type = "math") => {
    state.updateState({ loading: true });
    return new Promise((resolve, reject) => {
      fetch(`http://numbersapi.com/${number}/${type}`)
        .then((res) => res.text())
        .then((data) => {
          showFact(data)
          state.updateState({ loading: false });
          resolve(data);
        })
        .catch((err) => {
          state.updateState({ loading: false });
          reject(err);
        });
    });
  };
  
  const showFact = (fact) => { //recieve a fact
    DOM.factbox.innerHTML = fact; 
  };
  
  const showSpinner = () => {
    DOM.factbox.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
  }
  
  //getFact().then(data=>console.log(data))
  
import { ContactPerson, state } from "./model";
import AddContactView from "./Views/AddContactView";
import ContactContainerView from "./Views/ContactContainerView";
import searchView from "./Views/searchView";

const getContactsFromLS = () => {
  return JSON.parse(localStorage.getItem("contacts") || "[]");//call from ls and render below
};

const controlContactDelete = (id) => {
  let list = getContactsFromLS();//get contact
  if (Array.isArray(list)) { //if its array
    list = list.filter((contact) => {  //filter it
      if (contact.id === id) return false;
      else return true;
    });
    ContactContainerView.render(list);//rerender it
    if(state.isSearching) handleSearchClear();
    list = JSON.stringify(list);//save in ls
    localStorage.setItem("contacts", list);
  }
};

const controlAddContact = (event) => {
  event.preventDefault();
  const { Name, Email, Phone } = AddContactView;//extract value from addcontactview
  const newContact = new ContactPerson(Name, Phone, Email);
  console.log("saving", newContact); //save in ls
  newContact.saveContactInLS();
  AddContactView.clearForm();
  ContactContainerView.pushContactIntoContainer(newContact);
};

const handleSearch = (event) => { //searching fn
  state.isSearching = true; 
  event.preventDefault();
  const { query } = searchView;
  location.hash = `#q=${query}`;//it apply in hash
};

const search = (query) => {  //to make search opertion
  const list = getContactsFromLS();
  let results = []; //to make firstofall results are empty
  if (Array.isArray(list)) {
    list.forEach((contact) => {
      if (
        contact.name.includes(query) ||
        contact.phone.toString().includes(query) ||
        contact.email.includes(query)
      ) {
        results.push(contact);
      }
    });
  }
  return results;
};

const controlHashChange = () => {
  const query = location.hash.split("=")[1];
  console.log("query is ", query);
  const results = search(query);
  if (typeof query !== "undefined" && query.length > 0)
    ContactContainerView.render(results);
  else ContactContainerView.render(getContactsFromLS());
};

const handleSearchClear = (e) => { ///clear action
  state.isSearching = false;
  if(e)e.preventDefault();
  searchView.toggleButtons();
  searchView.clearForm();
  location.hash = "";
};

const init = () => {
  AddContactView.addContactSubmitListner(controlAddContact);
  ContactContainerView.addDeleteListner(controlContactDelete);
  ContactContainerView.render(getContactsFromLS());
  searchView.addSubmitEvent(handleSearch);
  searchView.addHandleClear(handleSearchClear);
  window.onhashchange = controlHashChange;
};

init();

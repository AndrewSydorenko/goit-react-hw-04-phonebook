import { Component } from "react";
import { nanoid } from 'nanoid';
import styled from "styled-components";
import { ContactsForm } from "./phonebook/ContactsForm";
import { ContactsList } from "./contacts/ContacstList";
import { ContactsFilter } from "./filter/ContactsFilter";

const StyledSection = styled.section `
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  & div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1' , name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
    
}

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
  
  handleChange = (event) => {
    this.setState({ filter: event.target.value });
  };
  handleSubmit = contact => {
    const nameExists = this.state.contacts.some(
    existingContact => existingContact.name === contact.name
  );
  if (nameExists) {
    alert('Це ім\'я вже є в списку контактів!');
    return;
  }
    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    }
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }))
  };
  
  filteredContacts = () => this.state.contacts.filter((contact) =>
    contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
  );
  handleDelete = (id) => {
    const newContacts = this.state.contacts.filter(item => item.id !== id);
    this.setState({contacts: newContacts})
  }
  
    render() {
        return (
          <StyledSection>
            <div>
            <h1>Phonebook</h1>
              <ContactsForm handleSubmit={this.handleSubmit } />
            </div>
            <div>
              <h2>Contacts</h2>
              <ContactsFilter
                onHandleChange={this.handleChange}
                filter={this.state.filter}
              />
              <ContactsList filteredContacts={this.filteredContacts()} handleDelete={this.handleDelete} />
            </div>
          </StyledSection>
        )
    }
};

export default App
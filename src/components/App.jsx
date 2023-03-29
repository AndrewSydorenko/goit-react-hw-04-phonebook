import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { ContactsForm } from './phonebook/ContactsForm';
import { ContactsList } from './contacts/ContacstList';
import { ContactsFilter } from './filter/ContactsFilter';

const StyledSection = styled.section`
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  & div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = event => {
    setFilter(event.target.value);
  };

  const handleSubmit = contact => {
    const nameExists = contacts.some(
      existingContact => existingContact.name === contact.name
    );
    if (nameExists) {
      alert("Це ім'я вже є в списку контактів!");
      return;
    }
    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };
    setContacts([...contacts, newContact]);
  };

  const filteredContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const handleDelete = id => {
    const newContacts = contacts.filter(item => item.id !== id);
    setContacts(newContacts);
  };

  return (
    <StyledSection>
      <div>
        <h1>Phonebook</h1>
        <ContactsForm handleSubmit={handleSubmit} />
      </div>
      <div>
        <h2>Contacts</h2>
        <ContactsFilter onHandleChange={handleChange} filter={filter} />
        <ContactsList
          filteredContacts={filteredContacts()}
          handleDelete={handleDelete}
        />
      </div>
    </StyledSection>
  );
}

export default App;

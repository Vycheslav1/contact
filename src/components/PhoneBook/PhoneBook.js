import { useState } from 'react';

import { Div, Title, ContactsTitle } from './PhoneBookStyles.js';

import { ContactForm } from 'components/ContactForm/ContactForm.js';

import { ContactList } from 'components/ContactList/ContactList.js';

import { Filter } from 'components/Filter/Filter.js';

import { nanoid } from 'nanoid';

const PhoneBook = () => {
  const [data, setData] = useState({
    contacts: JSON.parse(localStorage.getItem('phonebook')),
    filter: '',
  });

  const handleChangeList = id => {
    setData(prev => ({
      ...prev,
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  const handleChange = e => {
    setData(prev => ({
      ...prev,
      filter: e.target.value,
    }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    let personId = nanoid();
    if (data.contacts.find(contact => contact.name === evt.target[0].value)) {
      alert(`${evt.target[0].value} is already in contacts`);
    } else {
      const element = {
        id: personId,
        name: evt.target[0].value,
        number: evt.target[1].value,
      };
      setData(prev => ({
        ...prev,
        contacts: [...prev.contacts, element],
      }));
    }

    evt.target.reset();
  };

  return (
    <Div>
      <Title>Phonebook</Title>
      <ContactForm stateSubmit={handleSubmit} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter changeState={handleChange} />
      {!data.filter ? (
        <ContactList persons={data.contacts} changeList={handleChangeList} />
      ) : (
        <ContactList
          persons={data.contacts.filter(contact =>
            contact.name.includes(data.filter)
          )}
          changeList={handleChangeList}
        />
      )}
    </Div>
  );
};

export { PhoneBook };

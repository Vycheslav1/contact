import { useState, useEffect } from 'react';

import { Div, Title, ContactsTitle } from './PhoneBookStyles.js';

import { ContactForm } from 'components/ContactForm/ContactForm.js';

import { ContactList } from 'components/ContactList/ContactList.js';

import { Filter } from 'components/Filter/Filter.js';

const PhoneBook = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('phonebook'))
  );

  let items = JSON.parse(localStorage.getItem('phonebook'));

  useEffect(() => {
    localStorage.setItem('phonebook', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Div>
      <Title>Phonebook</Title>
      <ContactForm stateSubmit={setContacts} persons={contacts} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter changeState={setContacts} persons={items} />
      <ContactList persons={contacts} changeList={setContacts} />
    </Div>
  );
};

export { PhoneBook };

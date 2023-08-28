import { useState, useEffect, useRef } from 'react';

import { Div, Title, ContactsTitle } from './PhoneBookStyles.js';

import { ContactForm } from 'components/ContactForm/ContactForm.js';

import { ContactList } from 'components/ContactList/ContactList.js';

import { Filter } from 'components/Filter/Filter.js';

const PhoneBook = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('phonebook'))
  );

  const [filter, setFilter] = useState('');

  let changedItems = [];

  let items = useRef(JSON.parse(localStorage.getItem('phonebook')));

  useEffect(() => {
    items.current = JSON.parse(localStorage.getItem('phonebook'));
  }, [contacts]);

  changedItems = [...items];

  if (filter !== '') {
    changedItems = items.current.filter(item => item.name.includes(filter));
  }

  return (
    <Div>
      <Title>Phonebook</Title>
      <ContactForm stateSubmit={setContacts} persons={items.current} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter changeState={setFilter} />
      <ContactList persons={changedItems} changeList={setContacts} />
    </Div>
  );
};

export { PhoneBook };

import { useState, useEffect } from 'react';

import { Div, Title, ContactsTitle } from './PhoneBookStyles.js';

import { ContactForm } from 'components/ContactForm/ContactForm.js';

import { ContactList } from 'components/ContactList/ContactList.js';

import { Filter } from 'components/Filter/Filter.js';

const peoples = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
localStorage.setItem('phonebook', JSON.stringify(peoples));
localStorage.setItem('book', JSON.stringify(peoples));

const PhoneBook = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('phonebook'))
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('phonebook', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    if (filter !== '') {
      setContacts(
        JSON.parse(localStorage.getItem('phonebook')).filter(contact =>
          contact.name.includes(filter)
        )
      );
    } else {
      setContacts(JSON.parse(localStorage.getItem('book')));
    }
  }, [filter]);

  const handleChangeList = index => {
    setContacts(contacts.filter((contact, ind) => ind !== index));
    localStorage.setItem(
      'book',
      JSON.stringify(contacts.filter((contact, ind) => ind !== index))
    );
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (contacts.find(contact => contact.name === evt.target[0].value)) {
      alert(`${evt.target[0].value} is already in contacts`);
    } else {
      setContacts([
        ...contacts,
        {
          id: 'id-' + (contacts.length + 1),
          name: evt.target[0].value,
          number: evt.target[1].value,
        },
      ]);
      localStorage.setItem(
        'book',
        JSON.stringify([
          ...contacts,
          {
            id: 'id-' + (contacts.length + 1),
            name: evt.target[0].value,
            number: evt.target[1].value,
          },
        ])
      );
    }

    evt.target.reset();
  };
  return (
    <Div>
      <Title>Phonebook</Title>
      <ContactForm stateSubmit={handleSubmit} persons={contacts} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter changeState={handleChange} />
      <ContactList persons={contacts} changeList={handleChangeList} />
    </Div>
  );
};

export { PhoneBook };

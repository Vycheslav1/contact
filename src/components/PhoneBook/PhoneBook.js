import { useState, useEffect } from 'react';

import { Div, Title, ContactsTitle } from './PhoneBookStyles.js';

import { ContactForm } from 'components/ContactForm/ContactForm.js';

import { ContactList } from 'components/ContactList/ContactList.js';

import { Filter } from 'components/Filter/Filter.js';

let items = [];

const PhoneBook = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('phonebook'))
  );

  const [filter, setFilter] = useState('');

  let changedItems = [];

  items = JSON.parse(localStorage.getItem('phonebook'));

  useEffect(() => {
    items = JSON.parse(localStorage.getItem('phonebook'));
  }, [contacts]);

  changedItems = [...items];

  if (filter !== '') {
    changedItems = items.filter(item => item.name.includes(filter));
  }
  const handleChangeList = index => {
    setContacts(items.splice(index, 1));
    localStorage.setItem('phonebook', JSON.stringify(items));
  };

  const handleChange = id => {
    setFilter(document.getElementById(id).value);
  };

  const handleSubmit = (evt, id, tl) => {
    evt.preventDefault();
    let skip = 0;
    items.forEach(item => {
      if (item.name === document.getElementById(id).value) {
        alert(`${document.getElementById(id).value} is already in contacts`);
        skip = 1;
      }
    });
    if (skip === 0) {
      const element = {
        id: 'id-' + (items.length + 1),
        name: document.getElementById(id).value,
        number: document.getElementById(tl).value,
      };

      setContacts(items.splice(items.length, 0, element));

      localStorage.setItem('phonebook', JSON.stringify(items));
    }

    evt.target.reset();
  };
  return (
    <Div>
      <Title>Phonebook</Title>
      <ContactForm stateSubmit={handleSubmit} persons={items} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter changeState={handleChange} />
      <ContactList persons={changedItems} changeList={handleChangeList} />
    </Div>
  );
};

export { PhoneBook };

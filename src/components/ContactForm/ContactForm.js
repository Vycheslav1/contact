import {
  Form,
  Label,
  InputText,
  InputTel,
  Button,
} from './ContactFormStyles.js';

import { nanoid } from 'nanoid';

import PropTypes from 'prop-types';

const InputIdText = nanoid();

const InputIdTel = nanoid();

const personId = nanoid();

const ContactForm = ({ stateSubmit, persons }) => (
  <Form
    onSubmit={evt => {
      evt.preventDefault();

      if (persons.find(person => person.name === evt.target[0].value)) {
        alert(`${evt.target[0].value} is already in contacts`);
      } else {
        stateSubmit([
          ...persons,
          {
            id: personId,
            name: evt.target[0].value,
            number: evt.target[1].value,
          },
        ]);
      }

      evt.target.reset();
    }}
  >
    <Label htmlFor={InputIdText}>
      Name
      <InputText
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </Label>
    <Label htmlFor={InputIdTel}>
      Number
      <InputTel
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
    </Label>
    <Button type="submit">Add contact</Button>
  </Form>
);

export { ContactForm };

ContactForm.propTypes = {
  stateSubmit: PropTypes.func.isRequired,
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

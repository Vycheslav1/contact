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

const ContactForm = ({ stateSubmit }) => (
  <Form onSubmit={evt => stateSubmit(evt)}>
    <Label>
      Name
      <InputText
        type="text"
        id={InputIdText}
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </Label>
    <Label>
      Number
      <InputTel
        type="tel"
        id={InputIdTel}
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
};

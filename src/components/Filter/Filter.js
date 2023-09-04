import { Label, InputFilter } from './FilterStyles.js';

import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';

const InputIdFilter = nanoid();

const Filter = ({ changeState, persons }) => (
  <Label htmlFor={InputIdFilter}>
    Find contacts by name
    <InputFilter
      type="text"
      name="filtration"
      onInput={e => {
        if (e.target.value !== '') {
          changeState(
            JSON.parse(localStorage.getItem('phonebook')).filter(contact =>
              contact.name.includes(e.target.value)
            )
          );
        } else {
          changeState(persons);
        }
      }}
    />
  </Label>
);

export { Filter };

Filter.propTypes = {
  changeState: PropTypes.func.isRequired,
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

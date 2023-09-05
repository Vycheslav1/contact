import { Label, InputFilter } from './FilterStyles.js';

import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';

const InputIdFilter = nanoid();

const Filter = ({ changeState }) => (
  <Label htmlFor={InputIdFilter}>
    Find contacts by name
    <InputFilter type="text" name="filtration" onInput={e => changeState(e)} />
  </Label>
);

export { Filter };

Filter.propTypes = {
  changeState: PropTypes.func.isRequired,
};

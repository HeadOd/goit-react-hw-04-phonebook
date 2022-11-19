import PropTypes from 'prop-types';

export const Filter = ({ findContact }) => {
  return  <label>
    <p>Find contacts by name</p>
    <input type="text" 
    onChange={findContact}/>
</label>
}

Filter.propTypes = {
  findContact: PropTypes.func.isRequired,
}
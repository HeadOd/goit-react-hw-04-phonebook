import PropTypes from 'prop-types';

import { ContactList } from "./Contacts.styled";

export const Contacts = ({ contacts, onDeleteContact }) => {
  return <ContactList>
      {contacts.map(({ id, name, number }) => {
        return(
        <li key={id}>{name}: {number} <button type="button" onClick={() => onDeleteContact(id)}>Delete</button></li>
      )})}
    </ContactList>
}

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
}
import styled from "styled-components";
import PropTypes from 'prop-types';

const StyledList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-left: 0;
    & li {
        background-color: #3973a796;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
    }
    & button {
        background-color: #3973a796;
  border: 1px solid grey;
  color: antiquewhite;
  border-radius: 10px;
  &:hover, :focus {
color: #3973a796;
background-color: antiquewhite;
    }}
`

export const ContactsList = ({filteredContacts, handleDelete}) => {
return (
             <StyledList>
                {filteredContacts.map(contact =>
                    <li key={contact.id}>{contact.name}: {contact.number} <button type="button" onClick={() => handleDelete(contact.id)}>Delete</button></li>)}
              </StyledList>
    )
}

ContactsList.propTypes = {
    filteredContacts: PropTypes.array,
    handleDelete: PropTypes.func
}
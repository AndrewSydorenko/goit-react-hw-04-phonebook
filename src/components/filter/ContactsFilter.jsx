import styled from "styled-components";
import PropTypes from 'prop-types';

const StyledInput = styled.input`
     background-color: antiquewhite;
    border: 1px solid grey;
    border-radius: 10px;
    &:hover, :focus {
    border: 1px solid #3973a796;
    }
`

export const ContactsFilter = ({onHandleChange, filter}) => {


    return (
      <div>
        <StyledInput type="text" value={filter} onChange={onHandleChange} />
      </div>
    );
}

ContactsFilter.propTypes = {
  onHandleChange: PropTypes.func,
  filter: PropTypes.string
}
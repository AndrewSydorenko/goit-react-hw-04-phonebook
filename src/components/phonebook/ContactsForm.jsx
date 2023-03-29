import { Component } from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

const StyledForm = styled.form`
display: flex;
flex-direction: column;
margin-bottom: 20px;
gap: 10px;
& button {
  background-color: #3973a796;
  border: 1px solid grey;
  color: antiquewhite;
  border-radius: 10px;
  &:hover, :focus {
color: #3973a796;
background-color: antiquewhite;
  }
}
& input {
    background-color: antiquewhite;
    border: 1px solid grey;
    border-radius: 10px;
    &:hover, :focus {
border: 1px solid #3973a796;
    }
  }
`
export class ContactsForm extends Component {
state = {
    name: '',
    number:'',
    };


handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event) => {
    event.preventDefault()
    this.props.handleSubmit(this.state)
    this.setState({
      name: '',
      number:'',
    })
  }

    render() {
        const { name, number } = this.state
        return (
            <StyledForm onSubmit={this.onSubmit}>
                <label htmlFor="">Name</label>
                 <input
                    type="text"
                    name="name"
                    value={name}
                  onChange={this.handleChange}
                  placeholder="Example"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                  />
                <label htmlFor="">Number</label>
                <input
                    type="tel"
                    name="number"
                    value={number}
                    onChange={this.handleChange}
                    placeholder="+38 065 335 22 34"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
                <button type="submit">Add contact</button>
              </StyledForm>
        )
    }
}


ContactsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};
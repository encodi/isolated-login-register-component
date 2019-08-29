import React, { useState } from 'react';
import styled from 'styled-components';

// Styles
const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  max-width: 80%;
  min-width: 100px;
  min-height: 400px;
  padding: 20px 40px;
  border-radius: 6px;
  box-shadow: 0px 8px 36px #222;
  background-color: #fefefe;
`;

const StyledTitle = styled.h2`
  display: flex;
  justify-content: center;
  font-family: 'Segoe UI', 'Ubuntu', 'Roboto', 'Open Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 2em;
  font-weight: lighter;
  margin-top: 0.25em;
  color: #222;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const StyledLoginErrors = styled.div`
  padding-bottom: 1em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  color: #db2269;
  font-size: 0.5em;
  display: relative;
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5em;
  color: #444;
  font-weight: lighter;
`;

const StyledInput = styled.input.attrs(props => ({
  type: props.type ? props.type : 'text'
}))`
  padding: 10px 10px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #d6d1d5;
  ::placeholder {
    font-size: 1.2em;
    font-weight: lighter;
    color: #bbb;
  }
`;

const StyledButton = styled.button.attrs(props => ({
  type: props.type ? props.type : 'submit'
}))`
  min-width: 100%;
  cursor: pointer;
  margin-right: 0.25em;
  margin-top: 0.5em;
  padding: 0.938em;
  border: none;
  border-radius: 4px;
  background-color: #22223b;
  color: #fefefe;
  :hover {
    background-color: #4a4e69;
    color: #fefefe;
  }
`;

const StyledWrapperInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const StyledWrapperButton = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

// Email regex
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

// Initial state
const initialState = {
  fullName: '',
  email: '',
  password: '',
  errors: {
    fullName: '',
    email: '',
    password: ''
  }
};

const LoginErrors = ({ errors }) => {
  return (
    <StyledLoginErrors>
      <ul>
        {Object.keys(errors).map(error => {
          if (errors[error] !== '') {
            return <li key={error}>{errors[error]}</li>;
          }
          return '';
        })}
      </ul>
    </StyledLoginErrors>
  );
};

function Login() {
  const [state, setState] = useState(initialState);
  const handleChange = event => {
    const { value, name } = event.target;
    const errors = state.errors;
    switch (name) {
      case 'fullName':
        errors.fullName =
          value.length < 5 ? 'Full Name must be 5 characters long!' : '';
        setState(prevState => {
          return {
            ...prevState,
            fullName: value,
            errors: Object.assign(state.errors, errors)
          };
        });
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        setState(prevState => {
          return {
            ...prevState,
            email: value,
            errors: Object.assign(state.errors, errors)
          };
        });
        break;
      case 'password':
        errors.password =
          value.length < 8 ? 'Password must be 8 characters long!' : '';
        setState(prevState => {
          return {
            ...prevState,
            password: value,
            errors: Object.assign(state.errors, errors)
          };
        });
        break;
      default:
        break;
    }
  };
  const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      val => val.length > 0 && (valid = false)
    );
    return valid;
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (validateForm(state.errors)) {
      console.info('Valid Form');
    } else {
      console.error('Invalid Form');
    }
  };
  return (
    <StyledLogin>
      <StyledTitle>Register</StyledTitle>
      <StyledForm onSubmit={handleSubmit}>
        <StyledWrapperInput>
          <StyledLabel htmlFor="fullName">Full Name:</StyledLabel>
          <StyledInput
            type="text"
            name="fullName"
            placeholder="fullName"
            value={state.fullName}
            onChange={handleChange}
            noValidate
          />
        </StyledWrapperInput>
        <StyledWrapperInput>
          <StyledLabel htmlFor="email">Email:</StyledLabel>
          <StyledInput
            type="email"
            name="email"
            placeholder="email"
            value={state.email}
            onChange={handleChange}
            noValidate
          />
        </StyledWrapperInput>
        <StyledWrapperInput>
          <StyledLabel htmlFor="password">Password:</StyledLabel>
          <StyledInput
            type="password"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={handleChange}
            noValidate
          />
        </StyledWrapperInput>
        {!validateForm(state.errors) ? (
          <LoginErrors errors={state.errors} />
        ) : (
          ''
        )}
        <StyledWrapperButton>
          <StyledButton type="submit">Submit</StyledButton>
        </StyledWrapperButton>
      </StyledForm>
    </StyledLogin>
  );
}

export default Login;

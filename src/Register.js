import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useForm from './useForm';

// Styles
const StyledRegister = styled.div`
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

const StyledRegisterErrors = styled.div`
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

const RegisterErrors = ({ errors }) => {
  return (
    <StyledRegisterErrors>
      <ul>
        {Object.keys(errors).map(error => {
          if (errors[error] !== '') {
            return <li key={error}>{errors[error]}</li>;
          }
          return '';
        })}
      </ul>
    </StyledRegisterErrors>
  );
};

function Register() {
  const [isLogged, setIsLogged] = useState(false);
  const [handleChange, handleSubmit, state] = useForm(registerUser);
  async function registerUser() {
    const x = await 1;
    console.log('registering user');
    setIsLogged(true);
  }
  const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      val => val.length > 0 && (valid = false)
    );
    return valid;
  };
  useEffect(() => {
    if (isLogged) {
      console.log('Send to secret page');
    }
    return () => {};
  }, [isLogged]);
  return (
    <StyledRegister>
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
          <RegisterErrors errors={state.errors} />
        ) : (
          ''
        )}
        <StyledWrapperButton>
          <StyledButton type="submit">Submit</StyledButton>
        </StyledWrapperButton>
      </StyledForm>
    </StyledRegister>
  );
}

export default Register;

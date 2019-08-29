import { useState } from 'react';

// Initial state
const initialState = {
  fullName: '',
  email: '',
  password: '',
  errors: {
    fullName: 'Full Name is required.',
    email: 'Email is required.',
    password: 'Password is required.'
  }
};

// Email regex
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

// Custom hook to handle forms
const useForm = callback => {
  const [state, setState] = useState(initialState);

  const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      val => val.length > 0 && (valid = false)
    );
    return valid;
  };

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    if (validateForm(state.errors)) {
      console.info('Valid Form');
      callback();
    } else {
      console.info('Invalid Form');
    }
  };

  const handleChange = event => {
    event.persist();
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

  return [handleChange, handleSubmit, state];
};

export default useForm;

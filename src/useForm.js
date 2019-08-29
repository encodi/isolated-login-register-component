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
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

var strongPasswordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);
var mediumRegex = new RegExp(
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
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
        errors.password = strongPasswordRegex.test(value)
          ? ''
          : 'Password must be 8 characters long minimum, 1 upper case, 1 lower case, 1 special character';
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

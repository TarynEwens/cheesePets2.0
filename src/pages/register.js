import React, {useEffect, useContext, useState} from "react";
import {FirebaseContext} from '../components/firebase'
import { navigate } from "gatsby"
import { Helmet } from "react-helmet"

const Register = () => {
  const {firebase, user} = useContext(FirebaseContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  useEffect(() => {
    if (user) {
      console.log('already logged in - navigating to pet page');
        navigate('/pet')
      }
  }, [user]);

  function handleInputChange(e) {
    e.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formValues.password === formValues.confirmPassword) {
      firebase.register({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password
      }).catch(error => {
        setErrorMessage(error.message);
      }).then(() => {
        console.log('navigating to adoption centre');
        navigate('/adopt')
      });

    } else {
      setErrorMessage('Password and confirm password fields must match.')
    }
  }

  return (
    <section className={"registration"}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>CheesePets: Sign up</title>
        <html lang="en" />
      </Helmet>
      <div className={'registration__content'}>
        <h2>Sign up for an account to adopt a CheesePet!</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Please enter your login details:</legend>
            {!!errorMessage &&
              <p id="errors" role="alert" aria-atomic="true" className="form__errorMessage">Error: {errorMessage}</p>
            }
            <p><strong>Note:</strong> all fields are required</p>
            <label htmlFor="username">Your username:
              <input id="username" onChange={handleInputChange} value={formValues.username} name="username" type="text" placeholder="username" required/>
            </label>
            <label htmlFor="email">Your email:
              <input id="email" onChange={handleInputChange} value={formValues.email} name="email" type="email" placeholder="email" required/>
            </label>
            <label htmlFor="password">Create password:
              <input id="password" onChange={handleInputChange} value={formValues.password}name="password" type="password" placeholder="password" required minLength={5}/>
            </label>
            <label htmlFor="confirmPassword">Confirm password:
              <input id="confirmPassword" onChange={handleInputChange} value={formValues.confirmPassword}name="confirmPassword" type="password" placeholder="Confirm password" required minLength={5}/>
            </label>
            <button type="submit" className={"button button--cta button--center"}>
              Sign up for CheesePets
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default Register

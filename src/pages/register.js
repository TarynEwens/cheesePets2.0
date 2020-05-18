import React, {useState, useContext} from "react"
import {FirebaseContext} from '../components/firebase'
import { navigate } from "gatsby"
import { Helmet } from "react-helmet"

const Register = () => {
  const {firebase} = useContext(FirebaseContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

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
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>CheesePets: Sign up</title>
        <html lang="en" />
      </Helmet>
      <h2>Sign up for an account to adopt a CheesePet</h2>
      <form onSubmit={handleSubmit}>
        {!!errorMessage &&
          <p id="errors" role="alert" aria-atomic="true" className="form__errorMessage">Error: {errorMessage}</p>
        }
        <p>Note: all fields are required</p>
        <label htmlFor="username">Your username:</label>
        <input id="username" onChange={handleInputChange} value={formValues.username} name="username" type="text" placeholder="username" required/>
        <label htmlFor="email">Your email:</label>
        <input id="email" onChange={handleInputChange} value={formValues.email} name="email" type="email" placeholder="email" required/>
        <label htmlFor="password">Create password:</label>
        <input id="password" onChange={handleInputChange} value={formValues.password}name="password" type="password" placeholder="password" required minLength={5}/>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input id="confirmPassword" onChange={handleInputChange} value={formValues.confirmPassword}name="confirmPassword" type="password" placeholder="Confirm password" required minLength={5}/>
        <button type="submit">
          Sign up for CheesePets
        </button>
      </form>
    </>
  );
}

export default Register

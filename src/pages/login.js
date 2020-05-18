import React, {useState, useContext} from "react"
import {FirebaseContext} from '../components/firebase';
import { navigate } from "gatsby"
import { Helmet } from "react-helmet"

const Login = () => {
  const [formValues, setFormValues] = useState({email: '', password: ''});
  const [errorMessage, setErrorMessage] = useState('');
  const {firebase} = useContext(FirebaseContext);

  function handleSubmit(e) {
    e.preventDefault();
    firebase.login({email: formValues.email, password: formValues.password}).catch(error => {
      setErrorMessage(error.message);
    }).then(() => {
      console.log('navigating to your pet page');
      navigate('/pet')
    });
  }

  function handleInputChange(e){
    e.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>CheesePets: Login</title>
        <html lang="en" />
      </Helmet>
      <h2>Log in to look after your CheesePet</h2>
      <form onSubmit={handleSubmit}>
        {!!errorMessage &&
          <p id="errors" role="alert" aria-atomic="true" class="form__errorMessage">Error: {errorMessage}</p>
        }
        <p>Note: all fields are required</p>
        <label htmlFor="email">Your email*:</label>
        <input value={formValues.email} id="email" name="email" onChange={handleInputChange} type="email" placeholder="email" required/>
        <label htmlFor="password">Your password*:</label>
        <input value={formValues.password} id="password" name="password" onChange={handleInputChange} type="password" placeholder="password" required/>
        <button type="submit">
          Login
        </button>
      </form>
    </>
  );
}

export default Login

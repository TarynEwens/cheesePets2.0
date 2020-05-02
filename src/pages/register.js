import React, {useState, useContext} from "react"
import {FirebaseContext} from '../components/Firebase'

const Register = () => {
  const {firebase} = useContext(FirebaseContext);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  function handleInputChange(e) {
    e.persist();
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formValues.password === formValues.confirmPassword) {
      firebase.register({
        email: formValues.email,
        password: formValues.password
      })
    }
    console.log(formValues);
  }

  return (
    <main>
      <p>Registration Page!</p>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInputChange} value={formValues.email} name="email" type="email" placeholder="email" required/>
        <input onChange={handleInputChange} value={formValues.password}name="password" type="password" placeholder="password" required minLength={5}/>
        <input onChange={handleInputChange} value={formValues.confirmPassword}name="confirmPassword" type="password" placeholder="Confirm password" required minLength={5}/>
        <button type="submit">
          Sign up for CheesePets
        </button>
      </form>

    </main>
  );
}

export default Register

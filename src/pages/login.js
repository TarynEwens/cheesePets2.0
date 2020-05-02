import React, {useState, useContext} from "react"
import {FirebaseContext} from '../components/Firebase';

const Login = () => {
  const [formValues, setFormValues] = useState({email: '', password: ''});
  const {firebase} = useContext(FirebaseContext);

  function handleSubmit(e) {
    e.preventDefault();
    firebase.login({email: formValues.email, password: formValues.password});
  }

  function handleInputChange(e){
    e.persist();
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main>
      <p>Login Page!</p>
      <form onSubmit={handleSubmit}>
        <input value={formValues.email} name="email" onChange={handleInputChange} type="email" placeholder="email"/>
        <input value={formValues.password} name="password" onChange={handleInputChange} type="password" placeholder="password"/>
        <button type="submit">
          Login
        </button>
      </form>
    </main>
  );
}

export default Login

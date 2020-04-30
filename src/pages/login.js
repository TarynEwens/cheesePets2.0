import React, {useState} from "react"
import Layout from "../components/layout";
import {useAuth} from '../components/Firebase';

const Login = () => {
  const [formValues, setFormValues] = useState({email: '', password: ''});
  const {firebase} = useAuth();

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
    <Layout>
      <main>
        <form onSubmit={handleSubmit}>
          <input value={formValues.email} name="email" onChange={handleInputChange} type="email" placeholder="email"/>
          <input value={formValues.password} name="password" onChange={handleInputChange} type="password" placeholder="password"/>
          <button type="submit">
            Login
          </button>
        </form>
        <p>Login Page!</p>
      </main>
    </Layout>
  );
}

export default Login

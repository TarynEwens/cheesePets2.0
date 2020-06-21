import React, { useState, useContext } from "react"
import { FirebaseContext } from "../components/firebase"
import { navigate } from "gatsby"
import { Helmet } from "react-helmet"

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const { firebase } = useContext(FirebaseContext)

  function handleSubmit(e) {
    e.preventDefault()
    firebase
      .login({ email: formValues.email, password: formValues.password })
      .catch(error => {
        setErrorMessage(error.message)
      })
      .then(() => {
        console.log("navigating to your pet page")
        navigate("/pet")
      })
  }

  function handleInputChange(e) {
    e.persist()
    setErrorMessage("")
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className={"registration"}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>CheesePets: Login</title>
        <html lang="en" />
      </Helmet>
      <div className={"registration__content"}>
        <h2>Returning to look after your CheesePet?</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Please enter your login details:</legend>
            {!!errorMessage && (
              <p
                id="errors"
                role="alert"
                aria-atomic="true"
                className={"form__errorMessage"}
              >
                Error: {errorMessage}
              </p>
            )}
            <p>
              <strong>Note:</strong> all fields are required
            </p>
            <label htmlFor="email">
              Your email:
              <input
                value={formValues.email}
                id="email"
                name="email"
                onChange={handleInputChange}
                type="email"
                placeholder="email"
                required
              />
            </label>
            <label htmlFor="password">
              Your password:
              <input
                value={formValues.password}
                id="password"
                name="password"
                onChange={handleInputChange}
                type="password"
                placeholder="password"
                autoComplete="current-password"
                required
              />
            </label>
            <button
              type="submit"
              className={"button button--cta button--center"}
            >
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  )
}

export default Login

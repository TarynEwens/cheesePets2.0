import React, {useState, useContext} from "react"
import {FirebaseContext} from '../components/firebase'
import { navigate } from "gatsby"
import { Helmet } from "react-helmet"

const Adopt = () => {
  const {firebase} = useContext(FirebaseContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({
    species: '',
    name: ''
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
    console.log('adopt form submitted');
    console.log(formValues);
    firebase.adoptPet({
      species: formValues.species,
      name: formValues.name
    }).catch(error => {
      setErrorMessage(error.message);
    }).then(() => {
      console.log('navigating to pet page');
      navigate('/pet')
    });
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>CheesePets: Adopt a pet</title>
        <html lang="en" />
      </Helmet>
      <h2>Welcome to the CheeseLand Adoption Centre!</h2>
      <form onSubmit={handleSubmit}>
        {!!errorMessage &&
          <p id="errors" role="alert" aria-atomic="true" className="form__errorMessage">Error: {errorMessage}</p>
        }
        <fieldset>
          <legend>Choose a pet:</legend>
          <label htmlFor="puppy"><input id="puppy" type="radio" name="species" value="Puppy" onChange={handleInputChange}/> Pug</label>
          <label htmlFor="axolotl"><input id="axolotl" type="radio" name="species" value="Axolotl" onChange={handleInputChange}/>Axolotl</label>
          <label htmlFor="rat"><input id="rat" type="radio" name="species" value="Rat" onChange={handleInputChange}/>Rat</label>
          <label htmlFor="kitten"><input id="kitten" type="radio" name="species" value="Kitten" onChange={handleInputChange}/>Kitten</label>
        </fieldset>
        <label htmlFor="name">Name your pet: <input id="name" name="name" type="text" placeholder="name" onChange={handleInputChange} value={formValues.name} required/></label>
        <button type="submit" className={"button button--cta"}>
          Adopt your CheesePet
        </button>
      </form>
    </>
  );
}

export default Adopt

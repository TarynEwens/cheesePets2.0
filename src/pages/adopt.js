import React, {useState, useContext} from "react"
import {FirebaseContext} from '../components/firebase'

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
    });
  }

  return (
    <main>
      <p>Welcome to the adoption centre!</p>
      <form onSubmit={handleSubmit}>
        {!!errorMessage &&
          <p id="errors" role="alert" aria-atomic="true" className="form__errorMessage">Error: {errorMessage}</p>
        }
        <fieldset>
          <legend>Choose a pet:</legend>
          <label htmlFor="puppy"><input id="puppy" type="radio" name="species" value="puppy" onChange={handleInputChange}/> Pug puppy</label>
          <label htmlFor="axolotl"><input id="axolotl" type="radio" name="species" value="axolotl" onChange={handleInputChange}/>Axolotl</label>
          <label htmlFor="rat"><input id="rat" type="radio" name="species" value="rat" onChange={handleInputChange}/>Rat</label>
          <label htmlFor="kitten"><input id="kitten" type="radio" name="species" value="kitten" onChange={handleInputChange}/>Unicorn Kitten</label>
        </fieldset>
        <label htmlFor="name">Name your pet: <input id="name" name="name" type="text" placeholder="name" onChange={handleInputChange} value={formValues.name} required/></label>
        <button type="submit">
          Adopt your CheesePet
        </button>
      </form>
    </main>
  );
}

export default Adopt

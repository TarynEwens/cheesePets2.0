import React, { useState, useContext } from "react"
import { FirebaseContext } from "../components/firebase"
import { navigate } from "gatsby"
import { Helmet } from "react-helmet"
import Loading from "../components/loading"

const Adopt = () => {
  const { firebase } = useContext(FirebaseContext)
  const [errorMessage, setErrorMessage] = useState("")
  const [goToPet, setGoToPet] = useState(false)
  const [formValues, setFormValues] = useState({
    species: "",
    name: "",
  })

  function handleInputChange(e) {
    e.persist()
    setErrorMessage("")
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log("adopt form submitted")
    setGoToPet(true)
    console.log(formValues)
    firebase
      .adoptPet({
        species: formValues.species,
        name: formValues.name,
      })
      .catch(error => {
        setErrorMessage(error.message)
      })
      .then(() => {
        console.log("navigating to pet page")
        navigate("/pet")
      })
  }

  if (goToPet) {
    return (
      <section className={"petProfile"}>
        <div className={"petProfile__content"}>
          <Loading text="Please wait while we get your CheesePet ready." />
        </div>
      </section>
    )
  } else {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>CheesePets: Adopt a pet</title>
          <html lang="en" />
        </Helmet>
        <section className={"petProfile"}>
          <div className={"adoption__content"}>
            <h2>Welcome to the CheesePets Adoption Centre!</h2>
            <form onSubmit={handleSubmit} className="adoption__form">
              {!!errorMessage && (
                <p
                  id="errors"
                  role="alert"
                  aria-atomic="true"
                  className="form__errorMessage"
                >
                  Error: {errorMessage}
                </p>
              )}
              <fieldset>
                <legend>Choose a pet:</legend>
                <div>
                  <label htmlFor="puppy" className={"adoption__label"}>
                    <img
                      src={"/pets/puppy_neutral.png"}
                      alt={`Cartoon Puppy`}
                      className={"adoption__image"}
                    />
                    <span>
                      <input
                        id="puppy"
                        type="radio"
                        name="species"
                        value="Puppy"
                        onChange={handleInputChange}
                        className={"adoption__radioButton"}
                      />
                      Pug
                    </span>
                  </label>

                  <label htmlFor="axolotl" className={"adoption__label"}>
                    <img
                      src={"/pets/axolotl_neutral.png"}
                      alt={`Cartoon Axolotl`}
                      className={"adoption__image"}
                    />
                    <span>
                      <input
                        id="axolotl"
                        type="radio"
                        name="species"
                        value="Axolotl"
                        onChange={handleInputChange}
                        className={"adoption__radioButton"}
                      />
                      Axolotl
                    </span>
                  </label>

                  <label htmlFor="rat" className={"adoption__label"}>
                    <img
                      src={"/pets/rat_neutral.png"}
                      alt={`Cartoon Rat`}
                      className={"adoption__image"}
                    />
                    <span>
                      <input
                        id="rat"
                        type="radio"
                        name="species"
                        value="Rat"
                        onChange={handleInputChange}
                        className={"adoption__radioButton"}
                      />
                      Rat
                    </span>
                  </label>

                  <label htmlFor="kitten" className={"adoption__label"}>
                    <img
                      src={"/pets/kitten_neutral.png"}
                      alt={`Cartoon Kitten`}
                      className={"adoption__image"}
                    />
                    <span>
                      <input
                        id="kitten"
                        type="radio"
                        name="species"
                        value="Kitten"
                        onChange={handleInputChange}
                        className={"adoption__radioButton"}
                      />
                      Kitten
                    </span>
                  </label>
                </div>
              </fieldset>
              <label htmlFor="name" className={"adoption__nameLabel"}>
                Name your pet:{" "}
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="name"
                  onChange={handleInputChange}
                  value={formValues.name}
                  required
                />
              </label>
              <button type="submit" className={"button button--cta"}>
                Adopt your CheesePet
              </button>
            </form>
          </div>
        </section>
      </>
    )
  }
}

export default Adopt

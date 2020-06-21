/**
 * Pet profile component
 */

import React, { useEffect, useContext, useState } from "react"
import { FirebaseContext } from "../components/firebase"
import Loading from "../components/loading"

const PetProfile = () => {
  const { firebase, user } = useContext(FirebaseContext)
  const [petStatus, setPetStatus] = useState('"Hello!"')
  const [petData, setPetData] = useState([])
  const [petImage, setPetImage] = useState("")
  const [initialLoadFlag, setInitialLoadFlag] = useState("")

  useEffect(() => {
    if (firebase && user) {
      const unsubscribe = firebase.subscribeToPetData({
        username: user.username,
        onSnapshot: snapshot => {
          const snapshotPetData = []
          snapshot.forEach(doc => {
            snapshotPetData.push({
              id: doc.id,
              ...doc.data(),
            })
          })
          setPetData(snapshotPetData)
          if (initialLoadFlag === "") {
            setInitialLoadFlag("loaded")
            updatePetImage("neutral", snapshotPetData)
          }
        },
      })

      return () => {
        if (unsubscribe) {
          unsubscribe()
        }
      }
    }
  }, [firebase, user, initialLoadFlag])

  const updatePetImage = (action, data) => {
    if (!data[0]) {
      return
    }
    setPetImage(`/pets/${data[0].species}_${action}.png`)
  }

  const napTime = () => {
    if (petData[0].energy <= 35) {
      updatePetImage("nap", petData)
      setPetStatus("ZzzzzZzzzzZzzzz")
      firebase
        .updatePet({
          id: petData[0].id,
          hunger: petData[0].hunger,
          happiness: petData[0].happiness,
          energy: petData[0].energy + 5,
          fun: petData[0].fun,
        })
        .catch(error => {
          setPetStatus("No thanks, not right now.")
        })
    } else {
      updatePetImage("neutral", petData)
      setPetStatus("Nooo, I don't want a nap! I'm not tired!")
    }
  }

  const hugPet = () => {
    if (petData[0].happiness <= 35) {
      updatePetImage("happiness", petData)
      setPetStatus("Yay hugs! I feel so happy!")
      firebase
        .updatePet({
          id: petData[0].id,
          hunger: petData[0].hunger,
          happiness: petData[0].happiness + 5,
          energy: petData[0].energy,
          fun: petData[0].fun,
        })
        .catch(error => {
          setPetStatus("No thanks, not right now.")
        })
    } else {
      updatePetImage("neutral", petData)
      setPetStatus("Plz don't touch me, I'm fine!")
    }
  }

  const getRange = number => {
    if (number <= 10) {
      return "low"
    } else if (number <= 20) {
      return "lowMedium"
    } else if (number <= 30) {
      return "mediumHigh"
    } else {
      return "high"
    }
  }

  const getPetStat = (category, number) => {
    let range = `${category}-${getRange(number)}`

    const petStat = {
      "hunger-low": "Starving",
      "hunger-lowMedium": "Hungry",
      "hunger-mediumHigh": "Peckish",
      "hunger-high": "Full",
      "happiness-low": "Miserable",
      "happiness-lowMedium": "Lonely",
      "happiness-mediumHigh": "Content",
      "happiness-high": "Happy",
      "energy-low": "Exhausted",
      "energy-lowMedium": "Tired",
      "energy-mediumHigh": "Okay",
      "energy-high": "Hyper",
      "fun-low": "Bored",
      "fun-lowMedium": "Chill",
      "fun-mediumHigh": "Amused",
      "fun-high": "Excited",
    }

    return petStat[range]
  }

  const getStatClassName = number => {
    return `petProfile__stat--${getRange(number)}`
  }

  if (petData[0] && user) {
    return (
      <section className={"petProfile"}>
        <div className={"petProfile__content"}>
          <h2>
            {petData[0].name} the {petData[0].species}
          </h2>
          <p>
            <strong>Adopted by:</strong> {user.username}
          </p>
          <img
            src={petImage}
            alt={`Cartoon ${petData[0].species}`}
            className={"petProfile__image"}
          />
          {!!petStatus && (
            <p role="alert" aria-atomic="true">
              {petStatus}
            </p>
          )}
          <div className={"petProfile__interactions"}>
            <button onClick={hugPet} className={"button button--cta"}>
              Hug {petData[0].name}
            </button>
            <button onClick={napTime} className={"button button--cta"}>
              {petData[0].name}'s nap time
            </button>
          </div>
          <ul className={"petProfile__stats"}>
            <li>
              Hunger:
              <span
                className={`petProfile__stat ${getStatClassName(
                  petData[0].hunger
                )}`}
              >
                {" "}
                {getPetStat("hunger", petData[0].hunger)}
              </span>{" "}
              <span className={"petProfile__values"}>
                {petData[0].hunger} / 40
              </span>
            </li>
            <li>
              Happiness:
              <span
                className={`petProfile__stat ${getStatClassName(
                  petData[0].happiness
                )}`}
              >
                {" "}
                {getPetStat("happiness", petData[0].happiness)}
              </span>{" "}
              <span className={"petProfile__values"}>
                {petData[0].happiness} / 40
              </span>
            </li>
            <li>
              Energy:
              <span
                className={`petProfile__stat ${getStatClassName(
                  petData[0].energy
                )}`}
              >
                {" "}
                {getPetStat("energy", petData[0].energy)}
              </span>{" "}
              <span className={"petProfile__values"}>
                {petData[0].energy} / 40
              </span>
            </li>
            <li>
              Fun:
              <span
                className={`petProfile__stat ${getStatClassName(
                  petData[0].fun
                )}`}
              >
                {" "}
                {getPetStat("fun", petData[0].fun)}
              </span>{" "}
              <span className={"petProfile__values"}>
                {petData[0].fun} / 40
              </span>
            </li>
          </ul>
        </div>
      </section>
    )
  } else {
    return (
      <section className={"petProfile"}>
        <div className={"petProfile__content"}>
          <Loading text="Please wait while we get your CheesePet ready." />
        </div>
      </section>
    )
  }
}

export default PetProfile

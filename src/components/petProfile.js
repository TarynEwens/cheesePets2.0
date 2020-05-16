/**
 * Pet profile component
 */

import React, {useEffect, useContext, useState} from "react";
import {FirebaseContext} from "../components/firebase"

const PetProfile = () => {
  const {firebase, user} = useContext(FirebaseContext);
  const [petStatus, setPetStatus] = useState('Hello!');

  const [petData, setPetData] = useState([]);

  useEffect(() => {
    if (firebase && user) {
      const unsubscribe = firebase.subscribeToPetData({
        username: user.username,
          onSnapshot: (snapshot) => {
          const snapshotPetData = [];
          snapshot.forEach(doc => {
            snapshotPetData.push({
              id: doc.id,
              ...doc.data()
            })
          })
          setPetData(snapshotPetData);
        }
      })

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      }
    }

  }, [firebase, user]);

  const napTime = () => {
    if (petData[0].energy <= 45) {
      setPetStatus('ZzzzzZzzzzZzzzz');
      firebase.updatePet({
        id: petData[0].id,
        hunger: petData[0].hunger,
        happiness: petData[0].happiness,
        energy: petData[0].energy + 5,
        fun: petData[0].fun,
      }).catch(error => {
        setPetStatus('No thanks, not right now.');
      })
    } else {
      setPetStatus("Nooo, I don't want a nap! I'm not tired!");
    }
  }

  const hugPet = () => {
    if (petData[0].happiness <= 45) {
      setPetStatus("Yay hugs! I feel so happy!")
      firebase.updatePet({
        id: petData[0].id,
        hunger: petData[0].hunger,
        happiness: petData[0].happiness + 5,
        energy: petData[0].energy,
        fun: petData[0].fun,
      }).catch(error => {
        setPetStatus('No thanks, not right now.');
      })
    } else {
      setPetStatus("Plz don't touch me, I'm fine!");
    }
  }

  if (petData[0]) {
    return (
      <section>
        <div>
          <p>Name: {petData[0].name}</p>
          <p>Species: {petData[0].species}</p>
          {!!petStatus &&
          <p role="alert" aria-atomic="true">{petStatus}</p>
        }
        </div>
        <div>
          <button onClick={hugPet}>Hug {petData[0].name}</button>
          <button onClick={napTime}>{petData[0].name}'s nap time</button>
        </div>
        <ul>
          <li>Hunger: {petData[0].hunger} / 50</li>
          <li>Happiness: {petData[0].happiness} / 50</li>
          <li>Energy: {petData[0].energy} / 50</li>
          <li>Fun: {petData[0].fun} / 50</li>
        </ul>
      </section>
    )
  } else {
    return (
      <p>Loading...</p>
    )
  }
}

export default PetProfile

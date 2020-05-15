/**
 * Pet profile component
 */

import React, {useEffect, useContext, useState} from "react";
import {FirebaseContext} from "../components/firebase"

const PetProfile = () => {
  const {firebase, user} = useContext(FirebaseContext);
  console.log('firebase + username', firebase, user);

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

  console.log(petData[0]);

  return (
    <section>
      <p>Name: {petData[0].name}</p>
      <p>Species: {petData[0].species}</p>
      <p>Hunger: {petData[0].hunger}</p>
      <p>Happiness: {petData[0].happiness}</p>
      <p>Energy: {petData[0].energy}</p>
      <p>Fun: {petData[0].fun}</p>
    </section>
  )
}

export default PetProfile

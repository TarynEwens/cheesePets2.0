import React from "react"
import PetProfile from "../components/petProfile";
import { Helmet } from "react-helmet"

const Pet = () => {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>CheesePets: Your pet</title>
        <html lang="en" />
      </Helmet>
        <PetProfile />
    </>
  );
}

export default Pet

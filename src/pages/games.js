import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"

const Games = () => {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>CheesePets: Games Center</title>
        <html lang="en" />
      </Helmet>
      <section className={"petProfile"}>
        <div className={"adoption__content"}>
          <h2>Welcome to the games center!</h2>
          <ul>
            <li><Link to="/games/cheeseChaseGame">CheeseChase with Bobbles the Pug</Link></li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Games

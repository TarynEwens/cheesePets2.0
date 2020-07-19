import React from "react"
import { Helmet } from "react-helmet"

const CheeseChaseGame = () => {


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>CheesePets: Games Center</title>
        <html lang="en" />
        <script defer src={'/games/cheeseChase/cheeseChase.js'} />
      </Helmet>
      <section className={"petProfile"}>
        <div className={"adoption__content"}>
          <h2>CheeseChase</h2>
          <p>Use the arrow keys to move Bobbles the Pug and help her catch us much cheese as possible before time runs out!</p>
          <div className={"gameArea"}>
          <canvas id="cheeseChase"></canvas>
          <button className={"button button--cta"}>Play again!</button>
        </div>
        </div>
      </section>
    </>
  );
}

export default CheeseChaseGame

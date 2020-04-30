import React from "react"
import { Link } from "gatsby"
import Navigation from "./navigation"
import {FirebaseContext} from "./Firebase"

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to={`/`}>CheesePets 2.0</Link>
      </div>
      <Navigation/>
      <FirebaseContext.Consumer>
        {props => {
          console.log(props);
          return <div />
        }}
      </FirebaseContext.Consumer>
    </header>
  )
}

export default Header



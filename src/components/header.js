import React from "react"
import { Link } from "gatsby"
import Navigation from "./navigation"

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to={`/`}>CheesePets 2.0</Link>
      </div>
      <Navigation/>
    </header>
  )
}

export default Header



/**
 * Top navigation component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { Link } from "gatsby"
import { Router } from "@reach/router"
import { logout, isAuthenticated } from "../utils/auth"

const Navigation = () => {

  const Home = () => <p>Home</p>
  const MyPet = () => <p>My Pet</p>
  const Games = () => <p>Games</p>
  const Settings = () => <p>Settings</p>

  if (!isAuthenticated()) {
    console.log('not authenticated');
    return (
      <nav id="navigation" className="header__nav">
        <ul id="menu">
          <li>
            <Link to="/account/">Log in</Link>
          </li>
        </ul>
      </nav>
    )
  }

  console.log('is authenticated');
  return (
    <>
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/account/">My Pet</Link>{" "}
        <Link to="/account/games/">Games</Link>{" "}
        <Link to="/account/settings/">Settings</Link>{" "}
        <a
          href="#logout"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out
        </a>
    </nav>
    <Router>
      <Home path="/" />
      <MyPet path="/account/" />
      <Games path="/account/games" />
      <Settings path="/account/settings" />
    </Router>
  </>
  )
}

export default Navigation

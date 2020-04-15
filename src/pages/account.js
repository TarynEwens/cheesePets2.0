import React from "react"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Router } from "@reach/router"
import { Link } from "gatsby"

const Account = () => {
  const Home = () => <p>Home</p>
  const MyAccount = () => <p>My Account</p>
  const Settings = () => <p>Settings</p>
  const Billing = () => <p>Billing</p>

  if (!isAuthenticated()) {
    console.log('not authenticated');
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <>
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/account/">My Account</Link>{" "}
        <Link to="/account/settings/">Settings</Link>{" "}
        <Link to="/account/billing/">Billing</Link>{" "}
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
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Router>
        <Home path="/" />
        <MyAccount path="/account/" />
        <Settings path="/account/settings" />
        <Billing path="/account/billing" />
      </Router>
    </>
  )
}

export default Account

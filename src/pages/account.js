import React from "react"
import { login, isAuthenticated, getProfile } from "../utils/auth"
import Header from "../components/header"

const Account = () => {
  if (!isAuthenticated()) {
    console.log('not authenticated');
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <>
      <Header/>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}

export default Account

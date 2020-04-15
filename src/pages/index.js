import React from "react"
import { Link } from "gatsby"

const Home = () => {
  return (
    <>
      <main>
        <p>Hello world!</p>
        <Link to="/account/">Log in / Sign up</Link>
      </main>
    </>
  )
}

export default Home

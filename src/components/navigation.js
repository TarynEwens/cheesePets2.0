import React from "react"
import { Link } from "gatsby"
const Navigation = () => {

  return (
    <>
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/account/">My Pet</Link>{" "}
        <Link to="/account/games/">Games</Link>{" "}
        <Link to="/account/settings/">Settings</Link>{" "}
    </nav>
  </>
  )
}

export default Navigation

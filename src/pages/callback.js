import React from "react"
import { Link } from "gatsby"

import Header from "../components/header"

const Callback = () => {
return(
<>
<p>Welcome back to CheesePets!</p>
<p>Let's go check on <Link to="/account/">your pet!</Link>{" "}</p>
</>
)}

export default Callback

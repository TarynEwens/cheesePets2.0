import React, {useContext} from "react"
import { Link, navigate } from "gatsby"
import {FirebaseContext} from "./Firebase"

const Navigation = () => {
  const {firebase, user} = useContext(FirebaseContext);
  console.log(firebase, user);

  function handleLogoutClick() {
    firebase.logout().then(() => navigate('/login'));
  }

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/pet">My Pet</Link></li>
          <li><Link to="/games">Games</Link></li>
          {(!user || !user.email) &&
            <li><Link to="/login">Login</Link></li>
          }
          {!!user && !!user.email &&
            <li><button onClick={handleLogoutClick}>Logout</button></li>
          }
        </ul>
      </nav>
      <div>
        {!!user && !!user.email &&
        <div>
          <p>Hello {user.email}!</p>
        </div>
        }
      </div>
    </>
  )
}

export default Navigation

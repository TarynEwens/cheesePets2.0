import React, {useContext} from "react"
import { Link, navigate } from "gatsby"
import {FirebaseContext} from "./Firebase"

const Navigation = () => {
  const {firebase, user} = useContext(FirebaseContext);
  console.log('navigation', user);

  function handleLogoutClick() {
    firebase.logout().then(() => navigate('/login'));
  }

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {(!user || !user.email) &&
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Sign up</Link></li>
            </>
          }
          {!!user && !!user.email &&
            <>
              <li><Link to="/pet">My Pet</Link></li>
              <li><Link to="/games">Games</Link></li>
              <li><button onClick={handleLogoutClick}>Logout</button></li>
            </>
          }
        </ul>
      </nav>
      <div>
        {!!user && !!user.email &&
        <div>
          <p>Hello {user.username || user.email}!</p>
        </div>
        }
        <hr/>
      </div>
    </>
  )
}

export default Navigation

import React, {useContext} from "react"
import { Link, navigate } from "gatsby"
import {FirebaseContext} from "./firebase"
import logo from '../../static/cheesePetsLogo_01.png';

const Navigation = () => {
  const {firebase, user} = useContext(FirebaseContext);

  function handleLogoutClick() {
    firebase.logout().then(() => navigate('/login'));
  }

  return (
    <section className={'nav'}>
      <div className={'nav__emptyContent nav__column'}></div>
      <h1>
        <Link to="/" className={'nav__logo nav__column'}>
            <img
            src={logo}
            alt={'CheesePets'}
            aria-label={'Cheese Pets'}
          />
        </Link>
      </h1>
      <nav>
        <ul className={'nav__links nav__column'}>
          {!!user && !!user.email &&
            <>
              <li><Link to="/pet">My Pet</Link></li>
              <li><Link to="/games">Games</Link></li>
            </>
          }
          {(!user || !user.email) &&
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Sign up</Link></li>
            </>
          }
          {!!user && !!user.email &&
            <>
              <li><button className={"button"} onClick={handleLogoutClick}>Logout</button></li>
            </>
          }
        </ul>
      </nav>
    </section>
  )
}

export default Navigation

import React from "react"
import { FirebaseContext, useAuth} from './Firebase';
import Header from "../components/header"
import Footer from "../components/footer"

const Layout = ({children}) => {
  const { user, firebase, loading } = useAuth();

    return (
      <FirebaseContext.Provider value={{user, firebase, loading}}>
        <Header/>
        <main id="contentArea" className="content contentArea">
            {children}
        </main>
        <Footer/>
      </FirebaseContext.Provider>
    )
}

export default Layout

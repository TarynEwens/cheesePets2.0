import auth0 from "auth0-js"

export const isBrowser = typeof window !== "undefined"

const tokens = {
  idToken: false,
  accessToken: false,
}

let user = {}

export const isAuthenticated = () => {
  return tokens.idToken !== false
}

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      redirectUri: process.env.AUTH0_CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email",
    })
  : {}

export const login = () => {
  console.log('login function');
  if (!isBrowser) {
    console.log('not is browser');
    return
  }

  auth.authorize()
}

export const logout = () => {
  console.log('logout function');
  tokens.accessToken = false
  tokens.idToken = false
  user = {}
  window.localStorage.setItem("isLoggedIn", false)

  auth.logout({
    returnTo: window.location.origin,
  })
}

const setSession = (cb = () => {}) => (err, authResult) => {
  console.log('set session');
  if (err) {
    if (err.error === "login_required") {
      login()
    }
  }
  if (authResult && authResult.accessToken && authResult.idToken) {
    tokens.idToken = authResult.idToken
    tokens.accessToken = authResult.accessToken

    auth.client.userInfo(tokens.accessToken, (_err, userProfile) => {
      user = userProfile
      window.localStorage.setItem("isLoggedIn", true)

      cb()
    })
  }
}

const setNonProtectedSession = (cb = () => {}) => (err, authResult) => {
  if (authResult && authResult.accessToken && authResult.idToken) {
    tokens.idToken = authResult.idToken
    tokens.accessToken = authResult.accessToken

    auth.client.userInfo(tokens.accessToken, (_err, userProfile) => {
      user = userProfile
      window.localStorage.setItem("isLoggedIn", true)
      cb()
    })
  }
}

export const checkSession = callback => {
  console.log('check session');
  const isLoggedIn = window.localStorage.getItem("isLoggedIn")
  console.log(isLoggedIn);
  if (isLoggedIn === "false" || isLoggedIn === null) {
    callback()
  }
  const protectedRoutes = [`/account`, `/callback`];
  const isProtectedRoute = protectedRoutes
    .map(route => window.location.pathname.includes(route))
    .some(route => route)
  if (isProtectedRoute) {
    auth.checkSession({}, setSession(callback))
  } else {
    auth.checkSession({}, setNonProtectedSession(callback))
  }
}

export const handleAuthentication = () => {
  console.log('handle authentication')
  auth.parseHash(setSession())
}

export const getProfile = () => {
  console.log('get profile')
  return user
}

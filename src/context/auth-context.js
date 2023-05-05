import { useEffect, createContext } from "react";

const AuthContext = createContext({
  token: "",
  isLogged: true,
  login: (token, expirationDate) => {},
  logout: () => {},
});

export function getTokenDuration() {
  const sotredTokenExpiration = localStorage.getItem("expiration");
  const expirationDate = new Date(sotredTokenExpiration);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) return null;
  return token;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
}

export function login(token, expirationDate) {
  localStorage.setItem("token", token);
  localStorage.setItem("expiration", expirationDate);
}

export const AuthContextProvider = (props) => {
  const { children } = props;
  const tokenData = getAuthToken();

  const isAuthUser = tokenData ? true : false;

  useEffect(() => {
    if (!tokenData) logout();
  }, [tokenData]);

  const contextValue = {
    token: tokenData,
    isLogged: isAuthUser,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

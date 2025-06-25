import Routes from "./src/routes.js";
import RoutesAuth from "./src/routesAuth.js";

export default function App() {
  // apenas para testes 
  const isUserAuth = true;
  return isUserAuth ? <RoutesAuth /> : <Routes />







    ;
}



import { StatusBar } from 'react-native';
import { colors } from './src/Constants/theme.js';
import Routes from "./src/routes.js";
import RoutesAuth from "./src/routesAuth.js";

export default function App() {
  // apenas para testes 
  const isUserAuth = true;
   return <>
    
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.second}
        translucent={false}
      />
      
      {isUserAuth ? <RoutesAuth /> : <Routes />}
    
  </>


    
}



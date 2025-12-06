import { createDrawerNavigator } from '@react-navigation/drawer';

// estilos
import Logo from '../../Components/Logo/Logo.jsx';
import { colors, font_size } from '../../Constants/theme.js';

// rotas
import MainTabs from './MainTabs.jsx';
import UserDocumentsList from '../UserDocumentsList/UserDocumentsList.jsx';
import BolsaNetInfo from '../BolsaNetInfo/BolsaNetInfo.jsx';
import ApplyForBenefits from '../ApplyForBenefits/ApplyForBenefits.jsx'

import { AuthContext } from '../../Contexts/auth.js';
import { useContext } from 'react';


const Drawer = createDrawerNavigator();

function DrawerNav() {
  
const {user}=useContext(AuthContext)
  return (
    <Drawer.Navigator screenOptions={{
      drawerPosition:'right',
      headerTitle: () => <Logo direction='row' description='BolsaNet' small={1} />,
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: colors.second },
      headerTintColor: colors.text_base,
      drawerItemStyle: {
        marginBottom: 20,
        borderBottomWidth: 0.3,
        borderBottomColor: colors.second,
           
      },
      drawerLabelStyle: {
        fontSize:font_size.xsm,
        color:colors.text_base,
        letterSpacing: 1,
      },
      drawerActiveBackgroundColor: colors.second,
    


    }}>

      <Drawer.Screen name='inicio' component={MainTabs} />
      <Drawer.Screen name='Documentos' component={ UserDocumentsList} />
      <Drawer.Screen name='Enviar Documentos' component={ ApplyForBenefits} />
      <Drawer.Screen name='Oque é esse programa?' component={BolsaNetInfo} />
    </Drawer.Navigator>
  );
}

export default DrawerNav;
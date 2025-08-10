import { createDrawerNavigator } from '@react-navigation/drawer';

// estilos
import Logo from '../../components/Logo/Logo.jsx';
import { colors, font_size } from '../../Constants/theme.js';

// rotas
import MainTabs from './MainTabs.jsx';
import Documents from '../Documents/Documents.jsx';

import { AuthContext } from '../../Contexts/auth.js';
import { useContext } from 'react';


const Drawer = createDrawerNavigator();

function DrawerNav() {
  
const {user}=useContext(AuthContext)
  return (
    <Drawer.Navigator screenOptions={{

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
      <Drawer.Screen name={user.fullName} component={Documents} />
      <Drawer.Screen name='Documentos pessoais' component={Documents} />
      <Drawer.Screen name='Documentos Escolares ' component={Documents} />
      <Drawer.Screen name='Oque é esse programa?' component={Documents} />


    </Drawer.Navigator>
  );
}

export default DrawerNav;
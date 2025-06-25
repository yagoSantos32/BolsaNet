import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// estilos
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons.js'; // ou qualquer outra lib de ícones
import { colors } from './constants/theme.js';
//rotas
import Home from './screens/home/home.jsx';
import Support from './screens/support/support.jsx';

//outros

import Logo from './components/logo/logo.jsx';
import { TouchableOpacity, View } from 'react-native';

const Tab = createBottomTabNavigator();
function RoutesAuth() {
    return <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name='Home'
                component={Home}
                options={{
                    headerTitle: () => <Logo direction="row" description="BolsaNet" small={1} />,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <View style={{ paddingRight: 16 }}>
                                <SimpleLineIcons name="menu" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    ),

                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: colors.second },
                    headerTintColor: colors.text_base,


                }}
            />

            <Tab.Screen
                name='Support'
                component={Support}
                options={{
                    headerTitle: () => <Logo direction="row" description="BolsaNet" small={1} />,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <View style={{ paddingRight: 16 }}>
                                <SimpleLineIcons name="menu" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    ),

                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: colors.second },
                    headerTintColor: colors.text_base,


                }}
            />

        </Tab.Navigator>
    </NavigationContainer>
}
export default RoutesAuth;
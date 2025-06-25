import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// estilos
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons.js'; // ou qualquer outra lib de ícones
import { colors } from './constants/theme.js';
// rotas
import Login from './screens/login/login.jsx';
import Register from './screens/register/register.jsx';
import Register2 from './screens/register2/register2.jsx';


import Home from './screens/home/home.jsx';
import Logo from './components/logo/logo.jsx';


const Stack = createNativeStackNavigator()
function Routes() {
    return <NavigationContainer>
        <Stack.Navigator >

            <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            />


            <Stack.Screen
                name='Register'
                component={Register}
                options={{
                    animation: 'slide_from_right',
                    title: '',
                    headerBackTitle: 'Voltar',
                    headerTintColor: colors.primary,
                    headerShadowVisible: false,
                    headerTransparent: true

                }}


            />

            <Stack.Screen
                name='Register2'
                component={Register2}
                options={{
                    animation: 'slide_from_right',
                    title: '',
                    headerBackTitle: 'Voltar',
                    headerTintColor: colors.primary,
                    headerShadowVisible: false,
                    headerTransparent: true

                }}

            />

            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    headerTitle: () => <Logo direction="row" description="BolsaNet" small={1} />,
                    headerRight: () => (
                        <SimpleLineIcons name="menu" size={24} color="black" />


                    ),
                    headerBackTitle: 'Voltar',
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: colors.second },
                    headerTintColor: colors.text_base,


                }}


            />


        </Stack.Navigator>
    </NavigationContainer>

}
export default Routes;
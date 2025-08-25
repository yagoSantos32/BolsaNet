import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// estilos
import { colors } from './Constants/theme.js';
// rotas
import Login from './Screens/Login/Login.jsx';
import Register from './Screens/Register/Register.jsx';
import Register2 from './Screens/Register2/Register2.jsx';



const Stack = createNativeStackNavigator();
function RoutesOpen() {
    return <NavigationContainer>
        <Stack.Navigator screenOptions={{
                    animation: 'slide_from_right',
                    title: '',
                    headerBackTitle: 'Voltar',
                    headerTintColor: colors.primary,
                    headerShadowVisible: false,
                    headerTransparent: true

                }}>

            <Stack.Screen
            
                name='Login'
                component={Login}
                options={{headerShown: false }}
            />


            <Stack.Screen
                name='Register'
                component={Register}
           
            />

            <Stack.Screen
                name='Register2'
                component={Register2}
                

            />

        </Stack.Navigator>
    </NavigationContainer>

}
export default RoutesOpen;

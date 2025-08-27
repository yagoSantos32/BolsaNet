import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNav from './Screens/Navigations/DrawerNav';

const Stack = createNativeStackNavigator();
function RoutesAuth() {
    return <NavigationContainer>
        <Stack.Navigator  >
            <Stack.Screen
                name='DrawerNav'
                component={DrawerNav}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>

    </NavigationContainer>
}
export default RoutesAuth;
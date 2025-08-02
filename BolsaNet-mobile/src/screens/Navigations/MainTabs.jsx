import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image } from 'react-native';
//rotas
import Home from '../Home/Home.jsx';
import Support from '../Support/Support.jsx';
import EventSchedule from '../EventSchedule/EventSchedule.jsx';
//estilos
import icons from '../../Constants/icons.js';



const Tab = createBottomTabNavigator();
function MainTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'

            screenOptions={{
                headerShown: false,
                tabBarActiveBackgroundColor: '#3b1468ff',
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: '#9464d3ff' },


            }}>
            <Tab.Screen
                name='Support'
                component={Support}
                options={{
                    tabBarIcon: () => (

                        <Image
                            source={icons.supportIcon}
                            style={{
                                width: "100%",
                                height: "100%",
                                tintColor: "#f9f9f9"
                            }}

                        />

                    )
                }}

            />

            <Tab.Screen name='Home'
                component={Home}
                options={{
                    tabBarIcon: () => (

                        <Image
                            source={icons.homeIcon}
                            style={{
                                width: "100%",
                                height: "100%",
                                tintColor: "#f9f9f9"
                            }}

                        />

                    )
                }}
            />

            <Tab.Screen
                name='EventSchedule'
                component={EventSchedule}
                  options={{
                    tabBarIcon: () => (

                        <Image
                            source={icons.eventScheduleIcon}
                            style={{
                                width: "100%",
                                height: "100%",
                                tintColor: "#f9f9f9"
                            }}

                        />

                    )
                }}

            />
        </Tab.Navigator>
    )
}

export default MainTabs;
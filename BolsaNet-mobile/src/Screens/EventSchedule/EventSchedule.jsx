import { Text, View, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';
import sharedStyles from '../../Constants/sharedStyles.js';
import Input from '../../Components/Input/Input.jsx';
import Button from '../../Components/Button/Button.jsx';

function EventSchedule() {
    const today = new Date().toLocaleDateString('sv-SE');
    const [day, setDay] = useState();
    return <View style={[sharedStyles.container, { justifyContent: 'flex-start' }]}>

        <Calendar
            style={{ backgroundColor: 'transparent', marginBottom: 20 }}

            theme={{
                calendarBackground: 'transparent',


            }}
            hideExtraDays

            dayComponent={({ date }) => {
                const isToday = date.dateString === today;
                const isSelected = date.dateString === day?.dateString;

                return (
                    <TouchableOpacity onPress={() => setDay(date)} style={{
                        alignItems: 'center',
                        justifyContent: 'center', width: 40,
                        height: 34,
                        borderRadius: 17,
                        backgroundColor: isSelected
                            ? '#7948b1ff'
                            : isToday ? '#3b1468ff' : '#d9cff1ff',
                        borderWidth: isSelected ? 2.5 : 0,
                        borderColor: '#d9cff1ff'


                    }}>
                        <Text style={{ color: isSelected || isToday ? '#fff' : '#000', fontSize: 15, }}>{date.day}</Text>
                    </TouchableOpacity>
                );
            }}

        />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1 }}>
                <Input placeholder='Mensagem' multiline={true} />

            </View>
            <Button custom ={true} txt='>' />


        </View>
    </View>
}


export default EventSchedule;
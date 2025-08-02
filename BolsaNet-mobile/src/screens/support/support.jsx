import { ScrollView, View } from 'react-native';
import { useState,useRef, useEffect } from 'react';
import SpeechBubble from '../../components/SpeechBubble/SpeechBubble.jsx';
import sharedStyles from '../../Constants/sharedStyles.js';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';

function Support() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 0,sent: 0, text: 'diga-me como posso te ajudar' },
    ]);
    const scrollViewRef = useRef();
    function processMessage() {
        if (message.trim() === '') return;
        setMessages(prev => [...prev, {id: Date.now(), sent: 1, text: message }])
        setMessage('');
    }
    useEffect(()=>{
        if(scrollViewRef.current){
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    },[messages]);
    return (
        <View style={[sharedStyles.container, { padding: 5 }]}>
            <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>

                {messages.map((msg, index) => (
                    <SpeechBubble key={msg.id} sent={msg.sent} message={msg.text} />
                ))}

              
            </ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Input placeholder='Mensagem' multiline={true} autoFocus={true} value={message} onChangeText={setMessage} />

                </View>

                <Button custom={{ width: 60, borderRadius: 10, padding: 5, margin: 3, backgroundColor: '#3b1468ff' }}
                    onPress={() => processMessage()}

                    txt='>' />
            </View>

        </View>
    )
}

export default Support;
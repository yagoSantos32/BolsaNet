import { View, FlatList } from 'react-native';
import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import io from 'socket.io-client';

import SpeechBubble from '../../Components/SpeechBubble/SpeechBubble.js';
import Input from '../../Components/Input/Input.js';
import Button from '../../Components/Button/Button.js';
import sharedStyles from '../../Constants/sharedStyles.js';
import { AuthContext } from '../../Contexts/auth.js';

function Support() {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);


    const flatListRef = useRef();
    const socketRef = useRef(null); 

   
    useEffect(() => {
        const socket = io(process.env.EXPO_PUBLIC_API_URL, {
            auth: { token: user.token }
        });

        socketRef.current = socket; 

        socket.on('connect', () => {
            socket.emit('ListConversationByUser');
        });

        socket.on('conversationByUser', (conversations) => {
            setMessages(conversations);
        });

        socket.on('newMessage', (newMsg) => {
            setMessages(prev => {
                const exists = prev.some(msg => msg.idMessage === newMsg.idMessage);
                return exists ? prev : [...prev, newMsg];
            });
        });

        socket.on('erroMensagens', (data) => {
            console.log('Erro ao carregar mensagens:', data.error);
        });

        return () => socket.disconnect();
    }, [user.token]);

    function SendMessage() {
        if (message.trim()) {
            socketRef.current.emit('sendMessage', {
                senderId: user.iduser,
                message: message.trim()

            });
        
        }
        setMessage('');
    }
    // Scroll automático para o final da lista
    useEffect(() => {
        if (flatListRef.current && messages.length) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    return (
        <View style={[sharedStyles.container, { padding: 5 }]}>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.idMessage.toString()}

                renderItem={({ item }) => (
                    <SpeechBubble
                        sent={item.senderId === user.iduser}
                        message={item.message}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                <View style={{ flex: 1 }}>
                    <Input
                        placeholder='Mensagem'
                        multiline={true}
                        autoFocus={true}
                        value={message}
                        onChangeText={setMessage}
                    />
                </View>

                <Button custom={true}
                    onPress={() => SendMessage()}

                    txt='>' />
            </View>
        </View>
    );
}

export default Support;
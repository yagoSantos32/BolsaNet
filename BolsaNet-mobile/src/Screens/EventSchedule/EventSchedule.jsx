import { Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';

import { Calendar } from 'react-native-calendars';
import "../../Constants/calendarLocale.js";
import { useState, useEffect } from 'react';
import sharedStyles from '../../Constants/sharedStyles.js';
import Input from '../../Components/Input/Input.jsx';
import Button from '../../Components/Button/Button.jsx';
import { LoadUser } from '../../Storage/storage.user.js';
import { loadUserTasks, saveUserTasks } from '../../Storage/storage.tasks.js';
import api from '../../Constants/api.js';
import * as DocumentPicker from 'expo-document-picker';

function EventSchedule() {
    const today = new Date().toISOString().split("T")[0];

    const [iduser, setiduser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [day, setDay] = useState();
    const [message, setMessage] = useState('');
    const [apiDate, setApiDate] = useState(null);

    // -------------------------
    // 1. Carregar usuário + tarefas (sem automáticas)
    // -------------------------
    useEffect(() => {
        async function loadUserData() {
            const user = await LoadUser();

            if (user?.iduser) {
                setiduser(user.iduser);

                const savedTasks = await loadUserTasks(user.iduser);
                const filtered = (savedTasks || []).filter(t => !t.auto);

                setTasks(filtered);
            }
        }
        loadUserData();
    }, []);

    // -------------------------
    // 2. Buscar data do benefício
    // -------------------------
    useEffect(() => {
        async function fetchBenefit() {
            try {
                const res = await api.get('/benefitPeriod');
                const data = res.data;

                if (Array.isArray(data) && data.length > 0) {
                    const dateStr = `${data[0].yearMonth}-06`; // sua data automática
                    setApiDate(dateStr);
                }
            } catch (err) {
                console.log('Erro ao carregar benefício:', err);
            }
        }
        fetchBenefit();
    }, []);

    // -------------------------
    // 3. Criar tarefa automática (somente memória)
    // -------------------------
    useEffect(() => {
        if (!iduser || !apiDate) return;

        const diffDays = Math.ceil(
            (new Date(apiDate) - new Date(today)) /
            (1000 * 60 * 60 * 24)
        );

        if (diffDays <= 5 && diffDays >= 0) {
            const exists = tasks.some(t => t.auto && t.fullDate === apiDate);

            if (!exists) {
                const autoTask = {
                    fullDate: apiDate,
                    dayNumber: Number(apiDate.split('-')[2]),
                    message: 'Renovar o benefício',
                    auto: true
                };

                const updated = [autoTask, ...tasks];
                setTasks(updated);
            }
        }
    }, [apiDate, tasks, iduser]);

    // -------------------------
    // 4. Criar tarefa manual
    // -------------------------
    const handleAddTask = () => {
        if (!day || !message.trim()) return;

        const newTask = {
            fullDate: day.dateString,
            dayNumber: day.day,
            message: message.trim(),
            auto: false
        };

        const updated = [...tasks, newTask];

        saveUserTasks(iduser, updated.filter(t => !t.auto));
        setTasks(updated);
        setMessage('');
    };

    // -------------------------
    // 5. Envio automático de PDF ao clicar na tarefa automática
    // -------------------------
    async function handleAutoTaskUpload() {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf'],
                copyToCacheDirectory: true
            });

            if (result.canceled || !result.assets?.length) {
                return;
            }

            const file = result.assets[0];

            const formData = new FormData();
            formData.append('document', {
                uri: file.uri.startsWith('file://') ? file.uri : 'file://' + file.uri,
                name: file.name,
                type: 'application/pdf'
            });

            await api.post('/documents/uploads', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            Alert.alert("Sucesso", "Documento enviado!");
        } catch (err) {
            console.log(err);
            Alert.alert("Erro", "Falha ao enviar documento.");
        }
    }

    // -------------------------
    // Render
    // -------------------------
    return (
        <View style={[sharedStyles.container, { justifyContent: 'flex-start' }]}>
            <Calendar
                style={{ backgroundColor: 'transparent', marginBottom: 20 }}
                theme={{ calendarBackground: 'transparent' }}
                hideExtraDays
                dayComponent={({ date }) => {
                    const isToday = date.dateString === today;
                    const isSelected = date.dateString === day?.dateString;
                    const isPast = date.dateString < today;

                    return (
                        <TouchableOpacity
                            disabled={isPast}
                            onPress={() => !isPast && setDay(date)}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 40,
                                height: 34,
                                borderRadius: 17,
                                backgroundColor: isSelected
                                    ? '#7948b1ff'
                                    : isToday ? '#3b1468ff' : '#d9cff1ff',
                                borderWidth: isSelected ? 2.5 : 0,
                                borderColor: '#d9cff1ff',
                                opacity: isPast ? 0.6 : 1
                            }}
                        >
                            <Text style={{
                                color: isSelected || isToday ? '#fff' : '#000',
                                fontSize: 15
                            }}>
                                {date.day}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Input
                        placeholder="Mensagem"
                        multiline={true}
                        value={message}
                        onChangeText={setMessage}
                    />
                </View>
                <Button custom={true} txt=">" onPress={handleAddTask} />
            </View>

           <ScrollView style={{ marginTop: 20, maxHeight: 250 }}>
    {[...tasks]
        .sort((a, b) => {
            if (a.auto && !b.auto) return -1;
            if (!a.auto && b.auto) return 1;
            return new Date(a.fullDate) - new Date(b.fullDate);
        })
        .map((task, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    if (task.auto) {
                        handleAutoTaskUpload();
                    }
                }}
                style={{ paddingVertical: 6 }}
            >
                <Text style={{ fontSize: 16 }}>
                    📌 Dia {task.dayNumber}: {task.message}
                    {task.auto && " (clique para Enviar documentos)"}
                </Text>
            </TouchableOpacity>
        ))
    }
</ScrollView>

        </View>
    );
}

export default EventSchedule;

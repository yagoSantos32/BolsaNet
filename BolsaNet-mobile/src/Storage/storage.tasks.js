import AsyncStorage from '@react-native-async-storage/async-storage';

// Carregar tarefas do usuário
export async function loadUserTasks(iduser) {
    try {
        const json = await AsyncStorage.getItem(`tasks_user_${iduser}`);
        return json ? JSON.parse(json) : [];
    } catch (err) {
        console.log('Erro ao carregar tarefas do AsyncStorage:', err);
        return [];
    }
}

// Salvar tarefas do usuário
export async function saveUserTasks(iduser, tasks) {
    try {
        await AsyncStorage.setItem(`tasks_user_${iduser}`, JSON.stringify(tasks));
        console.log(`Tarefas salvas para o usuário ${iduser}:`, tasks);
    } catch (err) {
        console.log('Erro ao salvar tarefas no AsyncStorage:', err);
    }
}

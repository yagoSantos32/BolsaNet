import { Alert,ScrollView, View } from 'react-native';
import { useState } from 'react';

import sharedStyles from '../../Constants/sharedStyles.js';
import { styles } from './register.style.js';

import Logo from '../../Components/Logo/Logo.jsx';
import Input from '../../Components/Input/Input.jsx';
import Button from '../../Components/Button/Button.jsx';

function Register(props) {
    // Estados dos campos
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function goToNextStep() {
    if (!fullName || !email || !password || !confirmPassword) {
        Alert.alert('Por favor, preencha todos os campos.');
        return;
    }

    if (password !== confirmPassword) {
        Alert.alert('As senhas não coincidem.');
        return;
    }

    props.navigation.navigate('Register2', { fullName, email, password });
}

    // Definição “declarativa” dos campos
    const fields = [
        { key: 'fullName', label: 'Nome Completo', value: fullName, setter: setFullName, isPassword: false },
        { key: 'email', label: 'E-mail', value: email, setter: setEmail, isPassword: false },
        { key: 'password', label: 'Senha', value: password, setter: setPassword, isPassword: true },
        { key: 'confirmPassword', label: 'Confirmar Senha', value: confirmPassword, setter: setConfirmPassword, isPassword: true },
    ];

    return (
        <View style={sharedStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Logo description='Criar uma conta.' />

                <View style={styles.form}>
                    {fields.map(({ key, label, value, setter, isPassword }) => (
                        <View key={key} style={styles.formBox}>
                            <Input
                                label={label}
                                isPassword={isPassword}
                                value={value}
                                onChangeText={setter}
                            />
                        </View>
                    ))}

                    <Button
                        txt='Próximo'
                        onPress={goToNextStep}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default Register;

// Nota:
// 1. Usuário digita no TextInput.
// 2. onChangeText do Input é acionado.
// 3. Input chama props.onChangeText(text).
// 4. Essa função atualiza o estado no componente Register.

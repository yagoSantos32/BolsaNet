// Register.jsx
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import sharedStyles from '../../Constants/sharedStyles.js';
import { styles } from './register.style.js';
import Logo from '../../components/Logo/Logo.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';

function Register(props) {
    // Estados dos campos
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    // Definição “declarativa” dos campos
    const fields = [
        { key: 'fullName', label: 'Nome Completo', value: fullName, setter: setFullName, password: false },
        { key: 'email', label: 'E-mail', value: email, setter: setEmail, password: false },
        { key: 'pass', label: 'Senha', value: pass, setter: setPass, password: true },
        { key: 'confirmPass', label: 'Confirmar Senha', value: confirmPass, setter: setConfirmPass, password: true },
    ];

    return (
        <View style={sharedStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Logo description='Criar uma conta.' />

                <View style={styles.form}>
                    {fields.map(({ key, label, value, setter, password }) => (
                        <View key={key} style={styles.formBox}>
                            <Input
                                label={label}
                                password={password}
                                value={value}
                                onChangeText={setter}
                            />
                        </View>
                    ))}

                    <Button
                        txt='Próximo'
                        onPress={() => props.navigation.navigate('Register2')}
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

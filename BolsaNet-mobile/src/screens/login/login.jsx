// Login.jsx
import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import sharedStyles from '../../constants/sharedStyles.js';
import { styles } from './login.style.js';
import Logo from '../../components/logo/logo.jsx';
import Input from '../../components/input/input.jsx';
import Button from '../../components/button/button.jsx';

function Login(props) {
    // Estados dos campos
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    // Definição “declarativa” dos campos
    const fields = [
        { key: 'email', label: 'E-mail', value: email, setter: setEmail, password: false },
        { key: 'pass', label: 'Senha', value: pass, setter: setPass, password: true },
    ];

    function processLogin() {

        props.navigation.navigate('Home');
    }

    return (
        <View style={sharedStyles.container}>
            <Logo description="Acesse sua conta." />

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

                <Button txt="Entrar" onPress={processLogin} />
            </View>


            <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                <Text style={styles.footerTxt}>Criar uma conta.</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Login;

// nota:
// 1. Usuário digita no TextInput.
// 2. onChangeText do Input é acionado.
// 3. Input chama a função recebida por props.onChangeText(text).
// 4. Essa função atualiza o estado no componente Login.

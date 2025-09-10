import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import api from '../../Constants/api.js'
import { LoadUser, SaveUser } from '../../Storage/storage.user.js';
import { AuthContext } from '../../Contexts/auth.js';

import sharedStyles from '../../Constants/sharedStyles.js';
import { styles } from './login.style.js';

import Logo from '../../Components/Logo/Logo.jsx';
import Input from '../../Components/Input/Input.jsx';
import Button from '../../Components/Button/Button.jsx';

function Login(props) {
    // Estados dos campos
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(AuthContext)

    async function processLogin() {
        const user = {
            email,
            password,
        };
        const cleanedUser = Object.fromEntries(
            Object.entries(user).map(([key, value]) =>
                typeof value === "string" ? [key, value.trim()] : [key, value]
            )
        );

        try {
            setLoading(true);
            const response = await api.post('/user/login', cleanedUser);
            // salvar dados do usuario no storege local 
            if (response.data) {
                api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token
                await SaveUser(response.data)
                setUser(response.data)

            }

        } catch (error) {
            setLoading(false);
            await SaveUser({})
            if (error.response?.data.error)
                Alert.alert(error.response.data.error.toString());
            else
                Alert.alert("ocorreu um erro. tente novamente mais tarde");
        }

    };

    async function loadDatas() {
        try {
            // await api.get('/validateJWT')
            const user = await LoadUser()
            if (user.token) {
                api.defaults.headers.common['Authorization'] = "Bearer " + user.token
                await api.get('/validateJWT')
            }


            setUser(user)
        } catch (error) {
            console.error('Erro ao carregar usuário:', error);
        }

    }

    useEffect(() => {
        loadDatas()
    }, [])


    // Definição “declarativa” dos campos
    const fields = [
        { key: 'email', label: 'E-mail', value: email, setter: setEmail, password: false },
        { key: 'pass', label: 'Senha', value: password, setter: setPassword, isPassword: true },
    ];

    return (
        <View style={sharedStyles.container}>
            <Logo description='Acesse sua conta.' />

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

                <Button isLoading={loading} txt='Entrar' onPress={processLogin} />
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

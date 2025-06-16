import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { styles } from './login.style.js';
import Logo from "../../components/logo/logo.jsx";
import Input from "../../components/input/input.jsx";
import Button from "../../components/button/button.jsx";



function Login(props) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    function processlogin() {
        props.navigation.navigate('Home')
        console.log(email, pass)
    }

    return <View style={styles.container} >

        <Logo description='Acesse sua conta.' />

        <View style={styles.form}>
            <View style={styles.formBox}>
                <Input label='E-mail' onChangeText={(email) => setEmail(email)} value={email} />
            </View>
            <View style={styles.formBox}>
                <Input label='Senha' password={true} onChangeText={(pass) => setPass(pass)} value={pass} />
            </View>

            <Button txt='Entrar' onPress={processlogin} />

        </View>



        <View>
            <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                <Text style={styles.footerTxt}>Criar uma conta.</Text>
            </TouchableOpacity>

        </View>
    </View>


}

export default Login;


// nota "Usuário digita no TextInput.

// onChangeText do Input é acionado.

// Input chama a função recebida por props.onChangeText(text).

// Essa função atualiza o estado no componente Login."
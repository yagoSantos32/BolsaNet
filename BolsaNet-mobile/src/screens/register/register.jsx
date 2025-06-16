import { ScrollView, View } from "react-native";
import { useState } from "react";
import { styles } from './register.style.js';
import Logo from "../../components/logo/logo.jsx";
import Input from "../../components/input/input.jsx";
import Button from "../../components/button/button.jsx";


function Register(props) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    return <View style={styles.container}>

        <ScrollView>
            <Logo description='Criar uma conta.' />

            <View style={styles.form}>
                <View style={styles.formBox}>
                    <Input label='Nome Completo' onChangeText={(fullName) => setFullName(fullName)} value={fullName} />
                </View>
                <View style={styles.formBox}>
                    <Input label='E-mail' onChangeText={(email) => setEmail(email)} value={email} />
                </View>
                <View style={styles.formBox}>
                    <Input label='Senha' password={true} onChangeText={(pass) => setPass(pass)} value={pass} />
                </View>
                <View style={styles.formBox}>
                    <Input label='Confirmar Senha' password={true} onChangeText={(confirmPass) => setConfirmPass(confirmPass)} value={confirmPass} />
                </View>


                <Button txt='Proximo' onPress={() => props.navigation.navigate('Register2')} />

            </View>



        </ScrollView>
    </View>


}

export default Register;
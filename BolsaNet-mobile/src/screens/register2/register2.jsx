import { ScrollView, View } from "react-native";
import { useState } from "react";
import { styles } from './register2.style.js';
import Logo from "../../components/logo/logo.jsx";
import Input from "../../components/input/input.jsx";
import Button from "../../components/button/button.jsx";


function Register2(props) {

    const [cpf, setCpf] = useState('')
    const [cep, setCep] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
    const [district, setDistrict] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')



    return <View style={styles.container} >

        <ScrollView>
            <Logo description='Criar uma conta.' />

            <View style={styles.form}>

                <View style={styles.formBox}>
                    <Input label='CPF' onChangeText={(cpf) => setCpf(cpf)} value={cpf} />
                </View>

                <View style={styles.formBox}>
                    <Input label='CEP' onChangeText={(cep) => setCep(cep)} value={cep} />
                </View>

                <View style={styles.splitFormBox}>
                    <View style={styles.formBox_2fr}>
                        <Input label='Cidade' onChangeText={(city) => setCity(city)} value={city} />
                    </View>
                    <View style={styles.formBox_1fr}>
                        <Input label='UF' onChangeText={(uf) => setUf(uf)} value={uf} />
                    </View>
                </View>

                <View style={styles.formBox}>
                    <Input label='Bairro' onChangeText={(district) => setDistrict(district)} value={district} />
                </View>

                <View style={styles.splitFormBox}>
                    <View style={styles.formBox_2fr}>
                        <Input label='Rua' onChangeText={(street) => setStreet(street)} value={street} />
                    </View>
                    <View style={styles.formBox_1fr}>
                        <Input label='Numero' onChangeText={(number) => setNumber(number)} value={number} />
                    </View>
                </View>


                <Button txt='Concluir' onPress={() => props.navigation.navigate('Home')} />

            </View>



        </ScrollView>
    </View>


}

export default Register2;


// lembra de colocar isso tudo em um for 
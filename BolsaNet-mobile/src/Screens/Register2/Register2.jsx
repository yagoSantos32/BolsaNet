import { Alert, ScrollView, View } from 'react-native';
import { useContext, useState } from 'react';
import api from '../../Constants/api.js';
import { SaveUser } from '../../Storage/storage.user.js';
import { AuthContext } from '../../Contexts/auth.js';


import sharedStyles from '../../Constants/sharedStyles.js';
import { styles } from './register2.style.js';

import Logo from '../../Components/Logo/Logo.jsx';
import Input from '../../Components/Input/Input.jsx';
import Button from '../../Components/Button/Button.jsx';

function Register2(props) {
    const { fullName, email, password } = props.route.params;
    // Estados dos campos

    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext)
    
    async function processRegister() {
        if (!cpf || !cep || !city || !uf || !district || !street || !number) {
            Alert.alert("Por favor, preencha todos os campos.");
            return;
        };

        const user = {
            fullName,
            email,
            password,
            cpf,
            cep,
            city,
            uf,
            district,
            street,
            number,
            admin: 0,
            status: "nao_solicitado"

        };
        const cleanedUser = Object.fromEntries(
            Object.entries(user).map(([key, value]) =>
                typeof value === 'string' ? [key, value.trim()] : [key, value]
            )
        );

        try {
            setLoading(true)

            const response = await api.post('/user/register', [cleanedUser]);

            if (response.data) {

                await SaveUser(response.data)
                setUser(response.data)

            }
        } catch (error) {
            setLoading(false)
            await SaveUser({})
            if (error.response?.data.error)
                Alert.alert(error.response.data.error.toString());
            else
                Alert.alert("ocorreu um erro. tente novamente mais tarde");
        };

    };

    // Agrupamento dos campos para renderização dinâmica
    const groups = [
        [{ key: 'cpf', label: 'CPF', value: cpf, setter: setCpf }],
        [{ key: 'cep', label: 'CEP', value: cep, setter: setCep }],
        [
            { key: 'city', label: 'Cidade', value: city, setter: setCity, style: 'formBox_2fr' },
            { key: 'uf', label: 'UF', value: uf, setter: setUf, style: 'formBox_1fr' },
        ],
        [{ key: 'district', label: 'Bairro', value: district, setter: setDistrict }],
        [
            { key: 'street', label: 'Rua', value: street, setter: setStreet, style: 'formBox_2fr' },
            { key: 'number', label: 'Numero', value: number, setter: setNumber, style: 'formBox_1fr' },
        ],
    ];

    return (
        <View style={sharedStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <Logo description='Criar uma conta.' />

                <View style={styles.form}>
                    {groups.map((group, gindex) => (
                        group.length > 1
                            // splitFormBox: dois inputs lado a lado
                            ? (
                                <View key={gindex} style={styles.splitFormBox}>
                                    {group.map(field => (
                                        <View key={field.key} style={styles[field.style]}>
                                            <Input
                                                label={field.label}
                                                value={field.value}
                                                onChangeText={field.setter}
                                            />
                                        </View>
                                    ))}
                                </View>
                            )
                            // formBox: input em linha única
                            : (
                                <View key={gindex} style={styles.formBox}>
                                    <Input
                                        label={group[0].label}
                                        value={group[0].value}
                                        onChangeText={group[0].setter}
                                    />
                                </View>
                            )
                    ))}

                    <Button
                        txt='Concluir'
                        isLoading={loading}
                        onPress={processRegister}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default Register2;

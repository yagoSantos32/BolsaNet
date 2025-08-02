// Register2.jsx
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import sharedStyles from '../../Constants/sharedStyles.js';
import { styles } from './register2.style.js';
import Logo from '../../components/Logo/Logo.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';

function Register2(props) {
    // Estados dos campos
    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');

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
                    {groups.map((group, gi) => (
                        group.length > 1
                            // splitFormBox: dois inputs lado a lado
                            ? (
                                <View key={gi} style={styles.splitFormBox}>
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
                                <View key={gi} style={styles.formBox}>
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
                        onPress={() => props.navigation.navigate('Home')}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default Register2;

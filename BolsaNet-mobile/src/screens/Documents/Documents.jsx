import { Image, View } from "react-native";
import sharedStyles from "../../Constants/sharedStyles";

import { useState } from "react";
import * as DocumentPicker from 'expo-document-picker';
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import icons from "../../Constants/icons";
import Logo from "../../components/Logo/Logo";


function Documents() {
    const [documents, setDocuments] = useState({
        rg: null,
        comprovanteResidencia: null,
        comprovanteRenda: null,
        matricula: null,
        historicoEscolar: null
    });
    const fields = [
        { key: 'rg', placeholder: 'Selecionar RG', label: 'RG' },
        { key: 'comprovanteResidencia', placeholder: 'Selecionar Comprovante', label: 'Comprovante de Residência' },
        { key: 'comprovanteRenda', placeholder: 'Selecionar Comprovante', label: 'Comprovante de Renda' },
        { key: 'matricula', placeholder: 'Selecionar Matrícula', label: 'Matrícula' },
        { key: 'historicoEscolar', placeholder: 'Selecionar Histórico Escolar', label: 'Histórico Escolar' },
    ];

    async function SubmitBenefitDocuments(field) {
        let resulte = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
            copyToCacheDirectory: true
        })
        if (resulte.assets) {
            setDocuments(prev => ({
                ...prev,
                [field]: resulte.assets[0].name
            }));
        }

    }
    return <View style={sharedStyles.container}>
{/* <Logo description="faça seu pedido"/> */}

        {fields.map(field => (
            <View key={field.key} style={{ flexDirection: 'row', alignItems: "center",marginBottom:20 }}>

                <View style={{ width: '90%', paddingRight: 10 }}>
                    <Input
                        showKeyboard={false}
                        placeholder={documents[field.key] || field.placeholder}
                        label={field.label}
                        onPress={() => SubmitBenefitDocuments(field.key)} />
                </View>

                <View style={{ width: '10%', marginTop: "auto"}}>
                    <Image
                    
                        source={documents[field.key] ?
                            icons.documentSelectedIcon :
                            icons.documentNotSelectedIcon} />
                </View>

            </View>

        ))}


        <Button txt="Enviar" />

    </View>
}

export default Documents;
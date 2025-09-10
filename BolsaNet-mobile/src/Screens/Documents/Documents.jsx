import { Image, View, Alert } from "react-native";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import sharedStyles from "../../Constants/sharedStyles";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import icons from "../../Constants/icons";
import api from "../../Constants/api";

// Componente para um campo de documento
function DocumentField({ field, value, onSelect }) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <View style={{ width: "90%", paddingRight: 10 }}>
                <Input
                    showKeyboard={false}
                    placeholder={value?.name || field.placeholder}
                    label={field.label}
                    onPress={onSelect}
                />
            </View>
            <View style={{ width: "10%", marginTop: "auto" }}>
                <Image
                    source={value ? icons.documentSelectedIcon : icons.documentNotSelectedIcon}
                />
            </View>
        </View>
    );
}

function Documents() {
    const [documents, setDocuments] = useState({
        rg: null,
        comprovanteResidencia: null,
        comprovanteRenda: null,
        matricula: null,
        historicoEscolar: null
    });

    const [loading, setLoading] = useState(false);

    const fields = [
        { key: "rg", placeholder: "Selecionar RG", label: "RG" },
        { key: "comprovanteResidencia", placeholder: "Selecionar Comprovante", label: "Comprovante de Residência" },
        { key: "comprovanteRenda", placeholder: "Selecionar Comprovante", label: "Comprovante de Renda" },
        { key: "matricula", placeholder: "Selecionar Matrícula", label: "Matrícula" },
        { key: "historicoEscolar", placeholder: "Selecionar Histórico Escolar", label: "Histórico Escolar" },
    ];

    //  Seleção de arquivos
    async function SelectBenefitDocuments(field) {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["application/pdf"],
                copyToCacheDirectory: true
            });

            if (!result.canceled && result.assets?.length > 0) {
                const file = result.assets[0];
                setDocuments(prev => ({
                    ...prev,
                    [field]: {
                        name: file.name,
                        uri: file.uri
                    }
                }));
            }
        } catch (err) {
            console.error("Erro ao selecionar documento:", err);
            Alert.alert("Erro", "Não foi possível selecionar o documento.");
        }
    }

    // Validação
    function validateDocuments() {
        for (const key of Object.keys(documents)) {
            if (!documents[key]) return false;
        }
        return true;
    }

    //  Envio
    async function SubmitBenefitDocuments() {
        if (!validateDocuments()) {
            Alert.alert("Atenção", "Por favor, selecione todos os documentos obrigatórios.");
            return;
        }

        const formData = new FormData();
        Object.keys(documents).forEach(key => {
            const file = documents[key];
            if (file) {
                formData.append(key, {
                    uri: file.uri.startsWith("file://") ? file.uri : "file://" + file.uri,
                    name: file.name,
                    type: "application/pdf"
                });
            }
        });

        setLoading(true);
        try {
            await api.post("/documents/uploads", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            Alert.alert("Sucesso", "Upload concluído com sucesso!");

        } catch (error) {

            Alert.alert("Erro", "Não foi possível enviar os documentos. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={sharedStyles.container}>
            {fields.map(field => (
                <DocumentField
                    key={field.key}
                    field={field}
                    value={documents[field.key]}
                    onSelect={() => SelectBenefitDocuments(field.key)}
                />
            ))}

            <Button
                txt="Enviar"
                onPress={SubmitBenefitDocuments}
                isLoading={loading}
            />
        </View>
    );
}

export default Documents;

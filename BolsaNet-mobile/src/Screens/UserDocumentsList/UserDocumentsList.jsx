import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import api from "../../Constants/api";
import sharedStyles from "../../Constants/sharedStyles";
import Button from "../../Components/Button/Button";
import { AuthContext } from "../../Contexts/auth";

function UserDocumentsList() {
  const { user } = useContext(AuthContext);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  async function loadDocuments() {
    try {
      setLoading(true);

      const res = await api.get(`/user/${user.iduser}/documents`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setDocs(res.data || []);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível carregar os documentos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user && user.iduser) loadDocuments();
  }, [user]);

  // BAIXA VIA /documents/download/:id
  async function handleDownload(doc) {
    try {
      setDownloadingId(doc.idDocuments);

      const fileUrl = `${api.defaults.baseURL}/documents/download/${doc.idDocuments}`;
     

      const fileName = `${doc.fieldname}.pdf`;
      const localPath = FileSystem.documentDirectory + fileName;

      // Faz download binário certinho
      const downloadRes = await FileSystem.downloadAsync(fileUrl, localPath, {
        headers: { Authorization: `Bearer ${user.token}` },
      });


      // Verifica se pode compartilhar
      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        Alert.alert("Aviso", "Compartilhamento não disponível neste dispositivo.");
        return;
      }

      await Sharing.shareAsync(downloadRes.uri, {
        mimeType: "application/pdf",
        dialogTitle: `Compartilhar ${doc.fieldname}`,
      });

    } catch (err) {
      console.log("Erro no download:", err);
      Alert.alert("Erro", "Não foi possível baixar ou compartilhar o arquivo.");
    } finally {
      setDownloadingId(null);
    }
  }

  const renderItem = ({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
      <Text style={{ fontWeight: "bold" }}>📄 {item.fieldname}</Text>
      <Text>Status: {item.status}</Text>

      <Button style={{ width:10}}
        txt={
          
            "Baixar"
        }
        onPress={() => handleDownload(item)}
        isLoading={downloadingId === item.idDocuments}
      />
    </View>
  );

  return (
    <View style={sharedStyles.container}>
      <FlatList
        data={docs}
        keyExtractor={(item) => `${item.idDocuments}`}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={loadDocuments}
      />
    </View>
  );
}

export default UserDocumentsList;

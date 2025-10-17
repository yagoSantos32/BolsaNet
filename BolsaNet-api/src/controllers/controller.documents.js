import serviceDocuments from "../services/service.documents.js";

async function RegisterDocuments(req, res) {
    try {
        const userId = req.idUser;
        const documents = []; // lista para salvar no banco

        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            const docData = {
                userId: userId,
                fieldname: file.fieldname,
                filePath: file.path,
                status: 'em analise',
                notes: null, // corrigido para bater com a tabela
                uploadedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
                reviewedAt: null,
                reviewedBy: null
            };

            documents.push(docData);
        }

        // chama o service para salvar
        const registerDocuments = await serviceDocuments.RegisterDocuments(documents);

        return res.status(200).json(registerDocuments)

    } catch (err) {
        return res.status(500).json({ error: "Erro ao registrar documentos" });
    }
}

async function ListUserDocuments(req, res) {
    try {
        const { userId } = req.params

        const documents = await serviceDocuments.ListUserDocuments(userId)

        if (!documents) {
            return res.status(404).json({ error: "nenhum documento encontrado para este usuário" })
        }
        return res.status(200).json(documents);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Erro ao listar documentos do usuário." });
    }
}

export default { RegisterDocuments, ListUserDocuments };

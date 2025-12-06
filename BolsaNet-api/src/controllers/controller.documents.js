import serviceDocuments from "../services/service.documents.js";
import path from "path";
import fs from "fs";

async function RegisterDocuments(req, res) {
    try {
        const userId = req.idUser;
        const documents = [];

        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];

            const docData = {
                userId: userId,
                fieldname: file.fieldname,
                filePath: file.filename,   
                status: "em analise",
                notes: null,
                uploadedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
                reviewedAt: null,
                reviewedBy: null
            };

            documents.push(docData);
        }

        const registerDocuments = await serviceDocuments.RegisterDocuments(documents);

        return res.status(201).json(registerDocuments);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao registrar documentos" });
    }
}

async function ListUserDocuments(req, res) {
    try {
        const { userId } = req.params;

        const documents = await serviceDocuments.ListUserDocuments(userId);

        if (!documents || documents.length === 0) {
            return res.status(404).json({ error: "Nenhum documento encontrado para este usuário." });
        }

        return res.status(200).json(documents);

    } catch (error) {
        if (error.message.includes("obrigatório")) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Erro ao listar documentos do usuário." });
    }
}

async function DownloadDocument(req, res) {
    const { id } = req.params;

    const document = await serviceDocuments.GetDocumentById(id);

    if (!document) {
        return res.status(404).json({ error: "Documento não encontrado." });
    }

    const fullPath = path.resolve("uploads", document.filePath);

    console.log("Buscando arquivo em:", fullPath);

    if (!fs.existsSync(fullPath)) {
        return res.status(404).json({ error: "Arquivo físico não encontrado." });
    }

    return res.download(fullPath, document.fieldname || document.filePath);
}


export default { RegisterDocuments, ListUserDocuments, DownloadDocument };

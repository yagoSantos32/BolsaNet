import repositoryDocuments from "../repositories/repository.documents.js"

async function RegisterDocuments(documentsData) {
    const results = await Promise.all(
        documentsData.map(doc => {
            const { userId, fieldname, filePath, status, notes, uploadedAt, reviewedAt, reviewedBy } = doc
            return repositoryDocuments.RegisterDocuments(
                userId,
                fieldname,
                filePath,
                status,
                notes,
                uploadedAt,
                reviewedAt,
                reviewedBy
            );
        })
    )


    return results
}

async function ListUserDocuments(userId) {
    if (!userId) {
        throw new Error("O id do usuario é obrigatório.");
    }

    const results = await repositoryDocuments.ListUserDocuments(userId)
    return results
}

export default { RegisterDocuments, ListUserDocuments }
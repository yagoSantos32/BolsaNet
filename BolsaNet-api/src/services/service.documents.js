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

export default { RegisterDocuments }
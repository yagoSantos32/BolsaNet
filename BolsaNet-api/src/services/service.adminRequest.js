import repositoryAdminRequest from "../repositories/repository.adminRequest.js";

async function RegisterRequest(userData) {

    const { iduser, status, requestedAt, reviewedAt, reviewedBy } = userData


    const user = await repositoryAdminRequest.RegisterRequest(iduser, status, requestedAt, reviewedAt, reviewedBy)
    

    return user;
}

async function UpdateRequest(iduser, data) {
    const { status, reviewedAt, idAdmin } = data
    if (!status) {
        throw new Error("O campo 'status' é obrigatório.");
    }
    const result = await repositoryAdminRequest.UpdateRequest(iduser,status, reviewedAt, idAdmin);
    if (result.affectedRows === 0) return null;
    return result
};


export default { RegisterRequest,UpdateRequest };


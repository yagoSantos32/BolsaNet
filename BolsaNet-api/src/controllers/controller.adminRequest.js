import serviceAdminRequest from "../services/service.adminRequest.js";

async function RegisterRequest(req, res) {
    try {
        const userData = {
            iduser: req.idUser,
            requestedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
            ...req.body
        }

        const user = await serviceAdminRequest.RegisterRequest(userData);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ error: "erro interno, tente mais tarde" });
    }
}

async function List(req, res) {
  try {

    const users = await serviceAdminRequest.List(req.query);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: "erro ao listar usuarios" });
  }
};

async function UpdateRequest(req, res) {
    try {
        const { iduser } = req.params;

        const data = {
            idAdmin: req.idUser,
            reviewedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
            ...req.body
        }


        const updatedUser = await serviceAdminRequest.UpdateRequest(iduser, data);

        if (!updatedUser) {
            return res.status(404).json({ error: "usuário não encontrado." });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        if (error.message.includes("obrigatório")) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "erro ao atualizar usuário" });
    }
};




export default { RegisterRequest, UpdateRequest,List }
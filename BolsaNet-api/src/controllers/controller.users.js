import serviceUsers from "../services/service.users.js";

async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await serviceUsers.Login({ email, password });

    if (!user || user.length === 0) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }
    return res.status(200).json(user);

  } catch (err) {
    return res.status(500).json({ error: "erro interno, tente mais tarde" });
  }

};

async function Register(req, res) {
  try {
    const userData = [{
      ...req.body["0"],
      admin: 0,
      status: "nao solicitado",

    }];
    const user = await serviceUsers.Register(userData);
    if (user.error) {
      return res.status(409).json(user);
    }
    return res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ error: "ocorreu um erro ao se cadastrar. tente novamente mais tarde" });
  }

};

async function List(req, res) {
  try {

    const users = await serviceUsers.List(req.query);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: "erro ao listar usuarios" });
  }
};

async function UpdateUser(req, res) {
  try {
    const { iduser } = req.params;
    const data = req.body


    const updatedUser = await serviceUsers.UpdateUser(iduser, data);

    if (!updatedUser) {
      return res.status(404).json({ error: "usuário não encontrado." });
    }
    return res.status(200).json(updatedUser);
  } catch (err) {

    return res.status(500).json({ error: "erro ao atualizar usuário" });
  }
};

async function DeleteUser(req, res) {
  try {
    const { iduser } = req.params

    const deleted = await serviceUsers.DeleteUser(iduser)
    if (!deleted) {
      return res.status(404).json({ error: "usuário não encontrado" })
    }

    return res.status(200).json({ deleted });
  } catch (err) {
    return res.status(500).json({ error: "erro ao deletar usuário" })
  }
}



export default { Login, Register, List, UpdateUser, DeleteUser };
import serviceUsers from "../services/service.users.js";
import jwt from "../token.js"
async function List(req,res){
    try {
        const users = await serviceUsers.List();
      
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({error:err});
    }
}

async function Login(req,res) {
  const email=req.body.email;
  const pass=req.body.pass;
    // dados ficticios apenas para testes
    if(email=='admin@gmail.com' && pass=='admin'){
        res.status(200).json({
            id_users:0,
            email:'admin@gmail.com',
            password:'admin',
            token:jwt.CreateJWT(123,1),
          
        });
    }
    else{
        res.status(401).json({resposta:"usuario invalido"})
    }

    
}

async function Register(req,res) {
    
      try {
        const users = await serviceUsers.Register(req.body);
        users.token=jwt.CreateJWT(users.idUser,users.admin)
 
      
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({error:err});
    }
    
}

export default {List,Login,Register};
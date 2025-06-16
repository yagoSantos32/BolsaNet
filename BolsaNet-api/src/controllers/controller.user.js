import serviceUser from "../services/service.user.js";
import jwt from "../token.js"
async function List(req,res){
    try {
        const user = await serviceUser.List();
      
        res.status(200).json(user);
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
            id_User:0,
            email:'admin@gmail.com',
            password:'admin',
            token:jwt.CreateJWT(123,'admin'),
          
        });
    }
    else{
        res.status(401).json({resposta:"user invalido"})
    }

    
}

async function Register(req,res) {
    
      try {
        const user = await serviceUser.Register(req.body);
        user.token=jwt.CreateJWT(user.idUser,user.admin)
 
      
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error:err});
    }
    
}

export default {List,Login,Register};
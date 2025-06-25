import repositoryUser from "../repositories/repository.user.js";

async function List(){
    const users= await repositoryUser.List();

    return users;
}

async function Register(userData){
    
    const [{fullName,email,pass,CPF,CEP,city,UF,district,street,number,admin,status }] = userData
    
  
    const users= await repositoryUser.Register(fullName,email,pass,CPF,CEP,city,UF,district,street,number,admin,status);
  

    return users;
}

export default {List,Register};


// aqui deve ser implementado as regras para o app (os if e else para deixa-lo seguro)
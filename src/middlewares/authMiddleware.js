import jwt from "jsonwebtoken"

const verifierUser  = (req,res,next) =>{
    const token = req.cookies.token
    if(!token){
      return res.json({error: "vous n'avez auccun access"})
    }else{
      jwt.verify(token,  "jwt-secret-key", (error, decoded)=>{
        if(error){
          json.res.json({error : "erreur lors de verifivcation"})
        }else{
          req.nom = decoded.nom
          next()
        }
      })
    }
}
export default verifierUser


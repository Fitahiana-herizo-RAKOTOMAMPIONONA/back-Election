import db from "../config/config.js"
const ajouterCandidat =async(req,res)=>{
    const data = req.body
    const candidat = data.map(item => [item.nom,item.prenom,item.profession])
    const sql = "INSERT INTO candidat (nom_candidat,prenom_candidat,profession) VALUES ?"
    const resulat= db.query(sql,[candidat])
    if (!resulat) return res.status(500).json({erreur : "lors de l'enregistrement candidat"})
    else return res.status(200).json({status : "success" ,success: "enregistrement avec succes"})
}
export  {ajouterCandidat} 
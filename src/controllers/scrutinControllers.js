
import db from "../config/config.js";

const creerScrutin = async (req,res) =>{
    try{
        const sql = `INSERT INTO scrutin (nom,date,type) VALUES (?,?,?)`
        const values = [
            req.body.nom,
            req.body.date,
            req.body.type
        ]
        const resultat = await db.queryAsync(sql, values)
        if (!resultat ) return res.staus(500).json({error : "erreur lors de l'enregistrement"})
        else  return res.staus(200).json({success : "enregistre avec success"})
    }catch (error){
        console.log("erreur de tentative d'enregistrement " + error.message)
        res.status(400).json({error :"erreur de tentative d'enregistrement"})
    }
}

db.queryAsync = (sql,values) => {
    return new Promise((reject,resolve)=>{
        db.query(sql , values ,(erreur,resultat)=>{
            if(erreur) return reject(erreur)
            else if (resultat) return resolve (resultat)
        })
    })
}


const getScrutin = async (req,res) =>{
    try{
        
    }catch (erreur){
        console.log("erreur lors du getScrutin" + erreur.message)
        res.status(400).json({error : erreur})
    }
}



const getALLScrutin = async (req,res) =>{
    try{
        const sql = "SELECT * FROM scrutin"
        db.query(sql,(erreur, resultat)=>{
            if(erreur) return res.status(400).json({error : "erreur lors de getAllScrutin"})
            else if (resultat){
                return res.status(200).json(resultat)
            }
        })
        // const resultat = await db.query(sql);
    }catch (erreur){
        console.log("erreur lors du getALlScrutin" + erreur.message)
        res.status(400).json({error : erreur})
    }
}

export {creerScrutin,getScrutin,getALLScrutin}
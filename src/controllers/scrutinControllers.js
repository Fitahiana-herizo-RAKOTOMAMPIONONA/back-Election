import db from "../config/config.js";

const creerScrutin = async (req,res) =>{
    try{
        const sql = `INSERT INTO scrutin (nomScrutin,date,description,debutTemps,finTemps,type,votantMax,nombreVotants) VALUES (?,?,?,?,?,?,?,?)`
        const values= [
            req.body.nom,
            req.body.date,
            req.body.description,
            req.body.debutTemps,
            req.body.finTemps,
            req.body.type,
            req.body.votantMax,
            req.body.nombreVotants,
        ]
        const resultat = await db.queryAsync(sql, values)
        if (!resultat ) return res.staus(500).json({error : "erreur lors de l'enregistrement"})
        else  return res.status(200).json({success : "enregistre avec success" ,status: "success"})
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
        const id = req.params.id
        const sql= "SELECT * FROM scrutin WHERE id = ?;"
        db.query(sql,id,(erreur,resultat)=>{
            if(erreur) return res.status(400).json({error : "erreur lors du get"})
            else if (resultat && resultat.length > 0 ) return res.status(200).json(resultat[0])
            else res.status(404).json({error : "Auccun scrutin trouve"})
        })
    }catch (erreur){
        console.log("erreur lors du getScrutin" + erreur.message)
        res.status(400).json({error : erreur, status : "erreur lors du getScrutin"})
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
    }catch (erreur){
        console.log("erreur lors du getALlScrutin" + erreur.message)
        res.status(400).json({error : erreur})
    }
}

export {creerScrutin,getScrutin,getALLScrutin}
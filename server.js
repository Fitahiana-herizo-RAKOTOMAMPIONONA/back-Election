import mysql from "mysql"
import express from "express"
import cors from "cors"
import bcrypt from "bcrypt"

const port = 8081
const cle = 10

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "election",
})

app.post("/register", (req, res) => {
  const sql = "INSERT INTO user (nom, email, motDePasse) VALUES (?)"
  bcrypt.hash(req.body.motDePasse.toString(), cle, (erreur, hash) => {
    if (erreur) {
      return res.status(500).json({ error: "Erreur de hachage du mot de passe" })
    }
    const values = [
        req.body.nom, 
        req.body.email, 
        hash
    ]
    db.query(sql, [values], (erreur, resultat) => {
      if (erreur) {
        console.log(erreur);
        return res.status(500).json({ error: "Erreur lors de l'enregistrement du mot de passe"});
      }
      if (resultat) return res.status(200).json({ success: "Enregistrement avec succès" })
    });
  })
})

app.post("/verifier", (req, res) => {
    const sql = "SELECT * FROM user WHERE email=?;"
    db.query(sql,[req.body.email],(erreur, resultat)=>{
        if (erreur) return res.status(500).json({error : "erreur de connexion"})
        if (resultat.length < 0) return res.status(500).json({error: "cette mail n'existe pas"})
        else{
            bcrypt.compare(req.body.motDePasse.toString() , resultat[0].motDePasse , (erreur,result)=>{
              if(erreur) {
                return res.status(500).json({error: "Erreur lors du comparaison du mot de passe"})
              }
              if (result) {
                return res.status(200).json({success: "success"})
              }else{
                return res.status(500).json({error: "Mot de passe Incorrect"}) 
              }
            })
        }
    })
});


app.listen(port, () => {
  console.log("En attente des requêtes au port " + port)
});

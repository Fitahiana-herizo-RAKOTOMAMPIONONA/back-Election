import mysql from "mysql"
import dotenv from "dotenv"

dotenv.config();

const db =  mysql.createConnection({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
}) 

const sql =`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`

const sql2 = `USE ${process.env.DB_NAME};` 
const user = `CREATE TABLE IF NOT EXISTS user(
    idUser INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    email VARCHAR(255),
    motDePasse TEXT);`
const scrutin = `CREATE TABLE IF NOT EXISTS scrutin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user INT,
    nomScrutin VARCHAR(255),
    date DATE,
    description TEXT,
    type VARCHAR(255),
    votantMax INT,
    nombreVotants INT,
    debutTemps TIME,
    finTemps TIME,
    statistiqueVotants INT,
    minuteCoule INT,
    FOREIGN KEY (user) REFERENCES user(idUser)
);
`  

const vote = `CREATE TABLE IF NOT EXISTS vote(
    id_vote INT PRIMARY KEY,
    id_utilisateur INT,
    id_scrutin INT,
    id_candidat INT,
    FOREIGN KEY (id_utilisateur) REFERENCES user (idUser),
    FOREIGN KEY (id_scrutin) REFERENCES scrutin (id),
    FOREIGN KEY (id_candidat) REFERENCES candidat (id_candidat));` 
const candidat = `CREATE TABLE IF NOT EXISTS candidat(
    id_candidat INT PRIMARY KEY,
    nom_candidat VARCHAR(255),
    prenom_candidat VARCHAR(255),
    parti_politique VARCHAR(255), 
    profession VARCHAR(255),
    slogan VARCHAR(255));` 
const resultatTable = `CREATE TABLE IF NOT EXISTS resultat(
    id_resultat INT PRIMARY KEY,
    id_scrutin INT,
    id_candidat INT,
    FOREIGN KEY (id_scrutin) REFERENCES scrutin (id),
    FOREIGN KEY (id_candidat) REFERENCES candidat (id_candidat));` 

db.query(sql,(erreur, resultat)=>{     
    if( erreur){
        console.error("erreur lors de creation du database "  + erreur)
    }else if(!resultat){
        console.error("cette database est deja existe" , erreur)
    }else{
        console.log( "database cree avec suucees")
        db.query(sql2, (erreur, resultat)=>{
            if(erreur){
                console.error("erreur lors de l'utilistation du database")
            }else if(!resultat){
                console.error("erreur lors de l'utilistation du database")
            }else{
                console.log("utilisation database : " + process.env.DB_NAME)
                db.query(user,(erreur, resultat)=>{
                    if (erreur){
                        console.error("erreur lors de creation du table"+ erreur);
                    }else if(!resultat){
                        console.log("deja cree");
                    }else{
                        console.log("table user cree avec succes");
                    }
                })
                db.query(candidat,(erreur, resultat)=>{
                    if (erreur){
                        console.error("erreur lors de creation du table candidat "+ erreur);
                    }else if(!resultat){
                        console.log("deja cree");
                    }else{
                        console.log("table candidat cree avec succes");
                    }
                })
                db.query(scrutin,(erreur, resultat)=>{
                    if (erreur){
                        console.error("erreur lors de creation du table scrutin "+ erreur);
                    }else if(!resultat){
                        console.log("deja cree");
                    }else{
                        console.log("table scrutin cree avec succes");
                    }
                })
                
                db.query(resultatTable,(erreur, resultat)=>{
                    if (erreur){
                        console.error("erreur lors de creation du table resultat "+ erreur);
                    }else if(!resultat){
                        console.log("deja cree");
                    }else{
                        console.log("table resultat cree avec succes ");
                    }
                })
               
                db.query(vote,(erreur, resultat)=>{
                    if (erreur){
                        console.error("erreur lors de creation du table vote "+ erreur);
                    }else if(!resultat){
                        console.log("deja cree");
                    }else{
                        console.log("table vote cree avec succes ");
                    }
                })
            }
        })
    }
})


export default db

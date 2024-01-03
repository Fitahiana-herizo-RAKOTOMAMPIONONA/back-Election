import mysql from "mysql"
import dotenv from "dotenv"

dotenv.config();

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
})

const sql =`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`

const sql2 = `USE ${process.env.DB_NAME}`
const sql3 = `CREATE TABLE IF NOT EXISTS user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    email VARCHAR(255),
    motDePasse TEXT);`
const sql4 = `CREATE TABLE IF NOT EXISTS scrutin(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    date DATE,
    description TEXT,
    type VARCHAR(255),
    votantMax INT,
    nombreVotants INT,
    debutTemps TIME,
    finTemps TIME,
    statistiqueVotants INT,
    minuteCoule INT);` 
db.query(sql,(erreur, resultat)=>{     
    if( erreur){
        console.error("erreur lors de creation du database" + erreur) 
    }else if(!resultat){
        console.error("cette database est deja existe" , erreur)
    }else{
        console.log("database cree avec suucees")
        db.query(sql2, (erreur, resultat)=>{
            if(erreur){
                console.error("erreur lors de l'utilistation du database")
            }else if(!resultat){
                console.error("erreur lors de l'utilistation du database")
            }else{
                console.log("utilisation database : " + process.env.DB_NAME)
                db.query(sql3,(erreur, resultat)=>{
                    if (erreur){
                        console.error("erreur lors de creation du table"+ erreur);
                    }else if(!resultat){
                        console.log("deja cree");
                    }else{
                        console.log("table user cree avec succes");
                    }
                })
                db.query(sql4,(erreur, resultat)=>{
                    if (erreur){
                        console.error("erreur lors de creation du table"+ erreur);
                    }else if(!resultat){
                        console.log("deja cree");
                    }else{
                        console.log("table user cree avec succes");
                    }
                })
            }
        })
    }
})


export default db

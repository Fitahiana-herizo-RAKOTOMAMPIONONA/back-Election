import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/config.js";

const cle = process.env.CLE;

const enregistrerUser = async (req, res) => {
    try {
      const sql = "INSERT INTO user (nom, email, motDePasse) VALUES (?, ?, ?)";
      const hash = bcrypt.hashSync(req.body.motDePasse.toString(), Number(cle));
      const values = [req.body.nom, req.body.email, hash];
      const resultat = await db.queryAsynchrone(sql, values);
      if (resultat) {
        return res.status(200).json({ success: "Enregistrement avec succès" });
      } else {
        return res.status(500).json({ error: "Erreur lors de l'enregistrement du mot de passe" });
      }
    } catch (error) {
      console.error("Erreur lors du cryptage du mot de passe:", error.message);
      return res.status(500).json({ error: "Erreur de cryptage du mot de passe" });
    }
  };

  db.queryAsynchrone = (sql, values) => {
    return new Promise((resolve, reject) => {
      db.query(sql, values, (erreur, resultat) => {
        if (erreur) {
          reject(erreur);
        } else {
          resolve(resultat);
        }
      });
    });
  };
  



const verificationConnexion = async (req, res) => {
  const sql = "SELECT * FROM user WHERE email=?";
  db.query(sql, [req.body.email], (erreur, resultat) => {
    if (erreur) return res.status(500).json({ error: "erreur de connexion" });
    if (resultat.length < 1) return res.status(500).json({ error: "cette mail n'existe pas" });
    else {
      bcrypt.compare(req.body.motDePasse.toString(), resultat[0].motDePasse, (erreur, result) => {
        if (erreur) {
          return res.status(500).json({ error: "Erreur lors du comparaison du mot de passe" });
        }
        if (result) {
          const nom = resultat[0].nom;
          const token = jwt.sign({ nom }, process.env.JWT_SECRET);
          const cookieOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          };
          res.cookie("token", token, cookieOptions);

          return res.status(200).json({ success: "success" });
        } else {
          return res.status(500).json({ error: "Mot de passe Incorrect" });
        }
      });
    }
  });
};

const verifier = async (req, res) => {
  return res.json({ status: "success", nom: req.nom });
};

export { enregistrerUser, verificationConnexion, verifier };

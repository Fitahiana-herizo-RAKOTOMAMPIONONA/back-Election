import express from "express"
import { ajouterCandidat } from "../controllers/candidatController.js"
const candidatRouter = express.Router()

candidatRouter.post("/candidat/ajouter",ajouterCandidat)

export default candidatRouter
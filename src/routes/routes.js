import express from "express";
import verifierUser from "../middlewares/authMiddleware.js";
import { verificationConnexion,verifier,enregistrerUser } from "../controllers/authController.js";

const router = express.Router()

router.get("/",verifierUser,verifier)
router.post("/verifier",verificationConnexion)
router.post("/register",enregistrerUser)

export default router
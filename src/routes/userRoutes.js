import express from "express";
import verifierUser from "../middlewares/authMiddleware.js";
import { verificationConnexion,verifier,enregistrerUser } from "../controllers/authController.js";

const userRouter = express.Router()

userRouter.get("/user/estConnecte",verifierUser,verifier)
userRouter.post("/user/verifier",verificationConnexion)
userRouter.post("/user/register",enregistrerUser)

export default userRouter
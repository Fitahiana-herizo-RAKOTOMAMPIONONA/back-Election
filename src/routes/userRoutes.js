import express from "express";
import verifierUser from "../middlewares/authMiddleware.js";
import { verificationConnexion,verifier,enregistrerUser,getUserFromId ,getUserScrutinFromId } from "../controllers/authController.js";

const userRouter = express.Router()

userRouter.get("/user/estConnecte",verifierUser,verifier)
userRouter.post("/user/verifier",verificationConnexion)
userRouter.post("/user/register",enregistrerUser)
userRouter.get("/user/getUserId/:id",getUserFromId)
userRouter.get("/user/getUserScrutinId/:id",getUserScrutinFromId)

export default userRouter 
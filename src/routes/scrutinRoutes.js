import express  from "express";
import { creerScrutin ,getScrutin ,getALLScrutin } from "../controllers/scrutinControllers.js";
const scrutinRouter = express.Router()

scrutinRouter.post('/scrutin/creer',creerScrutin)
scrutinRouter.get('/scrutin/get',getScrutin)
scrutinRouter.get('/scrutin/tout',getALLScrutin)

export default scrutinRouter;
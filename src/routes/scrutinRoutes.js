import express  from "express";
import { creerScrutin ,getScrutin ,getALLScrutin ,getALLScrutinUser} from "../controllers/scrutinControllers.js";
const scrutinRouter = express.Router()

scrutinRouter.post('/scrutin/creer',creerScrutin)
scrutinRouter.get('/scrutin/get/:id',getScrutin) 
scrutinRouter.get('/scrutin/tout',getALLScrutin)
scrutinRouter.get('/scrutin/user',getALLScrutinUser)

export default scrutinRouter; 
import express,{json} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/userRoutes.js";
import scrutinRouter from "./src/routes/scrutinRoutes.js";
// import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 5000

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(express.json()); 
app.use(cookieParser());


app.use('/', userRouter)
app.use('/',scrutinRouter)

app.listen(port, () => {
  console.log("En attente des requêtes au port " + port);
});

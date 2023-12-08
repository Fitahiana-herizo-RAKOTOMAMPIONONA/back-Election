import express,{json} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./src/routes/routes.js";
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


app.use('/', router)


app.listen(port, () => {
  console.log("En attente des requêtes au port " + port);
});

import express from "express";
import bodyParser from "body-parser";
import cors from  "cors";
import skills from "./routes/skills.routes.js"

const PORT = process.env.PORT || 4000;
// create app
const app = express()

// add middlewares
app.use(cors())
app.use(bodyParser.json)
app.use(bodyParser.urlencoded({extended: false}))

// load routes
app.use('/skills', skills)
// start server
app.listen( PORT, () => {
    console.log(`Server is running:${PORT}`)
})
const express = require("express");
const app = express();
const router = require("./routes/routes")

//setando os modules
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', router)



const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log("Server rodando na 8080");
})
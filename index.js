const express=require("express");
const app=express();
const cors=require("cors")
const{bookRouter}=require("./controller/book")
const {connection}=require("./db");
require("dotenv").config()

app.use(cors("*"));
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("welcome to the book app")
})

app.use("/book",bookRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected with the database")
    } catch (error) {
        console.log(error.message)
    }

    console.log(`server is running at port ${process.env.PORT} `)
})
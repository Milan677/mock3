const express=require("express");
const bookRouter=express.Router();

const {bookModel}=require("../models/book");


//......add book..........

bookRouter.post("/add",async(req,res)=>{
    const{title,author,genre,description,price}=req.body;
    try {
        const newBook=new bookModel({title,author,genre,description,price});
        await newBook.save()
        res.send({msg:"new book created"})
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
});

//.......... get all books..............

bookRouter.get("/get",async(req,res)=>{
   let allBooks= await bookModel.find();
   res.send({"books":allBooks})
});

//............. delete book........

bookRouter.delete("/delete/:id",async(req,res)=>{
    const bookId=req.params.id;
    try {
         await bookModel.findByIdAndDelete({_id:bookId});
         res.status(200).send(`book with id: ${bookId} id deleted...`)
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
})

//.........filter book by gener.............

bookRouter.get("/get/:genre",async(req,res)=>{
    const genre=req.params.genre;

    try {
        let book=await bookModel.find({genre});
        res.status(200).send({"book":book})
    } catch (error) {
        res.status(400).send({"msg":"something went wrong","error":error.message})
    }
})

//............sort books...........
bookRouter.get("/sort/:data",async(req,res)=>{
   const data=req.params.data;

   try {
     let sortBy={};

     if(data==='price-asc'){
        sortBy={price:1}
     }else if(data==="price-desc"){
        sortBy={price:-1}
     }else{
        res.status(400).send({"msg":"Invalid sort fields"})
     }

     let books= await bookModel.find().sort(sortBy);

     res.send({"books":books})
   } catch (error) {
    res.status(400).send({"msg":"something went wrong","error":error.message})
   }


})




module.exports={bookRouter}
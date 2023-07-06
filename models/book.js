const mongoose=require("mongoose");

const bookSchema=mongoose.Schema({
    title:String,
    author:String,
    genre:String,
    description:String,
    price:Number
})

const bookModel=mongoose.model('Book',bookSchema);

module.exports={bookModel}
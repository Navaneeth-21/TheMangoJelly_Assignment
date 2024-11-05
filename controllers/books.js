const {main} = require('../config/connect');
const {ObjectId} = require('mongodb');

// POST REQUEST
// adding a new comic book
const addBook = async (req,res) => {
    const data = req.body;

    const {collection} = await main();

    try {
        const book = await collection.insertOne(data);
        if(book.insertedId){
            return res.status(201).json(book);
        }
        return res.status(400).json({message:'Failed to insert the data'});
    } catch (error) {
        return res.status(500).json({message:'Internal server error' , details:error.message});
    }
};

// PATCH REQUEST
// updating the attributes of an existing comic book
const editBook = async (req,res) => {
    const id = req.params.id;
    if(!id){
        return res.status(401).json({message:'Please enter the id of an existing Comic Book'});
    };
    const updatedData = req.body;
    const bookid = ObjectId.createFromHexString(id)
    const {collection} = await main();
    try {
        const newBook = await collection.updateOne({_id:bookid} , {$set:{...updatedData}});
        if(!newBook){
            return res.status(404).json({message:'Comic book not found'});
        }
        return res.status(201).json(newBook);
    } catch (error) {
        return res.status(500).json({message:'Internal Server error' , details:error.message});
    }
};

// DELETE REQUEST
// removing a comic book from the inventory
const deleteBook = async (req,res) => {
    const id = req.params.id;
    if(!id){
        return res.status(401).json({message:'Please provide id '});
    };
    const bookid = ObjectId.createFromHexString(id);
    const {collection} = await main();
    try {
        const result = await collection.deleteOne({_id:bookid});
        if(result) return res.status(200).json(result);
        return res.status(400).json({message:'Unable to delete comic book'});
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error' , details:error.message});
    }
};

// GET REQUEST
// returns full details of a  comic book based on its ID
const getABook = async (req,res) => {
    const id = req.params.id;
    if(!id){
        return res.status(401).json({message:'Please provide an ID'});
    }
    const bookId = ObjectId.createFromHexString(id);
    const {collection} = await main();
    try {
        const details = await collection.findOne({_id:bookId});
        if(!details){
            return res.status(400).json({message:'Please provide a valid ID'})
        }
        return res.status(200).json(details);
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error' , details:error.message});
    }
};

// GET REQUEST
// Returns details of the comic books based on the given queries
const getAllBooks = async (req,res) => {
    const condition = req.query.condition || 'New';
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1)*limit;
    const sortPrice = req.query.price === 'desc' ? -1 : 1

    const {collection} = await main();

    const query = {condition};
    const options = {
        skip: skip,
        limit: limit
    };

    try {
        const data = await collection.find(query,options).sort({Price:sortPrice}).toArray();
        if(!data){
            return res.status(401).json({message:'No data found'})
        };
        if(data == ""){
            return res.status(404).json({message:'No data found with queries'});
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({message:'Internal server error' , details:error.message});
    }
};


module.exports = {addBook,editBook,deleteBook,getABook,getAllBooks};

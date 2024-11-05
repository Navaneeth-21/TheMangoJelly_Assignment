const express = require('express');
const {addBook,editBook,deleteBook,getABook,getAllBooks} = require('../controllers/books');

const router = express.Router();

router.post('/addcomicBook' , addBook);
router.patch('/editBook/:id' , editBook);
router.delete('/deleteBook/:id' , deleteBook);
router.get('/getcomicbook/:id' , getABook);
router.get('/getallbooks' , getAllBooks)

module.exports = router;
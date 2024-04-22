import express from 'express';
import { BookController } from './book.controller.js';

const router = express.Router();

import multer from 'multer';
const storage = multer.diskStorage({});

const upload = multer({ storage });

router.post('/create', upload.single('image'), BookController.createBook);
router.get('/single/:id', BookController.getBookById);
router.get('/', BookController.getAllBooks);
router.patch('/review/:bookId', BookController.reviewBook);
router.get('/reviews/:bookId', BookController.getReviews);

router.patch('/update/:id', upload.single('image'), BookController.updateBook);
router.delete('/delete/:id', BookController.deleteBook);

export const BookRoutes = router;

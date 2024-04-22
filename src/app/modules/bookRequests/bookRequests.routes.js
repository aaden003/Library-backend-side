import express from 'express';
import { BookRequestController } from './bookRequests.controller.js';

const router = express.Router();

router.post('/', BookRequestController.requestBook);
router.get('/single/:id', BookRequestController.getRequestById);
router.get('/', BookRequestController.getAllRequests);

router.patch('/update/:id', BookRequestController.updateRequest);
router.delete('/delete/:id', BookRequestController.deleteRequest);

export const BookRequestRoutes = router;

import express from 'express';
import { BorrowController } from './borrow.controller.js';

const router = express.Router();

router.post('/', BorrowController.borrowRequest);
router.get('/single/:id', BorrowController.getRequestById);
router.get('/', BorrowController.getAllBorrowRequests);

router.patch('/update/:id', BorrowController.updateBorrowRequest);
router.delete('/delete/:id', BorrowController.deleteRequest);

router.post('/mail', BorrowController.sendBorrowMail);

export const BorrowRoutes = router;

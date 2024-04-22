import express from 'express';
import { UserRoutes } from '../modules/user/user.route.js';
import { BookRoutes } from '../modules/book/book.routes.js';
import { BookRequestRoutes } from '../modules/bookRequests/bookRequests.routes.js';
import { BorrowRoutes } from '../modules/borrow/borrow.routes.js';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/book-request',
    route: BookRequestRoutes,
  },
  {
    path: '/borrow',
    route: BorrowRoutes,
  },
];

moduleRoutes?.forEach(route => router.use(route.path, route.route));

export default router;

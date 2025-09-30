import { Router } from "express";
import { getUsers } from '../controllers/users.controller.js';

const router = Router();

router.get("/test/:cant", getUsers);

export default router;
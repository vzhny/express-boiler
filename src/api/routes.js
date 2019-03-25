import express from 'express';
import { register, login } from '@/api/controllers/user.controllers';
import authenticated from '@/api/controllers/authenticated.controllers';
import verifyToken from '@/api/middleware/auth/verify.token';

const router = express.Router();

// POST register route
router.route('/auth/register').post(register);

// POST login route
router.route('/auth/login').post(login);

// POST example authenticated route
router.route('/authenticated').post(verifyToken, authenticated);

export default router;

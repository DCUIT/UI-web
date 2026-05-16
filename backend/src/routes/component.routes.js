import { Router } from 'express';
import { listComponents } from '../controllers/component.controller.js';

const router = Router();

router.get('/', listComponents);

export default router;


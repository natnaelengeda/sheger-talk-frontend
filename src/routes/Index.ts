import express from 'express';
import { Index } from '../controllers/Index';

const router = express.Router();

router.get('/', Index);

module.exports = router;
import express from 'express';
import { getAll } from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses = getAll();
  res.json(diagnoses);
});

export default router;
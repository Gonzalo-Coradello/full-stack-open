import { Router } from "express";
import { getPatients } from "../services/patientService";

const router = Router();

router.get('/', (_req, res) => {
  const patients = getPatients();
  res.json(patients);
});

export default router;
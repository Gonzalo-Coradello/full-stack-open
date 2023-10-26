import { Router } from "express";
import patientService from "../services/patientService";

const router = Router();

router.get('/', (_req, res) => {
  const patients = patientService.getNonSensitivePatients();
  res.json(patients);
});

export default router;
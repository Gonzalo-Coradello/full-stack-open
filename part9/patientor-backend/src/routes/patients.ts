import { Router } from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils/utils";

const router = Router();

router.get("/", (_req, res) => {
  const patients = patientService.getNonSensitivePatients();
  res.json(patients);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  if (!patient) {
    res.sendStatus(404);
  }
  res.json(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  try {
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(id, newEntry);
    res.json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

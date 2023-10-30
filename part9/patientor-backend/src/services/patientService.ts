import patients from "../../data/patients";
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  EntryWithoutId,
} from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Patient => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    throw new Error("Patient not found.");
  }

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient?.entries.push(newEntry);

  patients.map((p) => (p.id === id ? patient : p));
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatient,
  addPatient,
  addEntry,
};

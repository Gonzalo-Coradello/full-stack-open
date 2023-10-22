import data from "../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = data;

export const getAll = (): Diagnosis[] => {
  return diagnoses;
};
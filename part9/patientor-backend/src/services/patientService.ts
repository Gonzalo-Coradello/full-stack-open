import patients from '../data/patients';
import { PatientWithoutSSN } from '../types';


export const getPatients = (): PatientWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation 
  }));
};
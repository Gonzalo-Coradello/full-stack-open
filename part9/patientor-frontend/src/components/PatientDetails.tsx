import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient } from "../types";
import { Female, Male, Transgender } from "@mui/icons-material";

export default function PatientDetails() {
  const id = useParams().id;

  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (!id) return;
    patientService.getOne(id).then((data) => setPatient(data));
  }, [id]);

  if (!patient) return null;

  return (
    <div>
      <h1>
        {patient.name}{" "}
        {patient.gender === "male" ? (
          <Male />
        ) : patient.gender === "female" ? (
          <Female />
        ) : (
          <Transgender />
        )}
      </h1>
      <p>ssn: {patient.ssn}</p>
      {patient.dateOfBirth && <p>date of birth: {patient.dateOfBirth}</p>}
      <p>occupation: {patient.occupation}</p>
    </div>
  );
}

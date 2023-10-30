import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import diagnoseService from "../services/diagnoses";
import { Diagnosis, Patient } from "../types";
import { Female, Male, Transgender } from "@mui/icons-material";
import EntryDetails from "./Entries/EntryDetails";
import { Box } from "@mui/material";
import NewEntry from "./NewEntry";

export default function PatientDetails() {
  const id = useParams().id;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (!id) return;
    patientService.getOne(id).then((data) => setPatient(data));
    diagnoseService.getAll().then((data) => setDiagnoses(data));
  }, [id]);

  console.log(diagnoses);

  if (!patient) return null;

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "male" ? (
          <Male />
        ) : patient.gender === "female" ? (
          <Female />
        ) : (
          <Transgender />
        )}
      </h2>
      <p>ssn: {patient.ssn}</p>
      {patient.dateOfBirth && <p>date of birth: {patient.dateOfBirth}</p>}
      <p>occupation: {patient.occupation}</p>
      <NewEntry />
      <div>
        <h3>entries</h3>
        {/* <div>
          {patient.entries.map((entry) => (
            <div key={entry.id}>
              <p>
                {entry.date}: <em>{entry.description}</em>
              </p>
              <ul>
                {entry.diagnosisCodes?.map((code) => (
                  <li>
                    {code} {diagnoses.find((d) => d.code === code)?.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}
        <Box display="grid" gap={3}>
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </Box>
      </div>
    </div>
  );
}

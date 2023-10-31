import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import diagnoseService from "../services/diagnoses";
import { Diagnosis, EntryWithoutId, Patient } from "../types";
import { Female, Male, Transgender } from "@mui/icons-material";
import EntryDetails from "./Entries/EntryDetails";
import { Box } from "@mui/material";
import NewEntry from "./NewEntry";
import Notify from "./Notify";
import axios from "axios";

interface Props {
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

export default function PatientDetails({ setPatients }: Props) {
  const id = useParams().id;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"error" | "success">(
    "error"
  );

  useEffect(() => {
    if (!id) return;
    patientService.getOne(id).then((data) => setPatient(data));
    diagnoseService.getAll().then((data) => setDiagnoses(data));
  }, [id]);

  console.log(diagnoses);

  if (!id || !patient) return null;

  const setError = (message: string) => {
    setNotificationType("error");
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const handleNewEntry = async (data: EntryWithoutId) => {
    try {
      const updatedPatient = await patientService.addEntry(id, data);
      setPatient(updatedPatient);
      setPatients((prev) =>
        prev.map((p) => (p.id === id ? updatedPatient : p))
      );
    } catch (error: unknown) {
      if (error instanceof axios.AxiosError) {
        setError(error.response?.data);
      } else {
        setError("Something went wrong");
      }
    }
  };

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
      <Notify message={message} type={notificationType} />
      <NewEntry handleSubmit={handleNewEntry} />
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

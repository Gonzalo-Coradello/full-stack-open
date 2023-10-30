import { useState } from "react";
import { EntryType } from "../types";
import { useInput } from "../hooks";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

export default function NewEntry() {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);
  // const [description, setDescription] = useState('');
  // const [date, setDate] = useState('');
  // const [specialist, setSpecialist] = useState('');
  // const [diagnosisCodes, setDiagnosisCodes] = useState('');
  // const [healthCheckRating, setHealthCheckRating] = useState('');
  // const [dischargeDate, setDischargeDate] = useState('');
  // const [dischargeCriteria, setDischargeCriteria] = useState('');
  // const [employerName, setEmployerName] = useState('');
  // const [sickLeaveStart, setSickLeaveStart] = useState('');
  // const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const description = useInput("description");
  const date = useInput("date");
  const specialist = useInput("specialist");
  const diagnosisCodes = useInput("diagnosis codes");
  const healthCheckRating = useInput("health check rating");
  const dischargeDate = useInput("discharge date");
  const dischargeCriteria = useInput("discharge criteria");
  const employerName = useInput("employer name");
  const sickLeaveStart = useInput("sick leave start");
  const sickLeaveEnd = useInput("sick leave end");

  const handleEntryType = (e: SelectChangeEvent) => {
    setEntryType(e.target.value as EntryType);
  };

  return (
    <Box border={1} p={3}>
      <h2>New entry</h2>
      <form>
        <Box display="grid" gap={1.5}>
          <Select
            onChange={handleEntryType}
            defaultValue={EntryType.HealthCheck}
            variant="standard"
          >
            <MenuItem value={EntryType.HealthCheck}>Health check</MenuItem>
            <MenuItem value={EntryType.Hospital}>Hospital</MenuItem>
            <MenuItem value={EntryType.OccupationalHealthcare}>
              Occupational health care
            </MenuItem>
          </Select>
          <TextField variant="standard" type="text" {...description} />
          <TextField variant="standard" type="text" {...date} />
          <TextField variant="standard" type="text" {...specialist} />
          <TextField variant="standard" type="text" {...diagnosisCodes} />
          {entryType === "HealthCheck" ? (
            <>
              <TextField
                variant="standard"
                type="text"
                {...healthCheckRating}
              />
            </>
          ) : entryType === "Hospital" ? (
            <>
              <TextField variant="standard" type="text" {...dischargeDate} />
              <TextField
                variant="standard"
                type="text"
                {...dischargeCriteria}
              />
            </>
          ) : entryType === "OccupationalHealthcare" ? (
            <>
              <TextField variant="standard" type="text" {...employerName} />
              <TextField variant="standard" type="text" {...sickLeaveStart} />
              <TextField variant="standard" type="text" {...sickLeaveEnd} />
            </>
          ) : null}
          <Button
            variant="outlined"
            sx={{ width: "fit-content", mx: "auto", mt: 1.5, px: 6, py: 1 }}
          >
            Add entry
          </Button>
        </Box>
      </form>
    </Box>
  );
}

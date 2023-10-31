import { useState } from "react";
import {
  Diagnosis,
  EntryType,
  EntryWithoutId,
  HealthCheckRating,
} from "../types";
import { useInput } from "../hooks";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { assertNever } from "../utils";
import { diagnosisCodes as allDiagnosisCodes } from "../data/diagnosisCodes";

interface Props {
  handleSubmit: (data: EntryWithoutId) => void;
}

export default function NewEntry({ handleSubmit }: Props) {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);
  // const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  // const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [dischargeDate, setDischargeDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  // const [dischargeCriteria, setDischargeCriteria] = useState('');
  // const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [sickLeaveEnd, setSickLeaveEnd] = useState(
    new Date().toISOString().substring(0, 10)
  );

  const description = useInput("description");
  // const date = useInput("date");
  const specialist = useInput("specialist");
  // const diagnosisCodes = useInput("diagnosis codes");
  // const healthCheckRating = useInput("health check rating");
  // const dischargeDate = useInput("discharge date");
  const dischargeCriteria = useInput("criteria");
  const employerName = useInput("employer name");
  // const sickLeaveStart = useInput("sick leave start");
  // const sickLeaveEnd = useInput("sick leave end");

  const handleEntryType = (e: SelectChangeEvent) => {
    setEntryType(e.target.value as EntryType);
  };

  const handleDiagnosisCodes = (
    e: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const value = e.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    switch (entryType) {
      case EntryType.HealthCheck:
        const healthCheckEntry: EntryWithoutId = {
          type: entryType,
          description: description.value,
          date: date,
          specialist: specialist.value,
          diagnosisCodes,
          healthCheckRating:
            HealthCheckRating[
              healthCheckRating as keyof typeof HealthCheckRating
            ],
        };
        handleSubmit(healthCheckEntry);
        break;
      case EntryType.Hospital:
        const hospitalEntry: EntryWithoutId = {
          type: entryType,
          description: description.value,
          date: date,
          specialist: specialist.value,
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria.value,
          },
        };
        handleSubmit(hospitalEntry);
        break;
      case EntryType.OccupationalHealthcare:
        const occupationalEntry: EntryWithoutId = {
          type: entryType,
          description: description.value,
          date: date,
          specialist: specialist.value,
          diagnosisCodes,
          employerName: employerName.value,
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd,
          },
        };
        handleSubmit(occupationalEntry);
        break;
      default:
        return assertNever(entryType);
    }
  };

  return (
    <>
      <Box border={1} p={3}>
        <h2>New entry</h2>
        <form onSubmit={onSubmit}>
          <Box display="grid" gap={2.5}>
            <Box display="grid" gap={1}>
              <Typography color="GrayText">Entry type</Typography>
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
            </Box>
            <TextField variant="standard" type="text" {...description} />
            <TextField
              variant="standard"
              type="date"
              label="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField variant="standard" type="text" {...specialist} />
            <Box display="grid" gap={1}>
              <Typography color="GrayText">Diagnosis codes</Typography>
              <Select
                variant="standard"
                multiple
                onChange={handleDiagnosisCodes}
                value={diagnosisCodes}
              >
                {allDiagnosisCodes.map((code) => (
                  <MenuItem key={code} value={code}>
                    {code}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {entryType === "HealthCheck" ? (
              <Box display="grid" gap={1}>
                <Typography color="GrayText">Health check rating</Typography>
                <Select
                  variant="standard"
                  onChange={(e) => setHealthCheckRating(e.target.value)}
                  value={healthCheckRating}
                >
                  {Object.keys(HealthCheckRating)
                    .filter((v) => isNaN(+v))
                    .map((rating) => (
                      <MenuItem key={rating} value={rating}>
                        {rating}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            ) : entryType === "Hospital" ? (
              <Box display="grid" gap={1}>
                <Typography color="GrayText">Discharge</Typography>
                <Box display="flex" gap={3}>
                  <TextField
                    variant="standard"
                    type="date"
                    label="date"
                    value={dischargeDate}
                    onChange={(e) => setDischargeDate(e.target.value)}
                  />
                  <TextField
                    variant="standard"
                    type="text"
                    {...dischargeCriteria}
                  />
                </Box>
              </Box>
            ) : entryType === "OccupationalHealthcare" ? (
              <>
                <TextField variant="standard" type="text" {...employerName} />
                <Box display="grid" gap={1}>
                  <Typography color="GrayText">Sickleave</Typography>
                  <Box display="flex" gap={3}>
                    <TextField
                      variant="standard"
                      type="date"
                      label="start"
                      value={sickLeaveStart}
                      onChange={(e) => setSickLeaveStart(e.target.value)}
                    />
                    <TextField
                      variant="standard"
                      type="date"
                      label="end"
                      value={sickLeaveEnd}
                      onChange={(e) => setSickLeaveEnd(e.target.value)}
                    />
                  </Box>
                </Box>
              </>
            ) : null}
            <Button
              type="submit"
              variant="outlined"
              sx={{ width: "fit-content", mx: "auto", mt: 1.5, px: 6, py: 1 }}
            >
              Add entry
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

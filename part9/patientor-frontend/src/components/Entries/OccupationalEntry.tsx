import WorkIcon from "@mui/icons-material/Work";
import { OccupationalHealthcareEntry } from "../../types";
import { Box, Card } from "@mui/material";

interface Props {
  entry: OccupationalHealthcareEntry;
}

export default function Occupational({ entry }: Props) {
  return (
    <Card>
      <Box p={3}>
        <h2>
          {entry.date} <WorkIcon /> {entry.employerName}
        </h2>
        <p>
          <em>{entry.description}</em>
        </p>
        {entry.sickLeave && (
          <p>
            sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </p>
        )}
        <p>diagnose by {entry.specialist}</p>
      </Box>
    </Card>
  );
}

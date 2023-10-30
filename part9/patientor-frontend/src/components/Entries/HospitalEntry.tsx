import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { HospitalEntry } from "../../types";
import { Box, Card } from "@mui/material";

interface Props {
  entry: HospitalEntry;
}

export default function Hospital({ entry }: Props) {
  return (
    <Card>
      <Box p={3}>
        <h2>
          {entry.date} <LocalHospitalIcon />
        </h2>
        <p>
          <em>{entry.description}</em>
        </p>
        <p>
          discharge: {entry.discharge.date}: <em>{entry.discharge.criteria}</em>
        </p>
        <p>diagnose by {entry.specialist}</p>
      </Box>
    </Card>
  );
}

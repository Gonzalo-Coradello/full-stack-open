import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { HealthCheckEntry } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Card } from "@mui/material";

interface Props {
  entry: HealthCheckEntry;
}

/*
"Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
*/

export default function HealthCheck({ entry }: Props) {
  const healthColors = ["green", "yellow", "orange", "red"];

  return (
    <Card>
      <Box p={3}>
        <h2>
          {entry.date} <MedicalServicesIcon />
        </h2>
        <p>
          <em>{entry.description}</em>
        </p>
        <FavoriteIcon htmlColor={healthColors[entry.healthCheckRating]} />
        <p>diagnose by {entry.specialist}</p>
      </Box>
    </Card>
  );
}

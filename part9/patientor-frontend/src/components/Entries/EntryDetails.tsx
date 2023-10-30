import { Entry } from "../../types";
import { assertNever } from "../../utils";
import HealthCheck from "./HealthCheckEntry";
import Hospital from "./HospitalEntry";
import Occupational from "./OccupationalEntry";

interface Props {
  entry: Entry;
}

export default function EntryDetails({ entry }: Props) {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <Occupational entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
}

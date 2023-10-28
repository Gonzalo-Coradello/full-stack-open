import { NonSensitiveDiaryEntry } from "../types";
import DiaryEntry from "./DiaryEntry";

interface Props {
  entries: NonSensitiveDiaryEntry[];
}

export default function DiaryEntries({ entries }: Props) {
  return (
    <div>
      <h2>Diary entries</h2>
      <div>
        {entries.map((entry) => (
          <DiaryEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

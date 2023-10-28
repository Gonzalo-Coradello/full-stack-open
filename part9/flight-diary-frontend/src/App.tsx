import { useState, useEffect } from "react";
import DiaryEntries from "./components/DiaryEntries";
import NewDiary from "./components/NewDiary";
import diaryService from "./services/diaries";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((data) => setEntries(data));
  }, []);

  const addDiaryEntry = async (entry: NewDiaryEntry) => {
    const newDiaryEntry: NonSensitiveDiaryEntry = await diaryService.create(
      entry as NewDiaryEntry
    );
    setEntries((prev: NonSensitiveDiaryEntry[]) => prev.concat(newDiaryEntry));
  };

  return (
    <div>
      <NewDiary addDiary={addDiaryEntry} />
      <DiaryEntries entries={entries} />
    </div>
  );
}

export default App;

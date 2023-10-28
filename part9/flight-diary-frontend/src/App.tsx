import { useState, useEffect } from "react";
import DiaryEntries from "./components/DiaryEntries";
import NewDiary from "./components/NewDiary";
import diaryService from "./services/diaries";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";
import axios from "axios";
import Notify from "./components/Notify";

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"error" | "success">(
    "error"
  );

  useEffect(() => {
    diaryService.getAll().then((data) => setEntries(data));
  }, []);

  const addDiaryEntry = async (entry: NewDiaryEntry) => {
    try {
      const newDiaryEntry: NonSensitiveDiaryEntry = await diaryService.create(
        entry
      );
      setEntries((prev: NonSensitiveDiaryEntry[]) =>
        prev.concat(newDiaryEntry)
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotificationType("error");
        setMessage(error.response?.data);
      } else {
        console.error(error);
        setNotificationType("error");
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <div>
      <Notify message={message} type={notificationType} />
      <NewDiary addDiary={addDiaryEntry} />
      <DiaryEntries entries={entries} />
    </div>
  );
}

export default App;

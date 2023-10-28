import { useState } from "react";
import { NewDiaryEntry } from "../types";

interface Props {
  addDiary: (entry: NewDiaryEntry) => void;
}

export default function NewDiary({ addDiary }: Props) {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    addDiary(newDiaryEntry as NewDiaryEntry);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>date</label>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>weather</label>
        <input
          type="text"
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
        />
      </div>
      <div>
        <label>visibility</label>
        <input
          type="text"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        />
      </div>
      <div>
        <label>comment</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button>add</button>
    </form>
  );
}

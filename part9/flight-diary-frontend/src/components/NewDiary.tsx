import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface Props {
  addDiary: (entry: NewDiaryEntry) => void;
}

export default function NewDiary({ addDiary }: Props) {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newDiaryEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    addDiary(newDiaryEntry);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <div style={{ width: "fit-content", display: "flex", gap: 16 }}>
          <label>weather:</label>
          <div>
            <label>sunny</label>
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather(Weather.Sunny)}
              defaultChecked
            />
          </div>
          <div>
            <label>rainy</label>
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather(Weather.Rainy)}
            />
          </div>
          <div>
            <label>cloudy</label>
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather(Weather.Cloudy)}
            />
          </div>
          <div>
            <label>stormy</label>
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather(Weather.Stormy)}
            />
          </div>
          <div>
            <label>windy</label>
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather(Weather.Windy)}
            />
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: "fit-content", display: "flex", gap: 16 }}>
          <label>visibility:</label>
          <div>
            <label>great</label>
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility(Visibility.Great)}
              defaultChecked
            />
          </div>
          <div>
            <label>good</label>
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility(Visibility.Good)}
            />
          </div>
          <div>
            <label>ok</label>
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility(Visibility.Ok)}
            />
          </div>
          <div>
            <label>poor</label>
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility(Visibility.Poor)}
            />
          </div>
        </div>
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

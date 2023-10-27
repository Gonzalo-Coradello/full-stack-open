import { NonSensitiveDiaryEntry } from '../types';

type Props = {
  entry: NonSensitiveDiaryEntry;
};

export default function DiaryEntry({ entry }: Props) {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>visibility: {entry.visibility}</p>
      <p>weather: {entry.weather}</p>
    </div>
  );
}
